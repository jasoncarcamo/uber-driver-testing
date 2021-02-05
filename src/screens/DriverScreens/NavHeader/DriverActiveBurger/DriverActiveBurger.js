import React from 'react';
import "./DriverActiveBurger.css";

export default class DriverActiveBurger extends React.Component{

    componentDidMount(){

    }

    toggleDriverActiveMenu = ()=>{
        const driverActivemenu = document.getElementById("driver-active-menu-container");

        driverActivemenu.classList.toggle("open-driver-active-menu");
    }


    render(){
        return (
            <button id="driver-active-burger-container" onClick={this.toggleDriverActiveMenu}>
                <div className="driver-active-burger-line-1"></div>
                <div className="driver-active-burger-line-2"></div>
                <div className="driver-active-burger-line-3"></div>
            </button>
        );
    };
};