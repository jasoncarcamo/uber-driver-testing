import React from "react";
import "./DriverActiveOptions.css";
import DriverTokenService from "../.././../../../services/DriverTokenService/DriverTokenService"
import AppContext from "../.././../../../contexts/AppContext/AppContext";

export default class DriverActiveOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }

    static contextType = AppContext;

    toggleDriverActiveMenu = ()=>{
        this.props.toggleDriverActiveMenu();
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

        this.setState({
            loading: true
        });

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

                this.setState({
                    loading: false
                });

                this.props.history.push("/driver");
            })
            .catch( err => {
                
                this.setState({
                    error: err.error,
                    loading: false
                });
            });
    }

    toggleLoading = ()=>{
        this.props.toggleLoading();
    }

    togglePaused = ()=>{
        this.props.togglePaused();
    }

    handlePauseDash = (e)=>{
        e.preventDefault();

        const pauseDriver = {
            active: true,
            paused: true
        };

        this.toggleLoading();

        fetch("http://localhost:7000/api/driver/active", {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            },
            body: JSON.stringify(pauseDriver)
        })  
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.updateContextDriver(resData.updatedDriver);

                this.togglePaused();
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
            <ul id="driver-active-options-container">
                <li className="driver-active-option" onClick={this.handlePauseDash}>Pause Dash</li>
                <li className="driver-active-option" onClick={this.handleEndDash}>End Dash</li>
            </ul>
        );
    };
};