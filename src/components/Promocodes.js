import React, {Component} from 'react'

import Promocode from '../subcomponents/Promocode';

import { BottomScrollListener } from 'react-bottom-scroll-listener'

import GeneratePromocodes from '../subcomponents/GeneratePromocodes';

import EditPromocode from '../subcomponents/EditPromocode';

import Loader from '../subcomponents/Loader';

import * as API from '../api/Api';

const left = {
    float: "left"
}

const right = {
    float: "right",
    marginTop: "-0.01px"
}

export default class Promocodes extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            total_count:0,
            promocodes: [],
            showGenerateCodes: false,
            showEditPromocode: false,
            code_to_edit: {},
            code_name: "",
            count: 0,
            percentage: 0,
            city: "LAGOS"
        }

        this.getPromocodesEmpty = this.getPromocodesEmpty.bind(this);
        this.onFieldChanged = this.onFieldChanged.bind(this);
        this.editClicked = this.editClicked.bind(this);
        this.deactivateClicked = this.deactivateClicked.bind(this);
        this.getPromocodes = this.getPromocodes.bind(this)
        this.handleOnDocumentBottom = this.handleOnDocumentBottom.bind(this);
        this.generateClicked = this.generateClicked.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.showGenerateCodesView = this.showGenerateCodesView.bind(this);
        this.submitEditedPromocode = this.submitEditedPromocode.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.onCityChanged = this.onCityChanged.bind(this);
    }

    showLoading(){
        this.setState({
            isLoading: true
        })
    }

    hideLoading(){
        this.setState({
            isLoading: false
        })
    }

    showGenerateCodesView(){
        this.setState({
            showGenerateCodes: true
        })
    }

    async generateClicked(e){
        e.preventDefault();
        if(this.state.code_name.length>0 && this.state.count>0 && this.state.percentage>0){
            this.showLoading();
            const response = await API.generatePromocodes(this.state.code_name, this.state.count, this.state.percentage, this.state.city);
            this.hideLoading();
            if(response=="error"){
                //show error message
                return;
            }
    
            if(response && response.data){
                this.setState({
                    promocodes: [],
                    showGenerateCodes: false,
                    showEditPromocode: false,
                    code_to_edit: {},
                    count: 0,
                    code_name: "",
                    percentage: 0
                })
                this.getPromocodesEmpty();
            }
        }
    }

    cancelModal(e){
        e.preventDefault();
        this.setState({
            showGenerateCodes: false,
            showEditPromocode: false,
            code_to_edit: {},
            count: 0,
            code_name: "",
            percentage: null
        })
    }

    handleOnDocumentBottom = () => {
        this.getPromocodes();
    }

    onFieldChanged(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        })

        if(name == "city"){
            this.getPromocodes(value);
        }
    }

    onCityChanged = (selected) => {
        this.setState({
            city: selected
        })
    }

    
    async getPromocodesEmpty(){
        this.showLoading();
        const response = await API.getPromocodes(0, this.state.city);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState(state => {

                if(state.promocodes.length>0){
                    var codes = state.promocodes.concat(response.data);

                    return {
                        promocodes: codes
                    }
                }
                else{
                    return {
                        promocodes: response.data
                    }
                }
            })   
        }


        //promocodes count
        const response5 = await API.getPromocodesCount();

        if(response5=="error"){
            //show error message
            return;
        }

        if(response5 && response5.data){
            this.setState({
                total_count: response5.data.count
            })   
        }
    }

    async getPromocodes(city){
        this.showLoading();
        const response = await API.getPromocodes(this.state.promocodes.length, city ? city : this.state.city);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState(state => {

                if(state.promocodes.length>0){
                    var codes = state.promocodes.concat(response.data);

                    return {
                        promocodes: codes
                    }
                }
                else{
                    return {
                        promocodes: response.data
                    }
                }
            })   
        }

        //promocodes count
        const response5 = await API.getPromocodesCount();

        if(response5=="error"){
            //show error message
            return;
        }

        if(response5 && response5.data){
            this.setState({
                total_count: response5.data.count
            })   
        }

    }

    async editClicked(e, promocode){
        //show edit promocode
        this.setState({
            showEditPromocode:  true,
            code_name: promocode.code,
            code_to_edit: promocode,
            count: promocode.usages,
            percentage: promocode.percentage,
            city: promocode.city
        })
        /*this.showLoading();
        const response = await API.deletePromocode(promocode._id);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState(state => {
                var codes = state.promocodes;

                codes.splice(state.promocodes.indexOf(promocode),1);

                return {
                    promocodes: codes,
                    total_count: (state.total_count - 1)
                }
            })
        }*/
    }

    async submitEditedPromocode(){
        console.log(this.state.city)
        return;

        if(this.state.code_name.length>0 && this.state.count>0 && this.state.percentage>0){
            this.showLoading();
            const response = await API.editPromocode(this.state.code_to_edit._id, this.state.code_name, this.state.count, this.state.percentage, this.state.city);
            this.hideLoading();
            if(response=="error"){
                //show error message
                return;
            }

            if(response && response.data){
                this.setState(state => {
                    var codes = state.promocodes;

                    codes.splice(state.promocodes.indexOf(this.state.code_to_edit),1,response.data);

                    return {
                        promocodes: codes,
                        showGenerateCodes: false,
                        showEditPromocode: false,
                        code_to_edit: {},
                        count: 0,
                        code_name: "",
                        percentage: null
                    }
                })
            }
        }
    }

    async deactivateClicked(e, promocode){
        e.preventDefault();
        this.showLoading();
        const response = await API.deactivatePromocode(promocode._id);
        this.hideLoading();
        if(response=="error"){
            //show error message
            return;
        }

        if(response && response.data){
            this.setState(state => {
                var codes = state.promocodes;

                codes.splice(state.promocodes.indexOf(promocode),1,response.data);

                return {
                    promocodes: codes
                }
            })
        }
        
    }

    componentDidMount(){
        this.getPromocodes();
    }

    render(){
        return(
            <div className="top-div">
                <div className="container">
                    <div className="bt-city-holder">
                        <h5 className="text-left" style={left}>{this.state.total_count} Promocodes</h5>

                        <div className="bt-center" style={{width: "200px"}}>
                            <select className="form-control" id="city" name="city" value={this.state.city} onChange={this.onFieldChanged}>
                                <option value="ALL">All</option>
                                <option value="LAGOS">Lagos</option>
                                <option value="ACCRA">Accra</option>
                            </select>
                        </div>

                        <button onClick={ this.showGenerateCodesView } className="green-bg bt-btn" style={right}> <i className="fas fa-plus white-text"></i>  Create Code</button>
                    </div>
                    <div className="row">
                        {
                            this.state.promocodes.map(promo =>{
                                return <Promocode key={promo._id} promo={promo} editClicked={this.editClicked} deactivateClicked={this.deactivateClicked} />
                            })
                        }
                    </div>
                </div>

                <Loader isLoading={this.state.isLoading}/>

                <BottomScrollListener onBottom={this.handleOnDocumentBottom} />

                {
                    this.state.showEditPromocode ? <EditPromocode city={this.state.city} onFieldChanged={this.onFieldChanged} cancelModal={this.cancelModal} showEditPromocode={this.state.showEditPromocode} submitEditedPromocode={this.submitEditedPromocode} code_name={this.state.code_name} count={this.state.count} percentage={this.state.percentage} /> : ""
                }

                {
                    this.state.showGenerateCodes ? <GeneratePromocodes onCityChanged={this.onCityChanged} city={this.state.city} onFieldChanged={this.onFieldChanged} code_name={this.state.code_name} count={this.state.count} percentage={this.state.percentage} generateClicked={this.generateClicked} cancelModal={this.cancelModal} showGenerateCodes={this.state.showGenerateCodes} /> : ""
                }
            </div>
        )
    }
}