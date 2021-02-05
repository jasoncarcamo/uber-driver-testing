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

    cancelConfirmDash = ()=>{
        this.props.cancelConfirmDash();
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
        const driverActive = {
            active: true,
            paused: false
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
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(driverActive)
        })  
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.updateContextDriver(resData.updatedDriver);

                this.cancelConfirmDash();

                this.props.history.push("/driver/active");
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

                    <button className="start-dash-button" typ="submit">Start Dash</button>
                    <button className="start-dash-button" type="button" onClick={this.cancelConfirmDash}>Cancel</button>
                </fieldset>
            </form>
        );
    };
};