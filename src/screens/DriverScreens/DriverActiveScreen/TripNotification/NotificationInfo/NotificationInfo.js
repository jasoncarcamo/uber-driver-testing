import React from "react";
import "./NotificationInfo.css";

export default class NotificationInfo extends React.Component{
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        console.log(this.props.newTrip)
        return (
            <section id="notification-info-container">
                <p>Pick up address: {this.props.newTrip.pick_up_address}</p>
                <p>Drop off address: {this.props.newTrip.drop_off_address}</p>
                <p>Distance: {this.props.newTrip.distance}</p>
                <p>Estmated time: {this.props.newTrip.duration}</p>
                <p>Price: {this.props.newTrip.price}</p>
            </section>
        );
    };
};