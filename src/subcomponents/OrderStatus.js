import React from "react"

import ReactModal from 'react-modal';

import agent_grey from '../images/agent_grey.png';

const box_style = {
    margin: "16px"
}

const left = {
    float: "left",
    marginLeft: "20px"
}

export default function OrderStatus(props){
    return <div>
                <ReactModal 
                    isOpen={props.showOrderStatus}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Message From Agent</h4>
                    <button className="grey-bg bt-btn pull-right" style={box_style} onClick={props.closeOrderStatus}>close</button>
                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                                <img className="bt-center" id="image" src={(props.agent.avatar!=null && props.agent.avatar.length>0) ? props.agent.avatar : agent_grey} width="60" height="60"/>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <h5 className="black-text">{props.agent.firstname} {props.agent.lastname} has completed the assigned order </h5>
                            <h5>Order Number - {props.agent.order}</h5>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h5><b>Phone Number</b></h5>
                            <h5>{props.agent.phone_number}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <h5><button className="green-bg bt-btn" style={left} onClick={e => props.markOrderAsFulfilledWithId(e, props.agent.order)}>Mark Order as fulfilled</button></h5>
                    </div>

                </ReactModal>
           </div>
}