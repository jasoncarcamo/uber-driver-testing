import React from "react";
import "./StartDashingButton.css";

export default class StartDashingButton extends React.Component{

    confirmStartDash = ()=>{
        this.props.toggleConfirmDash();
    }
    render(){
        return <button id="start-dashing-button" onClick={this.confirmStartDash}>Start Dashing</button>
    };
};