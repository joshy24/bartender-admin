import React, { Component } from 'react';

import { BottomScrollListener } from 'react-bottom-scroll-listener'

import User from '../subcomponents/User';

import Loader from '../subcomponents/Loader';

import * as API from '../api/Api';

const left = {
    float: "left"
}

const right = {
    float: "right",
    marginTop: "-0.01px"
}

export default class Users extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            total_count:0,
            users: []
        }

        this.getUsers = this.getUsers.bind(this);
        this.countUsers = this.countUsers.bind(this);
        this.handleOnDocumentBottom = this.handleOnDocumentBottom.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    showLoading(){
        this.setState({
            isLoading: true
        })
    }

    hideLoading(){
        this.setState({
            isLoading: false
        })
    }

    handleOnDocumentBottom = () => {
        this.getUsers();
    }

    async getUsers(){
        this.showLoading();
        const response1 = await API.getUsers(this.state.users.length);
        this.hideLoading();
        if(response1=="error"){
            //show error message
            return;
        }

        if(response1 && response1.data){
            this.setState(state => {

                if(state.users.length>0){
                    var users = state.users.concat(response1.data);

                    return {
                        users: users
                    }
                }
                else{
                    return {
                        users: response1.data
                    }
                }
            })   
        }
    }

    async countUsers(){
        const response1 = await API.countUsers(this.state.users.length);

        if(response1=="error"){
            //show error message
            return;
        }

        if(response1 && response1.data){
            this.setState({
                total_count: response1.data.count
            })   
        }
    }

    componentDidMount(){
        this.getUsers();
        this.countUsers();
    }

    render(){
        return(
            <div className="top-div">
                <div className="container">
                    <div className="row">
                        <h5 className="text-left" style={left}>{this.state.total_count} User(s)</h5>
                    </div>
                    <div className="row">
                        {
                            this.state.users.map(user => {
                                return <User key={user._id} user={user}/>
                            })
                        }
                    </div>
                </div>
                <Loader isLoading={this.state.isLoading}/>
                <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
            </div>
        )
    }
}