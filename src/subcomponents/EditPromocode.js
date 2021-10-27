import React, {useState} from 'react'

import { default as ReactSelect } from "react-select";

import ReactModal from 'react-modal';

import * as Utils from '../utils/Utils';

import Option from "./Option"

ReactModal.setAppElement('#main');

const btn_style_left = {
    marginLeft: "16px",
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}

export default function EditPromocode(props){
    const [city, setCity] = useState(props.city ? Utils.getCities(props.city) : [])

    const handleChange = (selected) => {
        setCity(selected)

        var cities = []

        cities = selected.map(selection => {
            return selection.value;
        })

        props.onCityChanged(cities)

    };

    return  <div>
                <ReactModal 
                    isOpen={props.showEditPromocode}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Edit Promocode</h4>
                    <br/>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <label htmlFor="count"><h6>Name of code</h6></label>
                            <input autoComplete="off" id="code_name" type="text" name="code_name" className="form-control" value={props.code_name} onChange={props.onFieldChanged}  placeholder="Name of Promocode"/>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <label htmlFor="count"><h6>Number of usages</h6></label>
                            <input autoComplete="off" id="count" type="text" name="count" className="form-control" value={props.count} onChange={props.onFieldChanged}  placeholder="Promo codes to generate"/>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <br/>
                            <label htmlFor="percentage"><h6>Percentage</h6></label>
                            <input autoComplete="off" id="percentage" type="number" name="percentage" className="form-control" value={props.percentage} onChange={props.onFieldChanged}  placeholder="Percentage"/>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <br/>
                            <label htmlFor="city"><h6>City</h6></label>
                            <ReactSelect
                                options={Utils.cityOptions}
                                isMulti
                                closeMenuOnSelect={true}
                                hideSelectedOptions={false}
                                components={{
                                    Option
                                }}
                                onChange={handleChange}
                                allowSelectAll={true}
                                value={city}
                                />
                        </div>
                    </div>
                    <br/>
                    <button className="laser-inline blue-bg bt-btn" style={btn_style_left} onClick={e => props.submitEditedPromocode(e)}>Save</button>
                    <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={e => props.cancelModal(e)}>Cancel</button>
                </ReactModal>
            </div>
}