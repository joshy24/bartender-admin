import React, { Component } from 'react';

import logo from '../images/logo_white.png';

import Loader from '../subcomponents/Loader';

import {
    Redirect,
    withRouter
  } from 'react-router-dom';

//Our Auth Service
import AuthHelperMethods from '../auth/AuthHelperMethods';

const Auth = new AuthHelperMethods();

const right = {
    float: "right",
    marginRight: "80px"
}

const btwidth = {
    width: "400px",
    height: "50px",
    borderRadius: "24px"
}

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            error: "",
            isLoading: false
        }

        this.performLogin = this.performLogin.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this);
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
    
    async performLogin(){

        this.setState({
            error: ""
        })

        if(this.state.username.length<=0 || this.state.password.length<=0){
            this.setState({
                error: "Please make sure all fields are completed"
            })
            
            return;
        }

        this.showLoading();

        const response = await(Auth.login(this.state.username, this.state.password));

        this.hideLoading();

        if(response=="error"){
            //show error message

            this.setState({
                error: "An error occurred login you in. Please try again later."
            })

            return;
        }

        if(response && response.data){
            this.props.history.push('/app')
        }
    }

    onFieldChanged(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div className="bt-login-div">
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <div className="bt-login-left">
                            <div>
                                <img style={right} src={logo} width="200" heiht="200"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="bt-login-right">
                            <div>
                                <h2 className="bt-blue-text">Login</h2>
                                <br/>
                                <br/>
                                <h5 className="bt-red-text">{ this.state.error ? this.state.error : "" }</h5>
                                <br/>
                                <label htmlFor="category"><h5>User Name</h5></label>
                                <input style={btwidth} required="true" autoComplete="off" id="username" type="text" name="username" onChange={this.onFieldChanged} value={this.state.username} className="form-control bt-login-input" placeholder="User Name"/>
                                <br/>
                                <label htmlFor="category"><h5>Password</h5></label>
                                <input style={btwidth} required="true" autoComplete="off" id="password" type="password" name="password" onChange={this.onFieldChanged} value={this.state.password} className="form-control bt-login-input" placeholder="Password"/>
                                <br/>
                                <br/>
                                <button className="blue-bg bt-btn" style={btwidth} onClick={this.performLogin}>CONTINUE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Loader isLoading={this.state.isLoading}/>
            </div>
        )
    }
}

export default withRouter(Login)