import React from "react";
import "./DriverActiveMenu.css";
import DriverActiveOptions from "./DriverActiveOptions/DriverActiveOptions";

export default class DriverActiveMenu extends React.Component{
    render(){
        return (
            <section id="driver-active-menu-container">
                <DriverActiveOptions history={this.props.history}/>
            </section>
        );
    };
};