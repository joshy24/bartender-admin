import React, {Component} from 'react'
import AddEditDrink from './AddEditDrink';
import ReactModal from 'react-modal';

import * as API from '../api/Api';

import * as Utils from '../utils/Utils';

const btn_style_left = {
    marginLeft: "16px",
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}
 
ReactModal.setAppElement('#main');

export default class EditDrink extends Component{
    constructor(props){
        super(props);

        this.state={
            name: "",
            category: "",
            unit: "bottle",
            price: 0,
            profit: 0,
            profit_price:0,
            image: null,
            description: "",
            content: [],
            content_string:"",
            stock: 0,
            city: props.drink.city ? Utils.getCities(props.drink.city) : [],
            file: null
        }

        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.editDrink = this.editDrink.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){

        var contents = "";
        
        if(this.props.drink.content.length > 0){
            this.props.drink.content.map(con => {
                contents+=con+",";
            })
        }

        this.setState({
            name: this.props.drink.name,
            category: this.props.drink.category,
            unit: this.props.drink.unit,
            profit: this.props.drink.profit,
            price: Utils.getTruePrice(this.props.drink.price, this.props.drink.profit),
            profit_price: this.props.drink.price,
            image: this.props.drink.image,
            stock: this.props.drink.stock,
            content: this.props.drink.content,
            content_string: contents,
            description: this.props.drink.description,
            file: null,
            category: this.props.categories[0].name
        })
    }

    handleChange = (selected) => {
        this.setState({
            city: selected
        })
    };

    async editDrink(){

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
            _id: this.props.drink._id,
            name: this.state.name,
            category: this.state.category,
            unit: this.state.unit,
            profit: this.state.profit,
            price: this.state.profit_price,
            image: this.state.image,
            stock: this.state.stock,
            description: this.state.description,
            city: cities,
            content: cont
        }
        
        const response = await API.editDrink(data)
        
        if(response==="error"){
            //show error message
            this.setState({
                error: "The drink could not be edited at the moment. try again later"
            })
            return;
        }

        if(response.data && response.data.response==="edited"){
            this.setState({
                name: "",
                category: "",
                unit: "",
                price: 0,
                profit_price: 0,
                profit: 0,
                stock: 0,
                image: null,
                file: null,
                description: "",
                content_string: "",
                city: this.props.city ? Utils.getCities(this.props.city) : [],
                content: []
            })

            this.props.reloadDrinks();
        }
        else{
            this.setState({
                error: "An error occurred updating the drink. Please check the network"
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
            
            const response = await API.uploadDrinkImage(fd);

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
                    image: response.data.response
                })   
            }
            else{
                this.setState({
                    error: "An error occurred uploading the image. Please check the network"
                })
            }
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
                    isOpen={this.props.showEditDrink}
                    className="DrinkModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Edit Drink</h4>
                    <br/>
                    <h5 className="bt-red-text">{ this.state.error ? this.state.error : "" }</h5>
                    <br/>

                    <AddEditDrink handleChange={this.handleChange} content={this.state.content} description={this.state.description} content_string={this.state.content_string} uploadImage={this.uploadImage} categories={this.props.categories} imageChanged={this.imageChanged} onFieldChanged={this.onFieldChanged} file={this.state.file} name={this.state.name} profit={this.state.profit} price={this.state.price} profit_price={this.state.profit_price} category={this.state.category} unit={this.state.unit} image={this.state.image} stock={this.state.stock} city={this.state.city}/>

                    <button className="laser-inline green-bg bt-btn" style={btn_style_left} onClick={this.editDrink}>save</button>
                    <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={this.props.handleCloseModal}>cancel</button>
                </ReactModal>
            </div>
        )
    }
}