import React from "react";
import "./TripNotification.css";
import NotificationInfo from "./NotificationInfo/NotificationInfo";
import NotificationOptions from "./NotificationOptions/NotificationOptions";
import Map from '../../Map/Map';

export default class TripNotification extends React.Component{

    render(){
        console.log(this.props)
        return (
            <section id="trip-notification-container">
                <NotificationInfo newTrip={this.props.newTrip}/>
                <NotificationOptions newTrip={this.props.newTrip} history={this.props.history}/>
            </section>
        );
    };
};