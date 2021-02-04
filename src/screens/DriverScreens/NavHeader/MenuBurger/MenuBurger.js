import React from "react";
import "./MenuBurger.css";

export default class MenuBurger extends React.Component{

    componentDidMount(){
        const navContainer = document.getElementById("nav-container");

        navContainer.addEventListener("click", (e)=>{
            console.log(e.currentTarget);
            navContainer.classList.toggle("open-nav-container");
        });
    }

    toggleNavMenu = (e)=>{
        const navContainer = document.getElementById("nav-container");

        navContainer.classList.toggle("open-nav-container");
    };

    render(){
        return (
            <button id="menu-burger-container" onClick={this.toggleNavMenu}>
                <div className="menu-burger-line"></div>
                <div className="menu-burger-line"></div>
                <div className="menu-burger-line"></div>
            </button>
        )
    }
}