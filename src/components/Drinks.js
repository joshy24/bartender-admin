import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import AddDrink from '../subcomponents/AddDrink';
import EditDrink from '../subcomponents/EditDrink';

import Drink from '../subcomponents/Drink';

import Loader from '../subcomponents/Loader';
import ConfirmAction from "../subcomponents/ConfirmAction";

import * as API from '../api/Api';

const left={
    float: "left"
}

const right={
    float: "right",
    marginTop: "-0.01px"
}

export default class Drinks extends Component{
    constructor(props){
        super(props);

        this.state = {
            showConfirm: false,
            title: "Confirm Delete",
            message: "Are you sure you want to delete the selected drink item ?",
            isLoading: true,
            showAddDrink: false,
            showEditDrink: false,
            categories: [],
            drinks: [],
            selected_drink: {},
            city: "LAGOS"
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.reloadDrinks = this.reloadDrinks.bind(this);
        this.showAddDrink = this.showAddDrink.bind(this);
        this.showEditDrink = this.showEditDrink.bind(this);
        this.deleteDrink = this.deleteDrink.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.hideConfirm = this.hideConfirm.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.yesClicked = this.yesClicked.bind(this);
        this.noClicked = this.noClicked.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this)
    }

    async yesClicked(){
        this.hideConfirm();
        this.showLoading();
        const response = await API.deleteDrink(this.state.selected_drink._id);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.reloadDrinks()  
        }
    }

    noClicked(){
        this.hideConfirm();
    }

    showConfirm(){
        this.setState({
            showConfirm: true
        })
    }

    hideConfirm(){
        this.setState({
            showConfirm: false
        })
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
        this.showLoading()
        const response = await API.getCategories(this.state.city);

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                categories: response.data
            })   
        }

        const response1 = await API.getDrinks(this.state.city);
        this.hideLoading();
        if(response1=="error"){
            //show error message
            return;
        }

        if(response1 && response1.data){
            this.setState({
                drinks: response1.data
            })   
        }
    }

    async reloadDrinks(){
        this.handleCloseModal();
        this.showLoading();
        const response = await API.getDrinks(this.state.city);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                drinks: response.data
            })   
        }
    }

    handleCloseModal () {
        this.setState({ 
            showAddDrink: false,
            showEditDrink: false 
        });
    }

    showAddDrink(){
        this.setState({
            showAddDrink: true
        })
    }

    showEditDrink(e,drink){
        this.setState({
            showEditDrink: true,
            selected_drink: drink
        });

        e.preventDefault();
    }

    deleteDrink(e, drink){
        e.preventDefault();

        this.setState({
            selected_drink: drink
        });
        this.showConfirm();
    }

    onFieldChanged(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        })

        //load the drinks based on the category selected
        this.reloadDrinks()

    }

    render(){
        return(
            <div className="top-div">
                <div className="container">
                    <div className="bt-city-holder">
                        <h5 className="text-left" style={left}>{this.state.drinks.length} Drinks</h5>

                        <div className="bt-center" style={{width: "200px"}}>
                            <select className="form-control" id="city" name="city" value={this.state.city} onChange={this.onFieldChanged}>
                                <option value="LAGOS">Lagos</option>
                                <option value="ACCRA">Accra</option>
                            </select>
                        </div>

                        <button onClick={this.showAddDrink} className="green-bg bt-btn" style={right}> <i className="fas fa-plus white-text"></i> Add Drink</button>
                    </div>
                    <div className="row">
                        {
                            this.state.drinks.map(drink => {
                                return <Drink key={drink._id} editClicked={this.showEditDrink} deleteDrink={this.deleteDrink} drink={drink}/>
                            })
                        }
                    </div>
                </div>
                <Loader isLoading={this.state.isLoading}/>

                <ConfirmAction yesClicked={this.yesClicked} noClicked={this.noClicked} showConfirm={this.state.showConfirm} title={this.state.title} message={this.state.message}/>
                
                { this.state.showAddDrink ? <AddDrink showLoading={this.showLoading} hideLoading={this.hideLoading} categories={this.state.categories}  handleCloseModal={this. handleCloseModal} showAddDrink={this.state.showAddDrink} reloadDrinks={this.reloadDrinks}/> : "" }
                
                {
                    this.state.showEditDrink ? <EditDrink showLoading={this.showLoading} hideLoading={this.hideLoading} drink={this.state.selected_drink} categories={this.state.categories}  handleCloseModal={this. handleCloseModal} showEditDrink={this.state.showEditDrink} reloadDrinks={this.reloadDrinks}/> : ""
                }
            </div>
        )
    }
}