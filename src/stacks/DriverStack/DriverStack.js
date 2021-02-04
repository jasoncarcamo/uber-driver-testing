import React from "react";
import {Route} from "react-router-dom";
import NavHeader from "../../screens/DriverScreens/NavHeader/NavHeader";
import NavMenu from "../../screens/DriverScreens/NavMenu/NavMenu";
import HomeScreen from "../../screens/DriverScreens/HomeScreen/HomeScreen"
import AccountScreen from "../../screens/DriverScreens/AccountScreen/AccountScreen";

export default class DriverStack extends React.Component{
    render(){
        return (
            <>
                <Route path="/driver" component={NavHeader}></Route>
                <Route path="/driver" component={NavMenu}></Route>

                <Route exact path="/driver" component={HomeScreen}></Route>
                <Route exact path="/driver/account" component={AccountScreen}></Route>
            </>
        );
    };
};