import React from "react";
import DriverTripServices from "../../services/DriverTripServices/DriverTripServices";
import DriverTokenService from "../../services/DriverTokenService/DriverTokenService";

const NotificationContext = React.createContext({
    foundTrip: false
});

export default NotificationContext;

export class NotificationProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchingTrips: false,
            foundTrip: false,
            newTrip: {}
        }
    }

    componentDidMount(){
        this.loadUnacceptedTrip();
        setInterval(this.findTrip, 5500);
    }

    loadUnacceptedTrip = ()=>{
        const driver = this.props.driverContext.driver;

        this.setState({
            searchingTrips: true
        });

        fetch(`http://localhost:7000/api/trip/unaccepted`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                
                this.setNewTrip(resData.unacceptedTrip);
                this.setState({
                    searchingTrips: false,
                    foundTrip: true
                });
            })
            .catch( err => {
                
                this.setState({
                    error: err.error,
                    searchingTrips: false,
                    foundTrip: false
                })
            })
    }

    findTrip = ()=>{
        const driver = this.props.driverContext.driver;
        const position = {
            last_known_lat: driver.last_known_lat,
            last_known_lng: driver.last_known_lng
        };

        if(this.state.searchingTrips){
            return;
        };

        if(this.state.foundTrip){
            return;
        };

        if(this.props.tripsContext.trip.driver_viewing){
            return;
        };

        for(const key of Object.keys(position)){
            if(!position[key]){
                return;
            };
        };

        this.setState({
            searchingTrips: true,
            foundTrip: false
        });

        DriverTripServices.findCloseTripByPositon(position)
            .then( resData => {
                this.setNewTrip(resData.trip);
                this.setState({
                    searchingTrips: false,
                    foundTrip: true
                });
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    searchingTrips: false,
                    foundTrip: false
                });
            });
    }

    setNewTrip = (trip)=>{
        this.setState({
            newTrip: trip
        });
    }

    updateNewTrip = (trip)=>{
        this.setNewTrip(trip);
    }

    removeNewTrip = ()=>{
        this.setState({
            newTrip: {},
            error: ""
        });
    }

    setTripContext = (trip)=>{
        this.props.tripContext.setTrip(trip);
    }

    updateTripContext = (trip)=>{
        this.props.tripContext.setTripContext(trip);
    }

    removeTripContext = ()=>{
        this.props.tripContext.removeTrip();
    }

    render(){
        const value = {
            driver: this.props.driverContext.driver,
            foundTrip: this.state.foundTrip,
            newTrip: this.state.newTrip
        };
        console.log(value)
        return (
            <NotificationContext.Provider value={value}>
                {this.props.children}
            </NotificationContext.Provider>
        )
    }
}