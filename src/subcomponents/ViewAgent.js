import React from "react"

import ReactModal from 'react-modal';

import agent_grey from '../images/agent_grey.png';

const left = {
    marginTop: "50px",
    marginLeft: "20px"
}


ReactModal.setAppElement('#main');

export default function ViewAgent(props){
    return <div>
                <ReactModal 
                    isOpen={props.showViewAgent}
                    className="ViewAgentModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">

                        <div className="row">
                            <div className="col-md-3 col-sm-3">
                                <img className="bt-center" id="image" src={(props.agent.avatar!=null && props.agent.avatar.length>0) ? props.agent.avatar : agent_grey} width="60" height="60"/>
                            </div>
                            <div className="col-md-5 col-sm-5">
                                <h4>{props.agent.firstname} {props.agent.lastname}</h4>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <h5>{props.agent.phone_number}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <button style={left} onClick={props.hideAgent} className="bt-btn blue-bg">close</button>
                        </div>

                </ReactModal>
           </div>
}