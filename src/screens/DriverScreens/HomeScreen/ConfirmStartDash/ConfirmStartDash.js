import React from "react";
import "./ConfirmStartDash.css";
import StartDashForm from "./StartDashForm/StartDashForm";

export default class ConfirmStartDash extends React.Component{

    cancelConfirmDash = ()=>{
        this.props.toggleConfirmDash();
    }

    render(){
        return (
            <section id="confirm-start-dash-section">
                <StartDashForm cancelConfirmDash={this.cancelConfirmDash} history={this.props.history}/>
            </section>
        );
    };
};