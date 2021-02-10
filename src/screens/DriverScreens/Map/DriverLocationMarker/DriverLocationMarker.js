import React from "react";
import {Marker} from "@react-google-maps/api";
import AppContext from "../../../../contexts/AppContext/AppContext"

export default class DriverLocationMarker extends React.Component{

    static contextType = AppContext;

    renderDriverPosition = (context)=>{
        const driverLocation = {
            lat: context.mapContext.driverLocation.last_known_lat,
            lng: context.mapContext.driverLocation.last_known_lng
        };

        if(!driverLocation.lat || !driverLocation.lng){
            return "";
        };

        return <Marker position={driverLocation}/>;
    };

    render(){
        
        return this.renderDriverPosition(this.context);
    };
};