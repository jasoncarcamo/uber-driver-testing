import React from "react";
import "./DriverPausedOptions.css";
import AppContext from "../../../../../contexts/AppContext/AppContext";
import DriverTokenService from "../../../../../services/DriverTokenService/DriverTokenService";

export default class DriverPausedOptions extends React.Component{

    static contextType = AppContext;

    toggleDriverActiveMenu = ()=>{
        this.props.toggleDriverActiveMenu();
    }

    toggleLoading = ()=>{
        this.props.toggleLoading();
    }

    togglePaused = ()=>{
        console.log("Toggling")
        this.props.togglePaused();
    }

    updateContextDriver = (driver)=>{
        this.context.driverContext.updateDriver(driver);
    }

    handleUnpauseDash = (e)=>{
        e.preventDefault();

        const unpauseDriver = {
            active: true,
            paused: false
        };

        this.toggleLoading();

        fetch("http://localhost:7000/api/driver/active", {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(unpauseDriver)
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

                this.togglePaused();
                this.toggleDriverActiveMenu();
            })
            .catch( err => {

                this.toggleLoading();

                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        return (
            <ul id="driver-paused-options-container">
                <li className="driver-paused-option" onClick={this.handleUnpauseDash}>Unpause</li>
            </ul>
        );
    };
};