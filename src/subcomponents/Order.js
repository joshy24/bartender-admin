import React from 'react'

import * as Utils from '../utils/Utils' 

export default function Order(props){

    //const cart = getCart(props.order.cart);

    return <div className="bt-item shadow">
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <h5><b>Order No.</b></h5>
                        <h4>{props.order._id}</h4>
                        <h5>{Utils.getDate(props.order.created)}</h5>
                        <br/>
                        <button onClick={e => props.showOrderItems(e,props.order)} className="bt-btn blue-bg">{props.order.cart.drinkQuantityList.length} items ordered</button>
                        <h5><b>Total Cost</b></h5>
                        <h5>{Utils.getAmount(props.order.cart.totalPrice + props.order.cart.tax + props.order.cart.delivery_cost)}</h5>
                        <br/>
                        <h5><b>City</b></h5>
                        <h5>{props.order.city}</h5>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <h5><b>Customer Name</b></h5>
                        <h5>{props.order.user.firstname} {props.order.user.lastname}</h5>
                        <br/>
                        <h5><b>Customer Phone Number</b></h5>
                        <h5>{props.order.user.phone_number}</h5>
                        <br/>
                        <h5><b>Customer Delivery Address</b></h5>
                        <h5>{props.order.user.delivery_address}</h5>
                        <br/>
                        <h5><b>Delivery Date</b></h5>
                        <h5>{props.order.delivery_date ? props.order.delivery_date : ""}</h5>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <br/>
                        {
                            props.order.status=="fulfilled" ? <h5 className="bt-green-text">Order Completed</h5> : <button onClick={e => props.markOrderAsFulfilled(e,props.order)} className="bt-btn blue-bg">Mark as fulfilled</button>
                        }  
                        <br/>
                        {
                            (props.order.status!=="fulfilled") ? <button onClick={e => props.showAgentsToAssign(e,props.order)} className="bt-btn blue-bg">Assign agent to order</button>  : "" 
                        }
                        <br/>
                        {
                            props.order.agent ? <button onClick={e => props.showAgent(e,props.order)} className="bt-btn purple-bg">View Agent</button> : ""
                        }
                        <br/>
                        <br/>
                        {
                            props.order.status=="fulfilled" ? <h5 className="bt-black-text">Invoice Number - {props.order.invoice}</h5> : ""
                        }
                    </div>
                </div>
           </div>
}