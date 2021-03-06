import React from "react";
import DriverTokenService from "../../services/DriverTokenService/DriverTokenService";

const TripContext = React.createContext({
    trip: {},
    getTrip: ()=>{},
    setTrip: ()=>{},
    editTrip: ()=>{},
    updateTrip: ()=>{},
    removeTrip: ()=>{}
});

export default TripContext;

export class TripProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            trip: {},
            loading: false
        }
    }

    componentDidMount(){
        this.getTrip();
    }

    getTrip = ()=>{
        if(!DriverTokenService.hasToken()){
            console.log("Does not have token")
            return;
        };

        this.setState({
            loading: true
        });

        fetch(`http://localhost:7000/api/driver/current-trips`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.hasToken()}`
            }
        })
            .then( res => {
                console.log(res)
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData)
                this.setTrip(resData.trip);

                this.setState({
                    loading: false
                });
            })
            .catch( err => {
                console.log(err)
                this.setState({
                    error: err.error,
                    loading: false
                });
            });
    }

    setTrip = (newTrip)=>{
        const trip = newTrip

        this.setState({
            trip
        });
    }

    updateTrip = (trip)=>{
        this.setTrip(trip);
    }

    removeTrip = ()=>{
        const removeTrip = {};

        this.setState({
            trip: removeTrip
        });
    }

    render(){
        const value = {
            trip: this.state.trip,
            getTrip: this.getTrip,
            setTrip: this.setTrip,
            updateTrip: this.updateTrip,
            removeTrip: this.removeTrip
        };

        return (
            <TripContext.Provider value={value}>
                {this.props.children}
            </TripContext.Provider>
        )
    }
}