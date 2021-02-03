import React from "react";
import SignUpForm from "./SignUpForm/SignUpForm";

export default class SignUpScreen extends React.Component{

    render(){
        return (
            <section id="sign-up-screen">
                <SignUpForm history={this.props.history}/>
            </section>
        );   
    };
};