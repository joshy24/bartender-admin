import React from 'react';

export default function Message(props){
    return  <div className="bt-message-div">
                <div className="container">
                    <h5 className="text-center">{props.message}</h5>
                </div>
            </div>
}