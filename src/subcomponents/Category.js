import React,{Component} from 'react'

import logo1 from '../images/logo1.png';

const btn_style_left = {
    marginLeft: "8px",
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "8px"
}

export default function Category(props){
    return <div className="col-md-4 col-sm-4">
                <div className="bt-item shadow" style={{height: "200px"}}>
                    <div className="row">
                        <div className="col-md-5 col-sm-5">
                            <h4>{props.category.name}</h4>
                            <img className="bt-center" id="image" src={props.category.image_url == null ? logo1 : props.category.image_url} width="90" height="90"/>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h5>{props.category.drinks_count} Drinks</h5>
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <button className="laser-inline blue-bg bt-btn" onClick={e => props.editClicked(e,props.category)} style={btn_style_left}>edit</button>
                            <button className="laser-inline red-bg bt-btn" style={btn_style_right}>delete</button>
                        </div>
                    </div>
                </div>
           </div>
}