import React from "react";
import DriverTokenService from "../../services/DriverTokenService/DriverTokenService";

const TripContext = React.createContext({
    trip: {}
});

export default TripContext;

export class TripProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            trip: {}
        }
    }

    getTrip = ()=>{
        if(!DriverTokenService.hasToken()){
            return;
        };

        fetch(`http://localhost:7000/api/driver/trips`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.hasToken()}`
            }
        })
    }

    setTrip = (trip)=>{
        this.setState({
            trip
        });
    }

    editTrip = (trip)=>{
        this.setTrip(trip);
    }

    removeTrip = ()=>{
        const removeTrip = {};

        this.setTrip(removeTrip);
    }

    render(){
        const value = {

        };

        return (
            <TripContext.Provider value={value}>
                {this.props.children}
            </TripContext.Provider>
        )
    }
}