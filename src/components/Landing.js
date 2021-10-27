import React, { Component } from 'react';
import { Switch, Link, Redirect } from 'react-router-dom'

export default class Landing extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <div className="top-top-div">
                <div className="container">
                    <div className="bt-row">
                        <div>
                            <img src="./images/logo_white.png" width="287" height="214"/>
                            <br/>
                            <br/>
                            <h2 className="bt-top-h1"><img src="../images/cart.png" width="40" height="40"/> <b>Purchase your beverages</b></h2>
                            <br/>
                            <h2 className="bt-top-h1"><img src="./images/delivery.png" width="40" height="40"/> <b>Get it delivered to your house</b></h2>
                            <br/>
                            <h2 className="bt-top-h1"><img src="./images/track.png" width="40" height="40"/> <b>Track your order</b></h2>
                            <br/>
                        </div>

                        <div>
                            <h2 className="bt-white-text"><b>We currently deliver to Lagos:</b></h2>
                            <br/>
                            <h3 className="bt-white-text">Lekki</h3>
                            <h3 className="bt-white-text">Victoria Island</h3>
                            <h3 className="bt-white-text">Ikoyi</h3>
                            <br/>
                            <br/>
                            <div>
                                <a href="https://play.google.com/store/apps/details?id=com.epicteck.bartender&hl=en"><img src="./images/google_play.png" width="185"/> </a>
                                <a href="https://apps.apple.com/us/app/bartender-nigeria/id1486608166?ls=1"><img src="./images/app_store.png" width="150"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
