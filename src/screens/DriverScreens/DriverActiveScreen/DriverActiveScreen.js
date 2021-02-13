import React from "react";
import "./DriverActiveScreen.css";
import Map from "../Map/Map";
import SearchingPassenger from "./SearchingPassenger/SearchingPassenger";
import AppContext from "../../../contexts/AppContext/AppContext";
import TripNotification from "./TripNotification/TripNotification";

export default class DriverActiveScreen extends React.Component{

    static contextType = AppContext;

    renderSearchingPassengers = (context)=>{
        const driver = context.driverContext.driver;
        const foundTrip = context.notificationContext.foundTrip;

        if(!driver.paused && !driver.on_trip && !foundTrip){
            return <SearchingPassenger/>
        } else{
            return "";
        }
    }

    renderTripNotification = (context)=>{
        const foundTrip = context.notificationContext.foundTrip;
        const newTrip = context.notificationContext.newTrip;
        console.log(newTrip, foundTrip)

        if(newTrip === {}){
            console.log("Empty")
        }
        if(foundTrip && !Object.is({}, newTrip)){
            return <TripNotification newTrip={newTrip} history={this.props.history}/>
        } else{
            return "";
        }
    }

    render(){
        return (
            <section id="driver-active-screen">
                <Map/>
                {this.renderSearchingPassengers(this.context)}
                {this.renderTripNotification(this.context)}
            </section>
        );
    };
};