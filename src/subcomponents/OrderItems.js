import React from 'react'
import ReactModal from 'react-modal';

import * as Utils from '../utils/Utils' 

const box_style = {
    margin: "16px"
}

export default function OrderItem(props){

    return <ReactModal 
                isOpen={props.showOrderItems}
                className="OrderItemsModal"
                overlayClassName="Overlay"
                contentLabel="Minimal Modal Example">

                <button className="grey-bg bt-btn pull-right" style={box_style} onClick={props.handleCloseModal}>close</button>
                <br/>
                <br/>

                {props.order.cart.drinkQuantityList.map(dq => {

                    return <div className="bt-item" key={dq.drink._id}>
                                <div className="row">
                                    <div className="col-md-3 col-sm-3">
                                        <h5><b>Name</b></h5>
                                        <h5>{dq.drink.name}</h5>
                                    </div>
                                    <div className="col-md-2 col-sm-2">
                                        <h5><b>Unit</b></h5>
                                        <h5>{dq.drink.unit}</h5>
                                    </div>
                                    <div className="col-md-1 col-sm-1">
                                        <h5><b>Qty</b></h5>
                                        <h5>{dq.quantity}</h5>
                                    </div>
                                    <div className="col-md-2 col-sm-2">
                                        <h5><b>Price</b></h5>
                                        <h5>{Utils.getAmount(dq.drink.price)}</h5>
                                    </div>
                                    <div className="col-md-2 col-sm-2">
                                        <h5><b>Total Price</b></h5>
                                        <h5>{Utils.getAmount(dq.drink.price * dq.quantity)}</h5>
                                    </div>
                                </div>
                        </div>
                })}

            </ReactModal>   
}