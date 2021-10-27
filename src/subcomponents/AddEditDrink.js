import React from 'react';

import logo1 from '../images/logo1.png';

import * as Utils from '../utils/Utils';

import { default as ReactSelect } from "react-select";

import Option from "./Option"

const image_text = "Add Image with size <= 500 KB"

export default function AddEditDrink(props){

    return  <div className="bt-item">
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <img className="bt-center" id="image" src={props.image == null ? logo1 : props.image} width="90" height="90"/>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h6>{image_text}</h6>
                        <input className="" type="file" onChange={props.imageChanged}/>
                        <button className="laser-inline green-bg bt-btn" onClick={props.uploadImage}>Upload Image</button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>Name</h6></label>
                        <input autoComplete="off" id="name" type="text" name="name" className="form-control" value={props.name} onChange={props.onFieldChanged}  placeholder="Name"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Category</h6></label>
                        <select className="form-control" id="category" name="category" value={props.category} onChange={props.onFieldChanged}>
                            {
                                props.categories.map(cat => {
                                    return <option key={cat._id}>{cat.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="unit"><h6>Unit</h6></label>
                        <select className="form-control" id="unit" name="unit" value={props.unit} onChange={props.onFieldChanged}>
                            <option>bottle</option>
                            <option>carton</option>
                            <option>crate</option>
                            <option>item</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Description</h6></label>
                        <input autoComplete="off" id="description" type="text" name="description" className="form-control" value={props.description} onChange={props.onFieldChanged}  placeholder="Description"/>
                    </div>
                    <div className="col-md-8 col-sm-8">
                        <label htmlFor="profit"><h6>Content (Ingredient's or recipe's)</h6></label>
                        <input autoComplete="off" id="content_string" type="text" name="content_string" className="form-control" value={props.content_string} onChange={props.onFieldChanged}  placeholder="seperate contents with a comma"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Price</h6></label>
                        <input autoComplete="off" id="price" type="number" name="price" className="form-control" value={props.price} onChange={props.onFieldChanged}  placeholder="Price"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="profit"><h6>Profit %</h6></label>
                        <input autoComplete="off" id="profit" type="number" name="profit" className="form-control" value={props.profit} onChange={props.onFieldChanged}  placeholder="Profit %"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Price with profit</h6></label>
                        <div className="bt-item-drink-profit shadow">
                            <h5>{Utils.getAmount(props.profit_price)}</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>Stock</h6></label>
                        <input autoComplete="off" id="stock" type="number" name="stock" className="form-control" value={props.stock} onChange={props.onFieldChanged}  placeholder="Stock"/>
                    </div>
                    
                    <div className="col-md-6 col-sm-6">
                        <label htmlFor="city"><h6>City</h6></label>
                        <ReactSelect
                            options={Utils.cityOptions}
                            isMulti
                            closeMenuOnSelect={true}
                            hideSelectedOptions={false}
                            components={{
                                Option
                            }}
                            onChange={props.handleChange}
                            allowSelectAll={true}
                            value={props.city}
                            />
                    </div>
                </div>
            </div>
}