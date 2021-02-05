import React from "react";
import {Route} from "react-router-dom";
import NavHeader from "../../screens/DriverScreens/NavHeader/NavHeader";
import NavMenu from "../../screens/DriverScreens/NavMenu/NavMenu";
import DriverActiveMenu from "../../screens/DriverScreens/NavHeader/DriverActiveMenu/DriverActiveMenu";
import HomeScreen from "../../screens/DriverScreens/HomeScreen/HomeScreen"
import DriverActiveScreen from "../../screens/DriverScreens/DriverActiveScreen/DriverActiveScreen";
import AccountScreen from "../../screens/DriverScreens/AccountScreen/AccountScreen";

export default class DriverStack extends React.Component{
    render(){
        return (
            <>
                <Route path="/driver" component={NavHeader}></Route>
                <Route path="/driver" component={NavMenu}></Route>
                <Route path="/driver" component={DriverActiveMenu}></Route>

                <Route exact path="/driver" component={HomeScreen}></Route>
                <Route exact path="/driver/active" component={DriverActiveScreen}></Route>
                <Route exact path="/driver/account" component={AccountScreen}></Route>
            </>
        );
    };
};