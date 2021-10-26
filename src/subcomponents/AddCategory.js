import React,{Component} from 'react'

import ReactModal from 'react-modal';

import * as API from '../api/Api';

const btn_style_left = {
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}

ReactModal.setAppElement('#main');

export default class AddCategory extends Component{
    constructor(props){
        super(props);

        this.state={
            name: ""
        }

        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.createCategory = this.createCategory.bind(this);
    }

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

    render(){
        return (
                <ReactModal 
                    isOpen={this.props.showAddCategory}
                    className="CategoryModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Add Category</h4>
                    <div className="bt-item">
                        <label htmlFor="unit"><h6>Name</h6></label>
                        <input autoComplete="off" id="name" type="text" name="name" className="form-control" value={this.state.name} onChange={this.onFieldChanged}  placeholder="Name"/>
                        <br/>
                        <br/>
                        <button className="laser-inline green-bg bt-btn" style={btn_style_left} onClick={this.createCategory}>save</button>
                        <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={this.props.handleCloseModal}>cancel</button>
                    </div>
                </ReactModal>
        )
    }
}