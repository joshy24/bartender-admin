import React from 'react'

import * as Utils from '../utils/Utils' 

export default function User(props){
    return <div className="col-md-6 col-sm-6">
                <div className="bt-item-user shadow">
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <h5><b>Name</b></h5>
                            <h4 className="bt-blue-text">{props.user.firstname}</h4>
                            <h4 className="bt-blue-text">{props.user.lastname}</h4>
                            <br/>
                            <h5>Orders - {props.user.orders.length}</h5>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h5><b>Date of Birth</b></h5>
                            <h6>{props.user.age}</h6>
                            <br/>
                            <h5><b>Phone Number</b></h5>
                            <h6>{props.user.phone_number}</h6>
                            <br/>
                            <h5><b>Created</b></h5>
                            <h6>{Utils.getDate(props.user.created)}</h6>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            
                            <h5><b>Delivery Address</b></h5>
                            <h6>{props.user.delivery_address}</h6>
                            <br/>
                            <h5><b>Email</b></h5>
                            <h6>{props.user.email}</h6>
                            <br/>
                        </div>
                    </div>
                </div>
           </div>
}