import React from "react";
import Map from "../Map/Map";

export default class HomeScreen extends React.Component{
    render(){
        return (
            <section>
                <Map className="home-screen-map" mapContainerStyle={mapContainerStyle}/>
            </section>
        );
    };
};

const mapContainerStyle= {
    flex: 1,
    display: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 0
}