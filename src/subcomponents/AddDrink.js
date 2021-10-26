import React, {Component} from 'react'
import AddEditDrink from './AddEditDrink';
import ReactModal from 'react-modal';

import S3FileUpload from 'react-s3';

import * as API from '../api/Api';

const config = {
    bucketName: process.env.AWS_BUCKET,
    dirName: 'drinkimages', /* optional */
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
}

const btn_style_left = {
    marginLeft: "16px",
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}
 
ReactModal.setAppElement('#main');


export default class AddDrink extends Component{
    constructor(props){
        super(props);

        this.state={
            name: "",
            category: "",
            unit: "bottle",
            price: 0,
            profit_price: 0,
            profit: 0,
            error: "",
            stock: 0,
            image_uploaded: false,
            image: null,
            file: null,
            description: "",
            content_string: "",
            content: [],
            city: []
        }

        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.createDrink = this.createDrink.bind(this);
    }

    async createDrink(){
        this.setState({
            error: ""
        })

        if(this.state.name.length <= 0 || this.state.name.length > 100){
            this.setState({
                error: "Please complete all fields"
            })
            return;
        }

        if(this.state.price <= 0 || this.state.profit <= 0){
            this.setState({
                error: "Please complete all fields"
            })
            return;
        } 

        var cities = []

        cities = this.state.city.map(selection => {
            return selection.value;
        })

        var cont = [];
        
        if(this.state.content_string.length > 0){
            if(this.state.content_string.includes(",")){
                cont = this.state.content_string.split(",");
            }
            else{
                cont.push(this.state.content_string)
            }
        }

        const data = {
            name: this.state.name,
            category: this.state.category.length <= 0 ? this.props.categories[0].name : this.state.category,
            unit: this.state.unit,
            price: this.state.profit_price,
            profit: this.state.profit,
            image: this.state.image,
            stock: this.state.stock,
            description: this.state.description,
            content: cont,
            city: cities
        }
        
        this.props.showLoading();

        const response = await API.createDrink(data)
        
        this.props.hideLoading();
        
        if(response==="error"){
            //show error message
            this.setState({
                error: "Your drink could not be added at the moment. try again later"
            })
            return;
        }

        if(response.data && response.data.response==="created"){
            this.setState({
                name: "",
                category: "Special Packages",
                unit: "bottle",
                price: 0,
                profit_price: 0,
                image_uploaded: false,
                stock: 0,
                profit: 0,
                image: null,
                file: null,
                description: "",
                content_string: "",
                content: [],
                city: []
            })

            this.props.reloadDrinks();
        }
        else{
            this.setState({
                error: "Your drink could not be added at the moment. try again later"
            })
        }
    }

    componentDidMount(){
        if(this.props.categories.length){
            this.setState({
                category: this.props.categories[0].name
            })
        }
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
                image: URL.createObjectURL(file),
            });
        }
    }

    async uploadImage(){
        if(this.state.file!=null){

            var fd = new FormData();
            
            fd.append("image", this.state.file, this.state.file.name);
            
            this.props.showLoading();

            S3FileUpload
                .uploadFile(this.state.file, config)
                .then( data => { 
                    console.log(data) 
                })
                .catch(err => { 
                    console.error(err)  
                    //show error message
                    this.setState({
                        error: "An error occurred uploading the image. Please check the network"
                    })
                    return;
                })

            /*const response = await API.uploadDrinkImage(fd);

            this.props.hideLoading();

            if(response=="error"){
                //show error message
                this.setState({
                    error: "An error occurred uploading the image. Please check the network"
                })
                return;
            }

            if(response && response.data && response.data.response){
                this.setState({
                    image: response.data.response,
                    image_uploaded: true
                })   
            }
            else{
                this.setState({
                    error: "An error occurred uploading the image. Please check the network"
                })
            }*/
        }
    }

    onFieldChanged(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if(name==="price"){
            if(value>0){
                var new_value = parseInt(value) + ((this.state.profit / 100) * parseInt(value));
            }

            this.setState({
                price: value,
                profit_price: new_value
            })
        }
        else if(name==="profit"){
            var new_value = parseInt(this.state.price) + ((value / 100) * parseInt(this.state.price));

            this.setState({
                profit_price: new_value,
                profit: value
            })
        }
        else{
            this.setState({
                [name]: value
            })
        }
    }

    render(){
        return (
            <div>
                <ReactModal 
                    isOpen={this.props.showAddDrink}
                    className="DrinkModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Add Drink</h4>
                    <br/>
                    <h5 className="bt-red-text">{ this.state.error ? this.state.error : "" }</h5>
                    <br/>
                    { this.state.image_uploaded ? <h5 className="bt-green-text">Image Successfully Uploaded</h5> : "" }

                    <AddEditDrink city={this.state.city} content={this.state.content} description={this.state.description} content_string={this.state.content_string} uploadImage={this.uploadImage} categories={this.props.categories} imageChanged={this.imageChanged} onFieldChanged={this.onFieldChanged} file={this.state.file} name={this.state.name} profit={this.state.profit} profit_price={this.state.profit_price} price={this.state.price} category={this.state.category} unit={this.state.unit} image={this.state.image} stock={this.state.stock}/>

                    <button className="laser-inline green-bg bt-btn bt-inline" style={btn_style_left} onClick={this.createDrink}>save</button>
                    <button className="laser-inline grey-bg bt-btn bt-inline" style={btn_style_right} onClick={this.props.handleCloseModal}>cancel</button>
                </ReactModal>
            </div>
        )
    }
}