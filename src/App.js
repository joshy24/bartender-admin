import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import Orders from './components/Orders';
import Drinks from './components/Drinks'
import Categories from './components/Categories'
import Users from './components/Users'
import Home from './components/Home'
import Agents from './components/Agents'
import Login from './components/Login'
import Financials from './components/Financials'
import OrderStats from './subcomponents/OrderStats';
import Promocodes from './components/Promocodes'
import Message from "./subcomponents/Message"

import icon from './images/icon.png' 

import alert from "./sounds/alert.mp3";

import Sound from 'react-sound';

import withAuth from './auth/withAuth';

import * as API from './api/Api';

//import PubNubReact from 'pubnub-react';

import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import './App.css';
import { clearInterval } from 'timers';

const zeropadding = {
    padding: "0px",
    marginTop: "6px"
};

const greenbg  = {
    backgroundColor: "#287428"
}

const redbg  = {
    backgroundColor: "#A93226"
}

const pubnub = new PubNub({
    publishKey: 'pub-c-da5b31c8-45d5-4018-82be-843221a3b91c',
    subscribeKey: 'sub-c-de1f05de-af97-11e9-a732-8a2b99383297',
    uuid: 'Bartender247ng'
});

function App() {
    return (
      <PubNubProvider client={pubnub}>
        <Dashboard />
      </PubNubProvider>
    );
}

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state= {
            time: 5,
            timer_id: null,
            showMessage: false,
            message: "",
            channels: ["neworder", "orderstatus", "routerequest"],
            data: {},
            latest_order: false,
            play_sound: false,
            online: false
        }

        /*this.pubnub = new PubNubReact({
            publishKey: 'pub-c-da5b31c8-45d5-4018-82be-843221a3b91c',
            subscribeKey: 'sub-c-de1f05de-af97-11e9-a732-8a2b99383297'
        });*/

        this.pubnub.init(this);

        //this.pubnub = usePubNub();

        this.getStats = this.getStats.bind(this);
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    showMessage(msg){
        window.clearInterval(this.state.timer_id);

        this.setState({
            showMessage: true,
            message: msg            
        })

        this.startTimer();
    }

    startTimer(){
        var self = this;

        this.state.timer_id = setInterval(() => 
            self.setState(state => {
                var time = state.time;
                time-=1;

                if(time==0){
                    self.stopTimer();
                    return {
                        time: 5,
                        showMessage: false,
                        message: ""
                    }
                }
                else{
                    return {
                        time: time
                    }
                }
                
                
            })
        , 1000);
    }


    stopTimer(){
        window.clearInterval(this.state.timer_id);
    }

    handleSongFinishedPlaying(){
        this.setState({
            play_sound: false
        })
    }

    componentWillUnmount(){
        this.pubnub.unsubscribe({
            channels: this.state.channels
        });
        window.clearInterval(this.timer);
    }

    componentWillMount(){
        this.pubnub.subscribe({
            channels: this.state.channels
        });
        
        this.pubnub.addListener({
            status: (st) => {
                if(st.category === "PNNetworkUpCategory"){
                    this.setState({
                        online: true
                    })
                    this.getStats();
                }

                if(st.category === "PNConnectedCategory"){
                    this.setState({
                        online: true
                    })
                    this.getStats();
                }

                if (st.category === "PNReconnectedCategory") {
                    this.setState({
                        online: true
                    })
                    this.getStats();
                }

                if (st.category === "PNNetworkIssuesCategory") {
                    this.setState({
                        online: false
                    })
                }

                if (st.category === "PNNetworkDownCategory") {
                    this.setState({
                        online: false
                    })
                }

                if (st.category === "PNTimeoutCategory") {
                    this.setState({
                        online: false
                    })
                }
            },
            message: (message) => { 
                
            }
        });

        this.pubnub.getMessage('neworder', (msg) => {
            this.getStats();

            this.setState(state => (
                {
                    latest_order: true,
                    play_sound: true
                }
            ))
        });

        this.pubnub.getMessage('routerequest', (data) => {
            var agent = data.userMetadata;
        
            var response = data.message.response;
            
            if(response=="accepted"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" has confirmed the order and is on the way to pick up the items";
                this.showMessage(msg);
            }

            if(response=="declined"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" declined the request to deliver the items";
                this.showMessage(msg);
            }
            
        });

        this.pubnub.getMessage('orderstatus', (msg) => {
            console.log({msg});
        });
 
        /*this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: 'hello world from react',
                channel: 'channel1'
            });
        });*/

        this.getStats();
    }

    async getStats(){
        const response = await API.getOrdersStats();

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                data: response.data.data
            })   
        }
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>

                                <div className="">
                                    <span style={this.state.online ? greenbg : redbg} className="bt-online-indicator laser-inline"></span> <Link to={'/'} className="nav-link laser-inline"><a className="navbar-brand med-blue-text">Bartender</a></Link>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to={'/app'} className="nav-link">Dashboard</Link></li>
                                    <li><Link to={'/app/orders'} className="nav-link">Orders</Link></li>
                                    <li><Link to={'/app/financials'} className="nav-link">Financials</Link></li>
                                    <li><Link to={'/app/drinks'} className="nav-link">Drinks</Link></li>
                                    <li><Link to={'/app/categories'} className="nav-link">Categories</Link></li>
                                    <li><Link to={'/app/agents'} className="nav-link">Agents</Link></li>
                                    <li><Link to={'/app/users'} className="nav-link">Users</Link></li>
                                    <li><Link to={'/app/promocodes'} className="nav-link">Promocodes</Link></li>
                                    {this.state.latest_order ? <li><Link to={'/app/orders'} style={zeropadding}><button className="bt-btn-nav red-bg">New</button></Link></li> : ""}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    
                    <div className="bartender-content">
                        <Switch>
                            <Route path='/app' exact component={Home}/>
                            <Route path='/app/drinks' render = { (props) => <Drinks {...props} showMessage={this.showMessage} /> }/>
                            <Route path='/app/categories' component={Categories}/>
                            <Route path='/app/orders' render = { (props) => <Orders {...props} showMessage={this.showMessage} /> }/>
                            <Route path='/app/financials' component={Financials}/>
                            <Route path='/app/agents' component={Agents}/>
                            <Route path='/app/users' component={Users}/>
                            <Route path='/app/promocodes' component={Promocodes}/>
                        </Switch>
                    </div>
                </div>
                { this.state.data ? <OrderStats data={this.state.data}/> : "" }

                {this.state.showMessage ? <Message message={this.state.message} /> : ""}

                {this.state.play_sound ? <Sound
                    url={alert}
                    playStatus={Sound.status.PLAYING}
                    playFromPosition={1 /* in milliseconds */}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}/> : "" }
            </BrowserRouter>
            
        );
    }
}

export default App;
