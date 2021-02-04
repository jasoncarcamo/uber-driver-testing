import React from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";

export default class Map extends React.Component{
    render(){
        const position = {
            lat: -3.745,
            lng: -38.523
        };

        return (
            <GoogleMap
                center={position}
                zoom={10}
                mapContainerClassName={this.props.className}
                mapContainerStyle={this.props.mapContainerStyle}
                options={{
                    fullscreenControl: false,
                    mapTypeControl: false
                }}>
                    <Marker position={position}/>
            </GoogleMap>
        );
    };
};