import React from "react";
import DriverTripServices from "../../../services/DriverTripServices/DriverTripServices";

const TripFinderContext = React.createContext({

});

export default TripFinderContext;

export class TripFinderProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            driverContext: this.props.driverContext,
            searchingTrips: false
        }
    }

    componentDidMount(){
        console.log("Mounted");
        setInterval(this.findTrip, 5000);
    }

    findTrip = ()=>{
        const driver = this.props.driver;
        const position = {
            last_known_lat: driver.last_known_lat,
            last_known_lng: driver.last_known_lng
        };

        if(this.state.searchingTrips){
            return;
        };

        this.setState({
            searchingTrips: true
        });

        console.log(position);

        DriverTripServices.findCloseTripByPositon(position)
            .then( resData => {
                this.setState({
                    searchingTrips: false
                });
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    searchingTrips: false
                });
            });
    }
    
    render(){
        const value ={

        };
        console.log(this.props);
        return (
            <TripFinderContext.Provider value={value}>
                {this.props.children}
            </TripFinderContext.Provider>
        )
    }
}