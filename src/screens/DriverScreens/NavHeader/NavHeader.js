import React from "react";
import "./NavHeader.css";
import MenuBurger from './MenuBurger/MenuBurger';

export default class NavHeader extends React.Component{
    render(){
        return (
            <header id="nav-header">
                <MenuBurger/>
            </header>
        );
    };
};