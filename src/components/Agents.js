import React, { Component } from 'react';

import Agent from '../subcomponents/Agent';
import AddAgent from '../subcomponents/AddAgent';
import EditAgent from '../subcomponents/EditAgent';

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

export default class Agents extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            showConfirm: false,
            title: "Confirm Delete",
            message: "Are you sure you want to delete the selected agent profile ?",
            isLoading: true,
            showAddAgent: false,
            showEditAgent: false,
            selected_agent: {},
            agents: []
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.reloadAgents = this.reloadAgents.bind(this);
        this.showAddAgent = this.showAddAgent.bind(this);
        this.showEditAgent = this.showEditAgent.bind(this);
        this.deleteAgent = this.deleteAgent.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.hideConfirm = this.hideConfirm.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.yesClicked = this.yesClicked.bind(this);
        this.noClicked = this.noClicked.bind(this);
    }

    async yesClicked(){
        this.hideConfirm();
        this.showLoading();
        const response = await API.deleteAgent(this.state.selected_agent._id);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.reloadAgents()  
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
        this.showLoading();
        const response = await API.getAgents();
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                agents: response.data
            })   
        }
    }

    async reloadAgents(){
        this.handleCloseModal();

        const response = await API.getAgents();

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState({
                agents: response.data
            })   
        }
    }

    handleCloseModal () {
        this.setState({ 
            showAddAgent: false,
            showEditAgent: false,
        });
    }

    showAddAgent(){
        this.setState({
            showAddAgent: true
        })
    }

    showEditAgent(e, agent){
        this.setState({
            showEditAgent: true,
            selected_agent: agent
        })

        e.preventDefault()
    }

    deleteAgent(e, agent){
        e.preventDefault();

        this.setState({
            selected_agent: agent
        });
        this.showConfirm();
    }

    render(){
        return(
            <div className="top-div">
                <div className="container">
                    <div className="row">
                        <h5 className="text-left" style={left}>{this.state.agents.length} Agents</h5>

                        <button onClick={this.showAddAgent} className="green-bg bt-btn" style={right}> <i className="fas fa-plus white-text"></i> Add Agent</button>
                    </div>
                    <div className="row">
                        {
                            this.state.agents.map(agent => {
                                return <Agent key={agent._id} agent={agent} deleteAgent={this.deleteAgent} editClicked={this.showEditAgent}/>
                            })
                        }
                    </div>
                </div>

                <Loader isLoading={this.state.isLoading}/>

                <ConfirmAction yesClicked={this.yesClicked} noClicked={this.noClicked} showConfirm={this.state.showConfirm} title={this.state.title} message={this.state.message}/>

                <AddAgent showLoading={this.showLoading} hideLoading={this.hideLoading}  handleCloseModal={this. handleCloseModal} showAddAgent={this.state.showAddAgent} reloadAgents={this.reloadAgents}/>

                {
                    this.state.showEditAgent ? <EditAgent agent={this.state.selected_agent} handleCloseModal={this. handleCloseModal} showEditAgent={this.state.showEditAgent} reloadAgents={this.reloadAgents}/> : ""
                }
            </div>
        )
    }
}