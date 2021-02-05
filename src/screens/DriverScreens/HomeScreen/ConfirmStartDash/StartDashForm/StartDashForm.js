import React from "react";
import "./StartDashForm.css";
import DriverTokenService from "../../../../../services/DriverTokenService/DriverTokenService";
import AppContext from "../../../../../contexts/AppContext/AppContext";

export default class StartDashForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gas_filled: false,
            phone_charged: false,
            blanket_space: false,
            error: ""
        }
    }

    static contextType = AppContext;

    handleInput = (e)=>{
        this.setState({
            [e.target.name]: !this.state[e.target.name],
            error: ""
        });
    }

    updateContextDriver = (driver)=>{
        this.context.driverContext.updateDriver(driver);
    }

    handleStartDash = (e)=>{
        e.preventDefault();

        const {
            gas_filled,
            phone_charged,
            blanket_space
        } = this.state;

        const confirmDashRequirements = {
            gas_filled,
            phone_charged,
            blanket_space
        };
        const newDriverActive = {
            active: true,
            active_start_time: new Date()
        };

        for( const [key, value] of Object.entries(confirmDashRequirements)){
            if(!value){
                this.setState({
                    error: "All check boxes need to be checked"
                });

                return;
            };
        };

        fetch("http://localhost:7000/api/driver/active", {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(newDriverActive)
        })  
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);
                this.updateContextDriver(resData.updatedDriver);
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        
        return (
            <form id="start-dash-form" onSubmit={this.handleStartDash}>
                <fieldset id="start-dash-fieldset">
                    <legend></legend>

                    <label htmlFor="start-dash-gas" className="start-dash-label">
                        <input id="start-dash-gas" type="checkbox" name="gas_filled" checked={this.state.gas_filled} onChange={this.handleInput}/>
                        Enough Gas
                    </label>

                    <label htmlFor="start-dash-phone" className="start-dash-label">
                        <input id="start-dash-phone" type="checkbox" name="phone_charged" checked={this.state.phone_charged} onChange={this.handleInput}/>
                        Phone Charged
                    </label>

                    <label htmlFor="start-dash-blanket" className="start-dash-label">
                        <input id="start-dash-blanket" type="checkbox" name="blanket_space" checked={this.state.blanket_space} onChange={this.handleInput}/>
                        Space Blanket
                    </label>

                    <p>{this.state.error ? this.state.error : ""}</p>

                    <button id="start-dash-button">Start Dash</button>
                </fieldset>
            </form>
        );
    };
};