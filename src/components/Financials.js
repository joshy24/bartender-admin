import React, { Component } from 'react';

import * as Utils from '../utils/Utils';

import * as API from '../api/Api';
import Loader from '../subcomponents/Loader';

export default class Financials extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            financials: [],
            finance: 0,
            city: "LAGOS"
        }

        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this)
        this.loadFinancials = this.loadFinancials.bind(this)
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

    async componentDidMount(){
        
    }

    onFieldChanged(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        })

        //load the drinks based on the category selected
        this.loadFinancials()
    }

    loadFinancials = async() => {
        this.showLoading();
        //orders
        const res = await API.getFinancials(this.state.city);
        this.hideLoading();
        if(res=="error"){
            //show error message
            return;
        }

        if(res && res.data){
            this.setState({
                finance: res.data
            })   
        }


        this.showLoading();
        const response = await API.getMonthlyFinancials(this.state.city);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                financials: response.data
            })   
        }
    }

    render(){
        return(
            <div className="top-div">
                <div className="container">
                    <div className="bt-city-holder">
                        <div className="bt-center" style={{width: "200px"}}>
                            <select className="form-control" id="city" name="city" value={this.state.city} onChange={this.onFieldChanged}>
                                <option value="ALL">All</option>
                                <option value="LAGOS">Lagos</option>
                                <option value="ACCRA">Accra</option>
                            </select>
                        </div>
                    </div>
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
                                <h5>Total Expenses - {Utils.getAmount(this.state.finance.expenses)}</h5>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        {
                            this.state.financials.map((fin,index) => {
                                return <div key={index} className="col-md-6 col-sm-6">
                                            <div className="bt-item shadow">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3">
                                                        <h4 className="bt-blue-text">{Utils.getMonth(fin._id.month)}</h4>
                                                        <h5>{fin._id.year}</h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <h5>Revenue - {Utils.getAmount(fin.revenue)}</h5>
                                                        <h5>Orders - {fin.orders}</h5>
                                                    </div>
                                                    <div className="col-md-5 col-sm-5">
                                                        <h5>Tax - {Utils.getAmount(fin.tax)}</h5>
                                                        <h5>Profit - {Utils.getAmount(fin.profit)}</h5>
                                                        <h5>Expenses - {Utils.getAmount(fin.expenses)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                       </div>
                            })
                        }
                    </div>
                </div>
                <Loader isLoading={this.state.isLoading}/>
            </div>
        )
    }

}