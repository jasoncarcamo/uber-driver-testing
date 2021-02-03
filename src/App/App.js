import React from "react"
import './App.css';
import AuthStack from "../stacks/AuthStack/AuthStack";
import DriverStack from "../stacks/DriverStack/DriverStack";

export default class App extends React.Component{
    render(){
        return (
            <main>  
                <AuthStack/>
                <DriverStack/>
            </main>
        );
    };
};
