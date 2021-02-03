import React from "react";
import "./NavMenu.css";
import MenuBurger from "./MenuBurger/MenuBurger";
import DriverTokenService from "../../../services/DriverTokenService/DriverTokenService";
import AppContext from "../../../contexts/AppContext/AppContext";

export default class NavMenu extends React.Component{

    static contextType = AppContext;

    componentDidMount(){
        if(!DriverTokenService.hasToken()){
            this.props.history.push("/login");
        };
    }

    removeDriverFromContext = ()=>{
        this.context.driverContext.removeDriver();
    }

    handleSignOut = ()=>{
        DriverTokenService.deleteToken();
        this.removeDriverFromContext();
        this.props.history.push("/");
    }

    render(){
        return (
            <nav id="nav-container">
                <MenuBurger/>
                <ul id="nav-list-container">
                    <li className="nav-list-item">Dash</li>
                    <li className="nav-list-item">Account</li>
                    <li className="nav-list-item">
                        <button onClick={this.handleSignOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        );
    };
};