import React from "react";
import {geocodeByAddress} from "react-places-autocomplete";

const MapContext = React.createContext({
    driverLocation: {},
    setLocation: ()=>{}
});

export default MapContext;

export class MapProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            driverLocation: {},
            gettingDriverLocation: false
        };
    }

    componentDidMount(){
        this.getLocation();
    }

    options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maxiumAge: 0
    };

    getLocation = ()=>{
        if(navigator.geolocation){
            navigator.geolocation.watchPosition(this.setLocation, this.postionError, this.options);
        };
    }

    updateDriverLocation = (driver)=>{
        this.props.driverContext.updateDriver(driver);
    }

    setLocation = (position)=>{
        const driverLocation = {
            last_known_lat: Number(position.coords.latitude),
            last_known_lng: Number(position.coords.longitude)
        };

        console.log(driverLocation)

        if(this.state.gettingDriverLocation){
            return;
        };

        this.setState({
            gettingDriverLocation: true
        });

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${driverLocation.last_known_lat},${driverLocation.last_known_lng}&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {

                this.setState({
                    driverLocation
                });

                geocodeByAddress(resData.results[0].formatted_address)
                    .then( result => {
                        const driver = Object.assign(this.props.driverContext.driver, driverLocation);

                        driver.last_zip_code = result[0].address_components[7].long_name;

                        this.updateDriverLocation(driver);

                        this.setState({
                            gettingDriverLocation: false
                        });
                    })
                    .catch( geoErr => {
                        this.setState({
                            error: geoErr,
                            gettingDriverLocation: false
                        });
                    });
            })
            .catch( err => {
                this.setState({
                    error: err.error,
                    gettingDriverLocation: false
                });
            });
    }

    render(){
        const value = {
            driverLocation: this.state.driverLocation,
            setLocation: this.setLocation
        };

        return (
            <MapContext.Provider value={value}>
                {this.props.children}
            </MapContext.Provider>
        );
    };
};