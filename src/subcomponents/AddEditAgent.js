import React from 'react';

import agent_grey from '../images/agent_grey.png';
import id_grey from '../images/id_grey.png';

const image_text = "Add Image with size <= 500 KB"

export default function AddEditAgent(props){
    return  <div className="bt-item-no-margin">
                <div className="row">
                    <h5 className="text-center"><b>Add Agents Avatar</b></h5>
                    <div className="col-md-6 col-sm-6">
                        <img className="bt-center" id="image" src={props.avatar == null ? agent_grey : props.avatar} width="90" height="90"/>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h6>{image_text}</h6>
                        <input className="" type="file" onChange={props.imageChanged}/>
                        <button className="laser-inline green-bg bt-btn" onClick={props.uploadImage}>Upload Image</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h5 className="text-center"><b>Add Identification</b></h5>
                    <div className="col-md-3 col-sm-3">
                        <img className="bt-center" id="image" src={props.verification_image == null ? id_grey : props.verification_image} width="60" height="60"/>
                    </div>
                    <div className="col-md-5 col-sm-5">
                        <h6>{image_text}</h6>
                        <input className="" type="file" onChange={props.verificationChanged}/>
                        <button className="laser-inline green-bg bt-btn" onClick={props.uploadVerification}>Upload Verification</button>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="verification_type"><h5>Verification Type</h5></label>
                        <select className="form-control" id="verification_type" name="verification_type" value={props.verification_type} onChange={props.onFieldChanged}>
                            <option>National Id Card</option>
                            <option>Drivers License</option>
                            <option>Passport</option>
                        </select>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>FirstName</h6></label>
                        <input autoComplete="off" id="firstname" type="text" name="firstname" className="form-control" value={props.firstname} onChange={props.onFieldChanged}  placeholder="FirstName"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>LastName</h6></label>
                        <input autoComplete="off" id="lastname" type="text" name="lastname" className="form-control" value={props.lastname} onChange={props.onFieldChanged}  placeholder="LastName"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Email</h6></label>
                        <input autoComplete="off" id="email" type="text" name="email" className="form-control" value={props.email} onChange={props.onFieldChanged}  placeholder="Email"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Phone Number</h6></label>
                        <input autoComplete="off" id="phone_number" type="tel" name="phone_number" className="form-control" value={props.phone_number} onChange={props.onFieldChanged}  placeholder="Phone Number"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Second Phone Number</h6></label>
                        <input autoComplete="off" id="phone_number_1" type="tel" name="phone_number_1" className="form-control" value={props.phone_number_1} onChange={props.onFieldChanged}  placeholder="Second Phone Number"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="unit"><h6>Password</h6></label>
                        <input autoComplete="off" id="password" type="text" name="password" className="form-control" value={props.password} onChange={props.onFieldChanged}  placeholder="Password"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Address</h6></label>
                        <input autoComplete="off" id="address" type="text" name="address" className="form-control" value={props.address} onChange={props.onFieldChanged}  placeholder="Address"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Age</h6></label>
                        <input autoComplete="off" id="age" type="number" name="age" className="form-control" value={props.age} onChange={props.onFieldChanged}  placeholder="Age"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Gender</h6></label>
                        <select className="form-control" id="gender" name="gender" value={props.gender} onChange={props.onFieldChanged}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>Marital Status</h6></label>
                        <select className="form-control" id="marital_status" name="marital_status" value={props.marital_status} onChange={props.onFieldChanged}>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>Referee 1 Name</h6></label>
                        <input autoComplete="off" id="referee_name_1" type="text" name="referee_name_1" className="form-control" value={props.referee_name_1} onChange={props.onFieldChanged}  placeholder="Referee 1 Name"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Referee 1 Address</h6></label>
                        <input autoComplete="off" id="referee_address_1" type="text" name="referee_address_1" className="form-control" value={props.referee_address_1} onChange={props.onFieldChanged}  placeholder="Referee 1 Address"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Referee 1 Phone Number</h6></label>
                        <input autoComplete="off" id="referee_phone_1" type="tel" name="referee_phone_1" className="form-control" value={props.referee_phone_1} onChange={props.onFieldChanged}  placeholder="Referee 1 Phone Number"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>Referee 2 Name</h6></label>
                        <input autoComplete="off" id="referee_name_2" type="text" name="referee_name_2" className="form-control" value={props.referee_name_2} onChange={props.onFieldChanged}  placeholder="Referee 2 Name"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Referee 2 Address</h6></label>
                        <input autoComplete="off" id="referee_address_2" type="text" name="referee_address_2" className="form-control" value={props.referee_address_2} onChange={props.onFieldChanged}  placeholder="Referee 2 Address"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="price"><h6>Referee 2 Phone Number</h6></label>
                        <input autoComplete="off" id="referee_phone_2" type="tel" name="referee_phone_2" className="form-control" value={props.referee_phone_2} onChange={props.onFieldChanged}  placeholder="Referee 2 Phone Number"/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Bank Name</h6></label>
                        <input autoComplete="off" id="bank_name" type="text" name="bank_name" className="form-control" value={props.bank_name} onChange={props.onFieldChanged}  placeholder="Bank Name"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="name"><h6>Account Name</h6></label>
                        <input autoComplete="off" id="account_name" type="text" name="account_name" className="form-control" value={props.account_name} onChange={props.onFieldChanged}  placeholder="Account Name"/>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <label htmlFor="category"><h6>Account Number</h6></label>
                        <input autoComplete="off" id="account_number" type="text" name="account_number" className="form-control" value={props.account_number} onChange={props.onFieldChanged}  placeholder="Account Number"/>
                    </div>
                </div>
            </div>
}