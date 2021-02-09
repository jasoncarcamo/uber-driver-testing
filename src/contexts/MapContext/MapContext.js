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
            driverLocation: {}
        };
    }

    componentDidMount(){
        this.watchLocation();
    }

    options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maxiumAge: 0
    };

    watchLocation = ()=>{
        if(navigator.geolocation){
            navigator.geolocation.watchPosition(this.setLocation, this.postionError, this.options);
        };
    }

    setLocation = (position)=>{
        console.log(position);
        const driverLocation = {
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude)
        };

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${driverLocation.lat},${driverLocation.lng}&key=AIzaSyAAPqYeOSuJKs63H8A4NwaKp8fjVZo_jao`)
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                geocodeByAddress(resData.results[0].formatted_address)
                    .then( result => {

                        driverLocation.zip_code = result[0].address_components[7].long_name;

                        this.setState({
                            driverLocation
                        });
                    })
                    .catch( geoErr => {
                        this.setState({
                            error: geoErr
                        });
                    });
            })
            .catch( err => {
                this.setState({
                    error: err.error
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