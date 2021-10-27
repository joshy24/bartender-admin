import React from 'react';
import ReactModal from 'react-modal';

const box_style = {
    margin: "16px"
}

const left = {
    float: "left"
}

export default function AssignAgent(props){
    return <ReactModal 
                isOpen={props.showAgentsToAssign}
                className="Modal"
                overlayClassName="Overlay"
                contentLabel="Minimal Modal Example">

                <button className="grey-bg bt-btn pull-right" style={box_style} onClick={props.handleCloseModal}>close</button>
                <br/>
                <br/>

                {props.agents.map(agent => {
                    
                    return  <div className="bt-item" key={agent._id}>
                                <div className="row">
                                    <div className="col-md-4 col-sm-4">
                                        <h5><b>Name</b></h5>
                                        <h5>{agent.firstname} {agent.lastname}</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <h5><b>Phone Number</b></h5>
                                        <h5>{agent.phone_number}</h5>
                                    </div>
                                    <div className="col-md-2 col-sm-2">
                                        <h5><b>Status</b></h5>
                                        <h5>{ ( !agent.order || agent.order.length<=0 ) ? "available" : "unavailable" }</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <h5>{ ( !agent.order || agent.order.length<=0 ) ? <button className="green-bg bt-btn" style={left} onClick={e => props.agentSelected(e, agent)}>assign</button> : <button className="bt-btn red-bg" style={left} onClick={e => props.removeAgentFromRoute(e, agent)}>unassign</button> }</h5>
                                    </div>
                                </div>
                            </div>
                })}

            </ReactModal>
}