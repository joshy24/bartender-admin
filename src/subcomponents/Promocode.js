import React from 'react'

export default function(props){
    return <div className="col-md-3 col-sm-3">
                <div className="shadow bt-item-promo">
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-6">
                            <h4>{props.promo.code}</h4>
                            <h5>{props.promo.percentage}% off</h5>
                            <br/>
                            {props.promo.status=="activated" ? <h5 className="bt-blue-text">{props.promo.status}</h5> : <h5 className="bt-red-text">{props.promo.status}</h5>}
                        </div>
                        <div className="col-md-5 col-sm-5 col-xs-6">
                            <button onClick={e => props.editClicked(e, props.promo)} className="shadow red-bg bt-btn">edit</button>
                            <br/>
                            {
                                props.promo.status == "activated" ?
                                <button onClick={e => props.deactivateClicked(e, props.promo)} className="shadow purple-bg bt-btn">deactivate</button> : ""
                            }
                        </div>
                    </div>
                    <br/>
                    {<h5 className="bt-blue-text">{props.promo.usages} usages left</h5>}
                </div>
           </div>
}