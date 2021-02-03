import React from "react";
import LogInForm from "./LogInForm/LogInForm";

export default class LogInScreen extends React.Component{
    render(){
        return (
            <section id="log-in-screen">
                <LogInForm history={this.props.history}/>
            </section>
        );
    };
};