import React from 'react';

import logo1 from '../images/logo1.png';

import * as Utils from '../utils/Utils';

export default function Drink(props){

    return <div className="col-md-6 col-sm-6">
                <div className="shadow bt-item">
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <img className="bt-center" id="image" src={(props.drink.image!=null && props.drink.image.length>0) ? props.drink.image : logo1} width="60" height="60"/>
                        </div>
                        <div className="col-md-5 col-sm-5">
                            <h4>{props.drink.name}</h4>
                            <br/>
                            <h5>{props.drink.category}</h5>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h5>{Utils.getAmount(props.drink.price)} per {props.drink.unit}</h5>
                            <br/>
                            <h5>Stock - {props.drink.stock}</h5>
                        </div>
                    </div>
                    <div className="row">
                        {
                            props.drink.content ? <div className="col-md-12 col-sm-12">
                                                        <h6>Description - {props.drink.description}</h6>
                                                        <br/>
                                                        <h6 className="bt-inline">Content - </h6>
                                                        {
                                                            props.drink.content.map(con => {
                                                                return <h6 className="bt-inline">{con},</h6>
                                                            })
                                                        }
                                                  </div> : "" 
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <button onClick={e => props.editClicked(e, props.drink)} className="shadow blue-bg bt-btn bt-inline">edit</button>
                            <br/>
                            <button onClick={e => props.deleteDrink(e, props.drink)} className="shadow red-bg bt-btn bt-inline">delete</button>
                        </div>
                    </div>
                </div>
           </div>

}