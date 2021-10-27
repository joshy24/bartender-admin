import React, { useState, useEffect } from 'react';
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

const channels = ["neworder", "orderstatus", "routerequest"]

var timer_id = null

const pubnub = new PubNub({
    publishKey: 'pub-c-da5b31c8-45d5-4018-82be-843221a3b91c',
    subscribeKey: 'sub-c-de1f05de-af97-11e9-a732-8a2b99383297',
    uuid: 'Bartender247ng'
});

export default function App() {
    return (
      <PubNubProvider client={pubnub}>
        <Dashboard />
      </PubNubProvider>
    );
}

const Dashboard = () => {
    const pubnub = usePubNub();

    const [time, setTime] = useState(5)
    
    const [showMessage,setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    
    const [data, setData] = useState({})
    const [latest_order, setLatestOrder] = useState(false)
    const [play_sound, setPlaySound] = useState(false)
    const [online, setOnline] = useState(false)

    useEffect(() => {
        pubnub.subscribe({
            channels: channels
        });
        
        pubnub.addListener({
            status: (st) => {
                if(st.category === "PNNetworkUpCategory"){
                    setOnline(true)
                    getStats();
                }

                if(st.category === "PNConnectedCategory"){
                    setOnline(true)
                    getStats();
                }

                if (st.category === "PNReconnectedCategory") {
                    setOnline(true)
                    getStats();
                }

                if (st.category === "PNNetworkIssuesCategory") {
                    setOnline(false)
                }

                if (st.category === "PNNetworkDownCategory") {
                    setOnline(false)
                }

                if (st.category === "PNTimeoutCategory") {
                    setOnline(false)
                }
            },
            message: (message) => { 
                switch(message.channel){
                    case "neworder":
                        getStats();

                        setLatestOrder(true)
                        setPlaySound(true)
                    break;
                    case "orderstatus":
                    break;
                    case "routerequest":
                    break;
                }
            }
        });

        /*pubnub.getMessageActions({ channel: 'neworder'}, (msg) => {
            getStats();

            setLatestOrder(true)
            setPlaySound(true)
        })

        pubnub.getMessageActions({ channel: 'routerequest'}, (dat) => {
            var agent = dat.userMetadata;
        
            var response = dat.message.response;
            
            if(response=="accepted"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" has confirmed the order and is on the way to pick up the items";
                showMessage(msg);
            }

            if(response=="declined"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" declined the request to deliver the items";
                showMessage(msg);
            }
            
        })

        pubnub.getMessageActions({channels: 'orderstatus'}, (msg) => {
            console.log({msg});
        })

        /*pubnub.getMessage('neworder', (msg) => {
            getStats();

            setLatestOrder(true)
            setPlaySound(true)
        });

        pubnub.getMessage('routerequest', (dat) => {
            var agent = dat.userMetadata;
        
            var response = dat.message.response;
            
            if(response=="accepted"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" has confirmed the order and is on the way to pick up the items";
                showMessage(msg);
            }

            if(response=="declined"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" declined the request to deliver the items";
                showMessage(msg);
            }
            
        });

        pubnub.getMessage('orderstatus', (msg) => {
            console.log({msg});
        });
 
        /*this.pubnub.getStatus((st) => {
            this.pubnub.publish({
                message: 'hello world from react',
                channel: 'channel1'
            });
        });*/

        getStats();


        return () => {
            pubnub.unsubscribe({
                channels: channels
            });
            window.clearInterval(timer_id);
        }
    }, [pubnub, channels])


    function revealMessage(msg){
        window.clearInterval(timer_id);

        setMessage(msg)
        setShowMessage(true)

        startTimer();
    }

    function startTimer(){
        timer_id = setInterval(() => {
            var t = time;
                t-=1;

                if(t==0){
                    stopTimer();
                    setTime(5)
                    showMessage(false)
                    setMessage("")
                }
                else{
                    setTime(time)
                }
        }, 1000);
    }


    function stopTimer(){
        window.clearInterval(timer_id);
    }

    function handleSongFinishedPlaying(){
        setPlaySound(false)
    }

    const getStats = async() => {
        const response = await API.getOrdersStats();

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            setData(response.data.data)
        }
    }

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

                            <div className="bartender-logo">
                                <span style={online ? greenbg : redbg} className="bt-online-indicator laser-inline"></span> <Link to={'/'} className="nav-link laser-inline"><a className="navbar-brand med-blue-text">Bartender</a></Link>
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
                                {latest_order ? <li><Link to={'/app/orders'} style={zeropadding}><button className="bt-btn-nav red-bg">New</button></Link></li> : ""}
                            </ul>
                        </div>
                    </div>
                </nav>
                
                <div className="bartender-content">
                    <Switch>
                        <Route path='/app' exact component={Home}/>
                        <Route path='/app/drinks' render = { (props) => <Drinks {...props} showMessage={revealMessage} /> }/>
                        <Route path='/app/categories' component={Categories}/>
                        <Route path='/app/orders' render = { (props) => <Orders {...props} showMessage={revealMessage} /> }/>
                        <Route path='/app/financials' component={Financials}/>
                        <Route path='/app/agents' component={Agents}/>
                        <Route path='/app/users' component={Users}/>
                        <Route path='/app/promocodes' component={Promocodes}/>
                    </Switch>
                </div>
            </div>
            { data ? <OrderStats data={data}/> : "" }

            {showMessage ? <Message message={message} /> : ""}

            {play_sound ? <Sound
                url={alert}
                playStatus={Sound.status.PLAYING}
                playFromPosition={1 /* in milliseconds */}
                onFinishedPlaying={handleSongFinishedPlaying}/> : "" }
        </BrowserRouter>
        
    );   

}