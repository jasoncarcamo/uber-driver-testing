import React from "react";
import DriverTokenService from "../../services/DriverTokenService/DriverTokenService";

export default class LandingPageScreen extends React.Component{

    componentDidMount(){
        if(DriverTokenService.hasToken()){
            this.props.history.push("/driver");
        };
    }

    goToLogIn = ()=>{
        this.props.history.push("/login");
    };

    goToSignUp = ()=>{
        this.props.history.push("/signup");
    };

    render(){
        return (
            <section>
                <button onClick={this.goToLogIn}>Log In</button>
                <button onClick={this.goToSignUp}>Sign Up</button>
            </section>
        );
    };
};