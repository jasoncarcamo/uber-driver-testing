import React from "react";
import "./NotificationOptions.css";
import DriverTripServices from "../../../../../services/DriverTripServices/DriverTripServices";
import AppContext from "../../../../../contexts/AppContext/AppContext";

export default class NotificationOptions extends React.Component{

    static contextType = AppContext;

    updateTripContext = (trip)=>{
        this.context.notificationContext.updateTripContext(trip);
    }

    removeTripNotification = ()=>{
        this.context.notificationContext.removeTripNotification();
    }

    handleAccept = ()=>{
        const id = this.props.newTrip.id;
        const updateTrip = {
            driver_id: this.props.newTrip.driver_id,
            driver_accepted: true,
            driver_viewing: true
        };

        DriverTripServices.acceptNewtrip(id, updateTrip)
            .then( resData => {
                console.log(resData);
                this.updateTripContext(resData.updatedTrip)
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    error: err.error
                });
            });
    }

    handleCancel = ()=>{
        const id = this.props.newTrip.id;
        const updateTrip = {
            driver_id: null,
            driver_accepted: false,
            driver_viewing: false
        };

        DriverTripServices.declineNewTrip(id, updateTrip)
            .then( resData => {
                const trip = {};
                console.log("Declined")
                this.updateTripContext(trip);
                this.removeTripNotification();
            })
            .catch( err => {
                console.log(err);

                this.setState({
                    error: err.error
                });
            });

    }

    render(){
        return (
            <section id="notification-options-container">
                <button type="button" onClick={this.handleAccept}>Accept</button>
                <button type="button" onClick={this.handleCancel}>Decline</button>
            </section>
        );
    };
};