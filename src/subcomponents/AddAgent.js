import React, {Component} from 'react'

import ReactModal from 'react-modal';

import * as API from '../api/Api';

import AddEditAgent from './AddEditAgent';

const btn_style_left = {
    marginLeft: "16px",
    marginRight: "8px"
}

const btn_style_right = {
    marginLeft: "8px",
    marginRight: "16px"
}

ReactModal.setAppElement('#main');

export default class AddAgent extends Component{
    constructor(props){
        super(props);

        this.state={
            firstname: "",
            lastname: "",
            phone_number: "",
            password: "",
            avatar: null,
            file: null,
            ver_file: null,
            verification_type: "",
            verification_image: null,

            phone_number_1: "",
            address: "",
            email: "",
            referee_name_1: "",
            referee_name_2: "",
            referee_address_1: "",
            referee_address_2: "",
            referee_phone_1: "",
            referee_phone_2: "",
            age: 0,
            marital_status: "Single",
            gender: "Male",
            bank_name: "",
            account_name: "",
            account_number: ""
        }

        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.imageChanged = this.imageChanged.bind(this);
        this.verificationChanged = this.verificationChanged.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.uploadVerification = this.uploadVerification.bind(this);
        this.createAgent = this.createAgent.bind(this);
    }
    
    async createAgent(){
        if(this.state.firstname.length <= 0 || this.state.firstname.length > 100){
           return;
        }

        if(this.state.lastname.length <= 0 || this.state.lastname.length > 100){
            return;
        }

        if(this.state.phone_number.length <= 0 || this.state.phone_number.length > 100){
            return;
        }

        if(this.state.password.length <= 0 || this.state.password.length > 100){
            return;
        }

        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone_number: this.state.phone_number,
            password: this.state.password,
            avatar: this.state.avatar,
            verification_type: this.state.verification_type,
            verification_image: this.state.verification_image,
            phone_number_1: this.state.phone_number_1,
            address: this.state.address,
            email: this.state.email,
            referee_name_1: this.state.referee_name_1,
            referee_name_2: this.state.referee_name_2,
            referee_address_1: this.state.referee_address_1,
            referee_address_2: this.state.referee_address_2,
            referee_phone_1: this.state.referee_phone_1,
            referee_phone_2: this.state.referee_phone_2,
            age: this.state.age,
            marital_status: this.state.marital_status,
            gender: this.state.gender,
            bank_name: this.state.bank_name,
            account_name: this.state.account_name,
            account_number: this.state.account_number
        }
        
        this.props.showLoading();

        const response = await API.createAgent(data)
        
        this.props.hideLoading();
        
        if(response==="error"){
            //show error message
            return;
        }

        if(response.data && response.data.response==="created"){
            this.setState({
                firstname: "",
                lastname: "",
                phone_number: "",
                password: "",
                avatar: null,
                file: null,
                ver_file: null,
                verification_type: "",
                verification_image: null,
                phone_number_1: "",
                address: "",
                email: "",
                referee_name_1: "",
                referee_name_2: "",
                referee_address_1: "",
                referee_address_2: "",
                referee_phone_1: "",
                referee_phone_2: "",
                age: 0,
                marital_status: "",
                gender: "",
                bank_name: "",
                account_name: "",
                account_number: ""
            })

            this.props.reloadAgents();
        }
    }

    verificationChanged(e){
        var file =  e.target.files[0]
        
        if(file){
            if (!file.name.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
                //file is not an image
                this.error_message = "File is not a Zip File";
                return;
            }
            
            if(file.size>256000){
                //file is too large
                this.error_message = "File is too large";
                return;
            }
    
            this.setState({
                ver_file: file,
                verification_image: URL.createObjectURL(file)
            });
        }
    }

    imageChanged(e){
        var file =  e.target.files[0]
        
        if(file){
            if (!file.name.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
                //file is not an image
                this.error_message = "File is not a Zip File";
                return;
            }
            
            if(file.size>256000){
                //file is too large
                this.error_message = "File is too large";
                return;
            }
    
            this.setState({
                file: file,
                avatar: URL.createObjectURL(file)
            });
        }
    }

    async uploadImage(){
        if(this.state.file!=null){

            var fd = new FormData();
            
            fd.append("avatar", this.state.file, this.state.file.name);
            
            this.props.showLoading();

            const response = await API.uploadAgentAvatar(fd);

            this.props.hideLoading();

            if(response=="error"){
                //show error message
                return;
            }

            if(response && response.data && response.data.response){
                this.setState({
                    avatar: response.data.response
                })   
            }
            else{
                this.setState({
                    error: "An error occurred uploading the file. Please check the network"
                })
            }
        }
    }

    async uploadVerification(){
        if(this.state.ver_file!=null){

            var fd = new FormData();

            fd.append("verification_image", this.state.ver_file, this.state.ver_file.name);
            fd.append("verification_type", this.state.verification_type);
            
            this.props.showLoading();

            const response = await API.uploadAgentId(fd);

            this.props.hideLoading();

            if(response=="error"){
                //show error message
                return;
            }

            if(response && response.data && response.data.response){
                this.setState({
                    verification_image: response.data.response
                })   
            }
            else{
                this.setState({
                    error: "An error occurred uploading the file. Please check the network"
                })
            }
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

    render(){
        return (
            <div>
                <ReactModal 
                    isOpen={this.props.showAddAgent}
                    className="AgentModal"
                    overlayClassName="Overlay"
                    contentLabel="Minimal Modal Example">
                    <h4 className="text-center">Add Agent</h4>

                    <AddEditAgent 
                        verification_type={this.state.verification_type} 
                        uploadVerification={this.uploadVerification} 
                        verificationChanged={this.verificationChanged} 
                        uploadImage={this.uploadImage} 
                        imageChanged={this.imageChanged} 
                        onFieldChanged={this.onFieldChanged} 
                        ver_file={this.state.ver_file} 
                        file={this.state.file} 
                        firstname={this.state.firstname} 
                        lastname={this.state.lastname} 
                        password={this.state.password} 
                        phone_number={this.state.phone_number} 
                        avatar={this.state.avatar} 
                        verification_image={this.state.verification_image}
                        phone_number_1={this.state.phone_number_1}
                        address={this.state.address}
                        email={this.state.email}
                        referee_name_1={this.state.referee_name_1}
                        referee_name_2={this.state.referee_name_2}
                        referee_address_1={this.state.referee_address_1}
                        referee_address_2={this.state.referee_address_2}
                        referee_phone_1={this.state.referee_phone_1}
                        referee_phone_2={this.state.referee_phone_2}
                        age={this.state.age}
                        marital_status={this.state.marital_status}
                        gender={this.state.gender}
                        bank_name={this.state.bank_name}
                        account_name={this.state.account_name}
                        account_number={this.state.account_number}/>

                    <button className="laser-inline green-bg bt-btn" style={btn_style_left} onClick={this.createAgent}>save</button>
                    <button className="laser-inline grey-bg bt-btn" style={btn_style_right} onClick={this.props.handleCloseModal}>cancel</button>
                </ReactModal>
            </div>
        )
    }
}