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

    getPosition = (context)=>{
        let driverLocation = context.mapContext.driverLocation;
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
        const position = {
            lat: 41.850033,
            lng: -87.6500523
        };

        return (
            <GoogleMap
                center={this.getPosition(this.context)}
                zoom={this.getZoom(this.context)}
                mapContainerClassName={this.props.className}
                mapContainerStyle={this.props.mapContainerStyle}
                options={{
                    fullscreenControl: false,
                    mapTypeControl: false
                }}>
                    <DriverLocationMarker/>
            </GoogleMap>
        );
    };
};