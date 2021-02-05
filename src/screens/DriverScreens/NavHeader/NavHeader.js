import React from "react";
import "./NavHeader.css";
import MenuBurger from './MenuBurger/MenuBurger';
import DriverActiveBurger from "./DriverActiveBurger/DriverActiveBurger";
import AppContext from "../../../contexts/AppContext/AppContext";

export default class NavHeader extends React.Component{

    static contextType = AppContext;

    renderDriverActiveBurger = (context)=>{
        return context.driverContext.driver.active ? <DriverActiveBurger/> : ""
    }

    render(){
        return (
            <header id="nav-header">
                <MenuBurger/>
                
                {this.renderDriverActiveBurger(this.context)}
            </header>
        );
    };
};