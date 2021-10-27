import React from 'react';

import agent_grey from '../images/agent_grey.png';

export default function Agent(props){

    return <div className="col-md-4 col-sm-4">
                <div className="shadow bt-item">
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <img className="bt-center" id="image" src={(props.agent.avatar!=null && props.agent.avatar.length>0) ? props.agent.avatar : agent_grey} width="60" height="60"/>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <h4>{props.agent.firstname} {props.agent.lastname}</h4>
                            <br/>
                            <h5>{props.agent.phone_number}</h5>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <button onClick={e => props.editClicked(e, props.agent)} className="shadow blue-bg bt-btn">edit</button>
                            <br/>
                            <button onClick={e => props.deleteAgent(e, props.agent)} className="shadow red-bg bt-btn">delete</button>
                        </div>
                    </div>
                </div>
           </div>

}