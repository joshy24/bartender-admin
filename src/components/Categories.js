import React, { Component } from 'react';

import AddCategory from '../subcomponents/AddCategory';
import EditCategory from '../subcomponents/EditCategory';
import Category from '../subcomponents/Category';

import Loader from '../subcomponents/Loader';

import * as API from '../api/Api';

const left={
    float: "left"
}

const right={
    float: "right",
    marginTop: "-0.01px"
}

export default class Categories extends Component{
    constructor(props){
        super(props);

        this.state = {
            showAddCategory: false,
            showEditCategory: false,
            categories: [],
            selected_category: {},
            isLoading: true,
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.reloadCategories = this.reloadCategories.bind(this);
        this.showAddCategory = this.showAddCategory.bind(this);
        this.editClicked = this.editClicked.bind(this);
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

    async componentDidMount(){
        const response = await API.getCategories();

        this.hideLoading()

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                categories: response.data
            })   
        }
    }

    handleCloseModal () {
        this.setState({ 
            showAddCategory: false,
            showEditCategory: false,
            selected_category: null
        });
    }

    async reloadCategories(){
        this.handleCloseModal();

        this.showLoading()

        const response = await API.getCategories();

        this.hideLoading()

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                categories: response.data
            })   
        }
    }

    onFieldChanged(event){
        const target = event.target;
        const value = target.value;

        this.setState({
            selected_category: value
        });
    }

    editClicked(e, category){
        
        this.setState({
            showEditCategory: true,
            selected_category: category
        })

        e.preventDefault();
    }

    showAddCategory(){
        this.setState({
            showAddCategory: true
        })
    }

    render(){
        return(
            <div className="top-div">
                <div className="container">
                    <div className="row">
                        <h5 className="text-center" style={left}>{this.state.categories.length} Categories</h5>
                        
                        <button onClick={this.showAddCategory} className="green-bg bt-btn" style={right}> <i className="fas fa-plus white-text"></i> Add Category</button>
                    </div>
                    <div className="row">
                        {
                            this.state.categories.map(category => {
                                return <Category key={category._id} category={category} editClicked={this.editClicked}/>
                            })
                        }
                    </div>
                </div>
                
                <AddCategory  handleCloseModal={this. handleCloseModal} showAddCategory={this.state.showAddCategory} reloadCategories={this.reloadCategories}/>
                { this.state.showEditCategory && <EditCategory showLoading={this.showLoading} hideLoading={this.hideLoading} category={this.state.selected_category}  handleCloseModal={this. handleCloseModal}  showEditCategory={this.state.showEditCategory} onFieldChanged={this.onFieldChanged} reloadCategories={this.reloadCategories}/> }
                <Loader isLoading={this.state.isLoading}/>
            </div>
        )
    }
}