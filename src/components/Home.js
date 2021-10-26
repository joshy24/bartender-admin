import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import category_img from '../images/categories.png' 
import drink_img from '../images/drinks.png' 
import orders_img from '../images/order.png' 
import users_img from '../images/user.png' 
import agents_img from '../images/agent.png' 
import promo_img from '../images/promo.png' 

import * as Utils from '../utils/Utils';

import * as API from '../api/Api';

const margin={
    float: "right",
    marginTop: "-0.01px"
}

export default class Home extends Component{
    constructor(props){
        super(props);

        this.state = {
            orders_count: 0,
            drinks_count: 0,
            categories_count: 0,
            agents_count: 0,
            users_count: 0,
            promocodes_count: 0,
            finance: 0
        };
    }

    async componentDidMount(){
        //orders
        const res = await API.getFinancials();
        
        if(res=="error"){
            //show error message
            return;
        }

        if(res && res.data){
            this.setState({
                finance: res.data
            })   
        }

        //orders
        const response = await API.getOrdersCount();

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                orders_count: response.data.count
            })   
        }


        //agents
        const response1 = await API.countAgents();

        if(response1=="error"){
            //show error message
            return;
        }

        if(response1 && response1.data){
            this.setState({
                agents_count: response1.data.count
            })   
        }


        //categories
        const response2 = await API.countCategories();

        if(response2=="error"){
            //show error message
            return;
        }

        if(response2 && response2.data){
            this.setState({
                categories_count: response2.data.count
            })   
        }


        //drinks
        const response3 = await API.countDrinks();

        if(response3=="error"){
            //show error message
            return;
        }

        if(response3 && response3.data){
            this.setState({
                drinks_count: response3.data.count
            })   
        }


        //users
        const response4 = await API.countUsers();

        if(response4=="error"){
            //show error message
            return;
        }

        if(response4 && response4.data){
            this.setState({
                users_count: response4.data.count
            })   
        }


        //promocodes
        const response5 = await API.getPromocodesCount();

        if(response5=="error"){
            //show error message
            return;
        }

        if(response5 && response5.data){
            this.setState({
                promocodes_count: response5.data.count
            })   
        }
    }

    render(){

        

        return(
            <div className="top-div">
                <div className="container">
                    <div className="bt-item-drink-profit shadow">
                        <div className="row">
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <h5>Total Revenue - {Utils.getAmount(this.state.finance.revenue)}</h5>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <h5>Total Profit - {Utils.getAmount(this.state.finance.profit)}</h5>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <h5>Total Tax - {Utils.getAmount(this.state.finance.tax)}</h5>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-6">
                                <h5>Total Expennses - {Utils.getAmount(this.state.finance.expenses)}</h5>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                                <Link to={'/app/financials'} className="nav-link link blue-text text-left"><h5>View Break Down</h5></Link>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="bt-item shadow">
                        <div className="row">
                            <div className="col-md-4">
                                <Link to={'/app/orders'} className="nav-link white-text link">
                                    <div className="bt-home-item green-bg shadow">
                                        <img src={orders_img} width="50" height="50"/>
                                        <h4 className="text-right">{this.state.orders_count}</h4>
                                        <h4 className="text-center">Orders</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={'/app/drinks'} className="nav-link white-text link">
                                    <div className="bt-home-item blue-bg shadow">
                                        <img  src={drink_img} width="50" height="50"/>
                                        <h4 className="text-right">{this.state.drinks_count}</h4>
                                        <h4 className="text-center">Drinks</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={'/app/categories'} className="nav-link white-text link">
                                    <div className="bt-home-item yellow-bg shadow">
                                        <img src={category_img} width="50" height="50"/>
                                        <h4 className="text-right">{this.state.categories_count}</h4>
                                        <h4 className="text-center">Categories</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={'/app/agents'} className="nav-link white-text link">
                                    <div className="bt-home-item red-bg shadow">
                                        <img src={agents_img} width="50" height="50"/>
                                        <h4 className="text-right">{this.state.agents_count}</h4>
                                        <h4 className="text-center">Agents</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={'/app/users'} className="nav-link white-text link">
                                    <div className="bt-home-item purple-bg shadow">
                                        <img src={users_img} width="50" height="50"/>
                                        <h4 className="text-right">{this.state.users_count}</h4>
                                        <h4 className="text-center">Users</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to={'/app/promocodes'} className="nav-link white-text link">
                                    <div className="bt-home-item black-bg shadow">
                                        <img src={promo_img} width="50" height="50"/>
                                        <h4 className="text-right">{this.state.promocodes_count}</h4>
                                        <h4 className="text-center">Promocodes</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}