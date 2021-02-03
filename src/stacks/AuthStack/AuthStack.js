import React from "react";
import {Route} from "react-router-dom";
import LandingPageScreen from "../../screens/LandingPageScreen/LandingPageScreen";
import LogInScreen from "../../screens/LogInScreen/LogInScreen";
import SignUpScreen from "../../screens/SignUpScreen/SignUpScreen";

export default class AuthStack extends React.Component{
    render(){
        return (
            <>
                <Route exact path="/" component={LandingPageScreen}></Route>
                <Route exact path="/login" component={LogInScreen}></Route>
                <Route exact path="/signup" component={SignUpScreen}></Route>
            </>
        );
    };
};