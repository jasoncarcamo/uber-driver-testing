import React from "react";
import "./DriverActiveScreen.css";
import Map from "../Map/Map";
import SearchingPassenger from "./SearchingPassenger/SearchingPassenger";
import AppContext from "../../../contexts/AppContext/AppContext";

export default class DriverActiveScreen extends React.Component{

    static contextType = AppContext;

    renderSearchingPassengers = (context)=>{
        const driver = context.driverContext.driver;

        if(!driver.paused && !driver.on_trip){
            return <SearchingPassenger/>
        } else{
            return "";
        }
    }

    render(){
        return (
            <section id="driver-active-screen">
                <Map/>

                {this.renderSearchingPassengers(this.context)}
            </section>
        );
    };
};