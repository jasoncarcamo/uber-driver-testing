import React from "react";
import "./DriverActiveMenu.css";
import DriverActiveOptions from "./DriverActiveOptions/DriverActiveOptions";
import DriverPausedOptions from './DriverPausedOptions/DriverPausedOptions';

export default class DriverActiveMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            paused: false,
            loading: false
        }
    }

    toggleDriverActiveMenu = ()=>{
        const driverActivemenu = document.getElementById("driver-active-menu-container");

        driverActivemenu.classList.toggle("open-driver-active-menu");
    }

    toggleLoading = ()=>{
        this.setState({
            laoding: !this.state.loading
        });
    }

    togglePaused = ()=>{
        this.setState({
            paused: !this.state.paused
        });
    }

    render(){
        
        return (
            <section id="driver-active-menu-container">
                {!this.state.paused ? <DriverActiveOptions history={this.props.history} toggleLoading={this.toggleLoading} togglePaused={this.togglePaused} toggleDriverActiveMenu={this.toggleDriverActiveMenu}/> : ""}
                {this.state.paused ? <DriverPausedOptions toggleLoading={this.toggleLoading} togglePaused={this.togglePaused} toggleDriverActiveMenu={this.toggleDriverActiveMenu}/> : ""}
            </section>
        );
    };
};