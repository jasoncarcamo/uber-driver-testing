import React from "react";
import "./DriverActiveOptions.css";
import DriverTokenService from "../.././../../../services/DriverTokenService/DriverTokenService"
import AppContext from "../.././../../../contexts/AppContext/AppContext";

export default class DriverActiveOptions extends React.Component{

    static contextType = AppContext;

    toggleDriverActiveMenu = ()=>{
        const driverActivemenu = document.getElementById("driver-active-menu-container");

        driverActivemenu.classList.toggle("open-driver-active-menu");
    }

    updateContextDriver = (driver)=>{
        this.context.driverContext.updateDriver(driver);
    }

    handleEndDash = (e)=>{
        e.preventDefault();

        const endDriverActive = {
            active: false,
            paused: false
        };

        fetch("http://localhost:7000/api/driver/active", {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(endDriverActive)
        })  
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.updateContextDriver(resData.updatedDriver);
                this.toggleDriverActiveMenu();
                this.props.history.push("/driver");
            })
            .catch( err => {
                console.log(err)
                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        return (
            <ul id="driver-action-options-container">
                <li className="driver-active-option">Pause Dash</li>
                <li className="driver-active-option" onClick={this.handleEndDash}>End Dash</li>
            </ul>
        );
    };
};