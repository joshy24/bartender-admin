import React, { Component } from 'react';

import Order from '../subcomponents/Order';

import OrderItems from '../subcomponents/OrderItems';
import AssignAgent from '../subcomponents/AssignAgent';
import Loader from '../subcomponents/Loader';
import ViewAgent  from '../subcomponents/ViewAgent'
import ConfirmAction from "../subcomponents/ConfirmAction";
import OrderStatus from "../subcomponents/OrderStatus";

import { BottomScrollListener } from 'react-bottom-scroll-listener'

import PubNub from 'pubnub';
import PubNubReact from 'pubnub-react';

import * as API from '../api/Api';

const left = {
    float: "left"
}

const right = {
    float: "right",
    marginTop: "-0.01px"
}

const btn_style = {
    marginLeft: "8px",
    marginRight: "8px",
    width: "120px"
}

const btn_grey = {
    background: "#797d7f",
    marginLeft: "8px",
    marginRight: "8px",
    width: "120px"
}

const btn_blue = {
    background: "#2E86C1",
    marginLeft: "8px",
    marginRight: "8px",
    width: "120px"
}

/*const pubnub = new PubNub({
    publishKey: 'pub-c-da5b31c8-45d5-4018-82be-843221a3b91c',
    subscribeKey: 'sub-c-de1f05de-af97-11e9-a732-8a2b99383297',
    uuid: 'Bartender247ng'
});

export default function Orders() {
    return (
      <PubNubProvider client={pubnub}>
        <OrdersContent />
      </PubNubProvider>
    );
}*/

export default class Orders extends Component{
    constructor(props){
        super(props);

        this.state = {
            showConfirm: false,
            title: "Confirm Order Fulfillment",
            message: "Please confirm that you want to mark this order as completed, this cant be undone.",
            isLoading: true,
            channels: ["neworder", "orderstatus", "routerequest"],
            total_count:0,
            orders: [],
            agents: [],
            showOrderStatus: false,
            orderStatusAgent: {},
            showOrderItems: false,
            showAgentsToAssign: false,
            showAgent: false,
            showInvoice: false,
            selected_order: {},
            selected_agent: {},
            order_type: "all",
            city: "LAGOS"
        }

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-da5b31c8-45d5-4018-82be-843221a3b91c',
            subscribeKey: 'sub-c-de1f05de-af97-11e9-a732-8a2b99383297'
        });

        this.pubnub.init(this);

        this.showOrderItems = this.showOrderItems.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.agentSelected = this.agentSelected.bind(this);
        this.showAgentsToAssign = this.showAgentsToAssign.bind(this);
        this.removeAgentFromRoute = this.removeAgentFromRoute.bind(this);
        this.getAgents = this.getAgents.bind(this);

        this.getOrders = this.getOrders.bind(this);
        this.getCompleted = this.getCompleted.bind(this);
        this.getPending = this.getPending.bind(this);
        this.getCount = this.getCount.bind(this);

        this.markOrderAsFulfilled = this.markOrderAsFulfilled.bind(this);
        this.markOrderAsFulfilledWithId = this.markOrderAsFulfilledWithId.bind(this);
        this.closeOrderStatus = this.closeOrderStatus.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.hideConfirm = this.hideConfirm.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.yesClicked = this.yesClicked.bind(this);
        this.noClicked = this.noClicked.bind(this);
        this.showAgent = this.showAgent.bind(this);
        this.hideAgent = this.hideAgent.bind(this);
    }

    async yesClicked(){
        this.hideConfirm();
        this.showLoading();

        const response = await API.fulfillOrder(this.state.selected_order._id);

        this.hideLoading();

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState(state => {
                var orders = state.orders;

                orders.splice(state.orders.indexOf(state.selected_order),1,response.data);

                return {
                    orders: orders,
                    selected_order: {}
                }
            })

            this.getAgents();
        }
    }
    
    noClicked(){
        this.hideConfirm();
    }

    showConfirm(order){
        this.setState({
            selected_order: order,
            showConfirm: true
        })
    }

    hideConfirm(){
        this.setState({
            showConfirm: false
        })
    }

    markOrderAsFulfilled(e,order){
        this.showConfirm(order);
    }

    async markOrderAsFulfilledWithId(e,id){
        this.showLoading();

        const response = await API.fulfillOrder(id);

        this.hideLoading();

        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState(state => {
                var orders = state.orders;

                this.props.showMessage("Order has been successfully fulfilled");

                orders.map(order => {
                    if(order._id === id){
                        orders.splice(state.orders.indexOf(order),1,response.data);
                    }
                })
                
                return {
                    showOrderStatus: false,
                    orderStatusAgent: {},
                    orders: orders
                }
            })

            this.getAgents();
        }
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

    showAgent(e, order){
        this.setState({
            selected_agent: order.agent,
            showAgent: true
        })
    }

    hideAgent(){
        this.setState({
            showAgent: false
        })
    }

    handleOnDocumentBottom = () => {
        switch(this.state.order_type){
            case "all":
                this.getOrders();
            break;
            case "completed":
                this.getCompleted();
            break;
            case "pending":
                this.getPending()
            break;
        }
    }

    showOrderItems(e,order){
        this.setState({
            showOrderItems: true,
            selected_order: order
        })
        e.preventDefault();
    }

    showAgentsToAssign(e, order){
        this.setState({
            showAgentsToAssign: true,
            selected_order: order
        })
        e.preventDefault();
    }

    async agentSelected(e, agent){
        e.preventDefault();

        this.showLoading();

        const response = await API.assignAgentToOrder(agent._id, this.state.selected_order._id);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            //set the selected order to agent assigned 
            this.getAgents();
            this.props.showMessage("Request to fulfill order has been sent to agent")
        }
    }

    async removeAgentFromRoute(e, agent){
        e.preventDefault();

        this.showLoading();

        const response = await API.removeAgentFromOrder(agent._id, this.state.selected_order._id);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            //set the selected order to agent assigned
            this.getAgents();
            this.props.showMessage("Agent was successfully unassigned from order");
        }
    }

    async getAgents(){
        const response1 = await API.getAgents();

        if(response1=="error"){
            //show error message
            return;
        }

        if(response1 && response1.data){
            this.setState({
                agents: response1.data
            })   
        }
    }

    showInvoice(order){
        this.setState({
            showInvoice: true,
            selected_order: order
        })
    }

    handleCloseModal(){
        this.setState({
            showOrderItems: false,
            showAgentsToAssign: false,
            showInvoice: false
        })
    }

    closeOrderStatus(){
        this.setState({
            showOrderStatus: false,
            orderStatusAgent: {}
        })
    }

    async getOrders(){
        this.showLoading();

        const response = await API.getOrders((this.state.order_type === "all") ? this.state.orders.length : 0, this.state.city);

        this.hideLoading();

        if(response=="error"){
            //show error message

            this.setState({
                order_type: "all"
            });

            return;
        }

        if(response && response.data){
            this.setState(state => {

                if(state.orders.length>0){
                    if(state.order_type === "all"){
                        var orders = state.orders.concat(response.data);

                        return {
                            selected_order: {},
                            orders: orders,
                            order_type: "all"
                        }
                    }
                    else{
                        return {
                            selected_order: {},
                            orders: response.data,
                            order_type: "all"
                        }
                    }
                }
                else{
                    return {
                        selected_order: {},
                        orders: response.data,
                        order_type: "all"
                    }
                }
            })
        }

        this.getCount();
    }

    async getCompleted(){
        this.showLoading();

        const response = await API.getCompletedOrders( (this.state.order_type === "completed") ? this.state.orders.length : 0, this.state.city );

        this.hideLoading();

        if(response=="error"){
            //show error message

            this.setState({
                order_type: "completed"
            });

            return;
        }

        if(response && response.data){
            this.setState(state => {

                if(state.orders.length>0){
                    if(state.order_type === "completed"){
                        var orders = state.orders.concat(response.data);

                        return {
                            selected_order: {},
                            orders: orders,
                            order_type: "completed"
                        }
                    }
                    else{
                        return {
                            selected_order: {},
                            orders: response.data,
                            order_type: "completed"
                        }
                    }
                }
                else{
                    return {
                        selected_order: {},
                        orders: response.data,
                        order_type: "completed"
                    }
                }
            })
        }

        this.getCount();
    }

    async getPending(){
        this.showLoading();
        
        const response = await API.getPendingOrders( (this.state.order_type === "pending") ? this.state.orders.length : 0, this.state.city );

        this.hideLoading();

        if(response=="error"){
            //show error message

            this.setState({
                order_type: "pending"
            });

            return;
        }

        if(response && response.data){
            this.setState(state => {

                if(state.orders.length>0){
                    if(state.order_type === "pending"){
                        var orders = state.orders.concat(response.data);

                        return {
                            selected_order: {},
                            orders: orders,
                            order_type: "pending"
                        }
                    }
                    else{
                        return {
                            selected_order: {},
                            orders: response.data,
                            order_type: "pending"
                        }
                    }
                }
                else{
                    return {
                        selected_order: {},
                        orders: response.data,
                        order_type: "pending"
                    }
                }
            })
        }

        this.getCount();
    }

    async getCount(){
        //orders count
        const response1 = await API.getOrdersCount(this.state.city);

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
        this.getOrders();

        this.getAgents();

        this.pubnub.subscribe({
            channels: this.state.channels
        });
        
        this.pubnub.getMessage('neworder', (msg) => {
            this.getOrders();
        });

        this.pubnub.getMessage('orderstatus', (data) => {
            
            var agent = data.userMetadata;
        
            var response = data.message.status;

            if(response==="completed"){
                this.setState({
                    showOrderStatus: true,
                    orderStatusAgent: agent,
                })
            }

            if(response==="abandoned"){
                var msg = "Agent " +agent.firstname+" "+agent.lastname +" has abandoned his delivery";
                this.props.showMessage(msg);
            }
        });
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
                    <div className="bt-city-holder" >
                        <h5 className="text-left" style={left}>{this.state.total_count} Order(s)</h5>

                        <div className="bt-center" style={{width: "200px"}}>
                            <select className="form-control" id="city" name="city" value={this.state.city} onChange={this.onFieldChanged}>
                                <option value="ALL">All</option>
                                <option value="LAGOS">Lagos</option>
                                <option value="ACCRA">Accra</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="bt-item-drink-profit shadow">
                            <button className="laser-inline blue-bg bt-btn" onClick={this.getOrders} style={ (this.state.order_type === "all") ? btn_blue : btn_grey}>all</button>
                            <button className="laser-inline grey-bg bt-btn" onClick={this.getCompleted} style={ (this.state.order_type === "completed") ? btn_blue : btn_grey}>completed</button>
                            <button className="laser-inline grey-bg bt-btn" onClick={this.getPending} style={ (this.state.order_type === "pending") ? btn_blue : btn_grey}>pending</button>
                        </div>
                        <br/>
                    </div>
                    <div className="row">
                        {
                            this.state.orders.map(order => {
                                return <Order key={order._id} showAgent={this.showAgent} order={order} markOrderAsFulfilled={this.markOrderAsFulfilled} showAgentsToAssign={this.showAgentsToAssign} showOrderItems={this.showOrderItems}/>
                            })
                        }
                    </div>
                </div>

                {
                    this.state.showAgent ? <ViewAgent agent={this.state.selected_agent} showViewAgent={this.state.showAgent} hideAgent={this.hideAgent}/> : ""
                }

                {
                    this.state.showOrderStatus ? <OrderStatus agent={this.state.orderStatusAgent} markOrderAsFulfilledWithId={this.markOrderAsFulfilledWithId} closeOrderStatus={this.closeOrderStatus} showOrderStatus={this.state.showOrderStatus} /> : ""
                }

                <ConfirmAction yesClicked={this.yesClicked} noClicked={this.noClicked} showConfirm={this.state.showConfirm} title={this.state.title} message={this.state.message}/>

                <Loader isLoading={this.state.isLoading}/>

                <BottomScrollListener onBottom={this.handleOnDocumentBottom} />
                
                { this.state.showAgentsToAssign ? <AssignAgent agents={this.state.agents} removeAgentFromRoute={this.removeAgentFromRoute} showAgentsToAssign={this.state.showAgentsToAssign} handleCloseModal={this.handleCloseModal} agentSelected={this.agentSelected} /> : ""}
               
                { this.state.showOrderItems ? <OrderItems showOrderItems={this.state.showOrderItems} order={this.state.selected_order} handleCloseModal={this.handleCloseModal}/> : "" }

            </div>
        )
    }
}