import React,{Component} from 'react'

import ReactModal from 'react-modal';

import * as API from '../api/Api';


import * as Utils from '../utils/Utils';

import S3FileUpload from 'react-s3';

import logo1 from '../images/logo1.png';

import { default as ReactSelect } from "react-select";

import Option from "./Option"

import * as Config from "../config"

const image_text = "Add Image with size <= 500 KB"

const btn_style_left = {
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}

const config = Config.s3config

ReactModal.setAppElement('#main');

ReactModal.setAppElement('#main');

export default class AddCategory extends Component{
    constructor(props){
        super(props);

        this.state={
            name: "",
            image_url: "",
            file: null,
            image_uploaded: false,
            city: [],
        }

        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.createCategory = this.createCategory.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (selected) => {
        this.setState({
            city: selected
        })
    };

    async createCategory(){
        if(this.state.name.length <= 0 && this.state.name.length > 100){
           return;
        }

        const response = await API.createCategory(this.state.name)
        
        if(response==="error"){
            //show error message
            return;
        }

        if(response.data && response.data.response==="created"){
            this.setState({
                name: ""
            })
            this.props.reloadCategories();
        }

    }
        
    onFieldChanged(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    imageChanged(e){
        var file =  e.target.files[0]
        
        if(file){
            if (!file.name.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
                //file is not an image
                this.setState({
                    error: "File is not a Zip File"
                })
                return;
            }
            
            if(file.size>512000){
                //file is too large
                this.setState({
                    error: "File is too large"
                })
                return;
            }
    
            this.setState({
                file: file,
                image_url: URL.createObjectURL(file),
            });
        }
    }

    uploadImage(){
        if(this.state.file){
            S3FileUpload
                .uploadFile(this.state.file, config)
                .then(data => { 

                    if(data.result && data.result.ok == true && (data.result.status < 300 && data.result.status >=200)){
                        this.setState({
                            image_uploaded: true,
                            image_url: data.location
                        })
                    }
                    
                })
                .catch(err => {
                    console.error(err);

                    this.setState({
                        error: "Error uploading file..."
                    })
                })
        }
    }

    render(){
        return (
                <ReactModal 
                    isOpen={this.props.showAddCategory}
                    className="CategoryModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Add Category</h4>
                    <div className="bt-item">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label htmlFor="unit"><h6>Name</h6></label>
                                <input autoComplete="off" id="name" type="text" name="name" className="form-control" value={this.state.name} onChange={this.onFieldChanged}  placeholder="Name"/>
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
                                    onChange={this.handleChange}
                                    allowSelectAll={true}
                                    value={this.state.city}
                                    />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <img className="bt-center" id="image" src={!this.state.image_url ? logo1 : this.state.image_url} width="90" height="90"/>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <h6>{image_text}</h6>
                                <input className="" type="file" onChange={this.imageChanged}/>
                                <button className="laser-inline green-bg bt-btn" onClick={this.uploadImage}>Upload Image</button>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <button className="laser-inline green-bg bt-btn" style={btn_style_left} onClick={this.createCategory}>save</button>
                        <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={this.props.handleCloseModal}>cancel</button>
                    </div>
                </ReactModal>
        )
    }
}