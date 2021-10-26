import React,{Component} from 'react'

import ReactModal from 'react-modal';

import * as API from '../api/Api';

import S3FileUpload from 'react-s3';

import logo1 from '../images/logo1.png';

import { default as ReactSelect } from "react-select";

import Option from "./Option"

const cityOptions = [
    { value: "LAGOS", label: "Lagos" },
    { value: "ACCRA", label: "Accra" }
];


const image_text = "Add Image with size <= 500 KB"

const btn_style_left = {
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}

const config = {
    bucketName: process.env.AWS_BUCKET,
    dirName: 'categories', /* optional */
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
}

ReactModal.setAppElement('#main');

export default class EditCategory extends Component{
    constructor(props){
        super(props);

        this.state={
            name: "",
            image_url: props.category.image_url,
            file: null,
            image_uploaded: false,
            city: ["LAGOS"]
        }

        this.editCategory = this.editCategory.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
    }

    componentDidMount(){
        this.setState({
            image_url: this.props.category.image_url,
            city: this.props.category.city ? this.props.category.city : ["LAGOS"]
        })
    }

    async editCategory(){
        if(this.state.name.length <= 0 && this.state.name.length > 100){
           return;
        }

        const response = await API.editCategory(this.props.category._id,this.state.name, this.state.image_uploaded ? this.state.image_url : "" )
        
        if(response==="error"){
            //show error message
            return;
        }

        if(response.data && response.data.response==="success"){
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
        })
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
                    console.log(data)
                    this.setState({
                        image_uploaded: true
                    })
                })
                .catch(err => console.error(err))
        }
    }

    render(){
        return (
                <ReactModal 
                    isOpen={this.props.showEditCategory}
                    className="EditCategoryModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Edit Category</h4>
                    <div className="bt-item">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <h4>{this.props.category.name}</h4>
                                <br/>
                                <label htmlFor="unit"><h6>New Name</h6></label>
                                <input autoComplete="off" id="name" type="text" name="name" className="form-control" value={ this.state.name } onChange={this.onFieldChanged}  placeholder={this.props.category.name}/>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label htmlFor="city"><h6>City</h6></label>
                                <ReactSelect
                                    options={cityOptions}
                                    isMulti
                                    closeMenuOnSelect={true}
                                    hideSelectedOptions={false}
                                    components={{
                                        Option
                                    }}
                                    onChange={this.onFieldChanged}
                                    allowSelectAll={true}
                                    value={this.state.city}
                                    />
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <img className="bt-center" id="image" src={this.state.image_url == null ? logo1 : this.state.image_url} width="90" height="90"/>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <h6>{image_text}</h6>
                                <input className="" type="file" onChange={this.imageChanged}/>
                                <button className="laser-inline green-bg bt-btn" onClick={this.uploadImage}>Upload Image</button>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <button className="laser-inline green-bg bt-btn" style={btn_style_left} onClick={this.editCategory}>save</button>
                        <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={this.props.handleCloseModal}>cancel</button>
                    </div>
                </ReactModal>
        )
    }
}