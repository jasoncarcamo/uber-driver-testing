import React from "react";
import "./MenuBurger.css";

export default class MenuBurger extends React.Component{

    toggleMenuBurger = (e)=>{
        console.log("Clicked")
        const menuBurger =  document.getElementById("menu-burger-container");
        const navContainer = document.getElementById("nav-container");

        navContainer.classList.toggle("open-nav-container");
        menuBurger.classList.toggle("menu-burger-container-toggle");
    };

    render(){
        return (
            <button id="menu-burger-container" onClick={this.toggleMenuBurger}>
                <div className="menu-burger-line"></div>
                <div className="menu-burger-line"></div>
                <div className="menu-burger-line"></div>
            </button>
        )
    }
}