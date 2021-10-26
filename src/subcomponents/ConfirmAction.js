import React from 'react';

import ReactModal from 'react-modal';

ReactModal.setAppElement('#main');

const btn_style_left = {
    marginLeft: "16px",
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}

export default function ConfirmAction(props){
    return  <div>
                <ReactModal 
                    isOpen={props.showConfirm}
                    className="ConfirmModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center blue-text">{props.title}</h4>
                    <br/>
                    <h5 className="text-center">{props.message}</h5>
                    <br/>
                    <button className="laser-inline green-bg bt-btn" style={btn_style_left} onClick={props.yesClicked}>yes</button>
                    <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={props.noClicked}>no</button>
                </ReactModal>
            </div>
}