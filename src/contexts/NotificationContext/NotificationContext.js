import React from "react";
import DriverTripServices from "../../services/DriverTripServices/DriverTripServices";
import DriverTokenService from "../../services/DriverTokenService/DriverTokenService";

const NotificationContext = React.createContext({
    newTrip: {},
    foundTrip: false,
    updateTripContext: ()=>{},
    removeTripNotification: ()=>{}
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
        if(DriverTokenService.hasToken()){
            this.loadUnacceptedTrip();
            setInterval(this.findTrip, 5500);
        };
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
        console.log(this.props)

        if(Object.is({}, this.props.tripContext.trip)){
            return;
        };

        if(this.state.searchingTrips){
            return;
        };

        if(this.state.foundTrip){
            return;
        };

        if(this.props.tripContext.trip.driver_viewing){
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
            })
            .catch( err => {
                console.log(err)
                this.setState({
                    error: err.error,
                    searchingTrips: false,
                    foundTrip: false
                });
            });
    }

    setNewTrip = (trip)=>{
        this.setState({
            newTrip: trip,
            searchingTrips: false,
            foundTrip: true,
            error: ""
        });
    }

    updateNewTrip = (trip)=>{
        this.setNewTrip(trip);
    }

    removeTripNotification = ()=>{
        this.setState({
            newTrip: {},
            foundTrip: false,
            error: ""
        });
    }

    setTripContext = (trip)=>{
        this.props.tripContext.setTrip(trip);
    }

    updateTripContext = (trip)=>{
        this.props.tripContext.setTrip(trip);
        this.setState({
            foundTrip: false
        })
    }

    removeTripContext = ()=>{
        this.props.tripContext.removeTrip();
    }

    render(){
        const value = {
            driver: this.props.driverContext.driver,
            foundTrip: this.state.foundTrip,
            newTrip: this.state.newTrip,
            updateTripContext: this.updateTripContext,
            removeTripNotification: this.removeTripNotification
        };
        console.log(this.props)
        return (
            <NotificationContext.Provider value={value}>
                {this.props.children}
            </NotificationContext.Provider>
        );
    };
};