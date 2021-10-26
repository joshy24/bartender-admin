import React from 'react';

import { Link } from 'react-router-dom'

const fontStyle = {
    fontSize: "17px"
}

export default function OrderStats(props){
    return <div className="bt-bottom-div">
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <h5 style={fontStyle} className="text-center">Completed Orders</h5>
                        <h5 style={fontStyle} className="text-center">{props.data.fulfilled}</h5>
                    </div>

                    <div className="col-md-4 col-sm-4">
                        <h5 style={fontStyle} className="text-center">Pending Orders</h5>
                        <h5 style={fontStyle} className="text-center">{props.data.pending}</h5>
                    </div>

                    <div className="col-md-4 col-sm-4">
                        <Link to={'/app/orders'}><button className="bt-btn blue-bg bt-center" onClick={props.showOrders}>Show Orders</button> </Link>
                    </div>
                </div>
           </div>
}