import React from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import AppContext from "../../../contexts/AppContext/AppContext";
import DriverLocationMarker from "./DriverLocationMarker/DriverLocationMarker";

export default class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultPosition: {
                lat: 40.277313,
                lng:  -99.167157
            }
        }
    }

    static contextType = AppContext;

    defaultMapContainerStyle = {
        flex: 1,
        display: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1
    }

    getPosition = (context)=>{
        let driverLocation = {
            lat: context.mapContext.driverLocation.last_known_lat,
            lng: context.mapContext.driverLocation.last_known_lng
        };;
        let defaultPosition = this.state.defaultPosition;

        for(const [key, value] of Object.entries(defaultPosition)){
            if(!driverLocation[key]){
                return defaultPosition;
            };
        };

        return driverLocation;
    }

    getZoom = (context)=>{
        const position = this.getPosition(context);
        const defaultPosition = this.state.defaultPosition;
        let zoom;
        let same = false;

        for( const key of Object.keys(defaultPosition)){
            if(!position[key]){
                zoom = 17;
            };

            if(position[key] === defaultPosition[key]){
                same = true;
            };
        };

        if(same){
            zoom = 3;
        } else{
            zoom = 17;
        };

        return zoom;
    }

    render(){

        return (
            <GoogleMap
                center={this.getPosition(this.context)}
                zoom={this.getZoom(this.context)}
                mapContainerClassName={this.props.className}
                mapContainerStyle={this.props.mapContainerStyle || this.defaultMapContainerStyle}
                options={{
                    fullscreenControl: false,
                    mapTypeControl: false
                }}>
                    <DriverLocationMarker/>
            </GoogleMap>
        );
    };
};