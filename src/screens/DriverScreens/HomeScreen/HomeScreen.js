import React from "react";
import Map from "../Map/Map";
import StartDashingButton from "./StartDashingButton/StartDashingButton";
import ConfirmStartDash from "./ConfirmStartDash/ConfirmStartDash";

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmStartDash: false
        }
    }

    toggleConfirmDash = ()=>{
        this.setState({
            confirmStartDash: !this.state.confirmStartDash
        });
    }
    
    render(){
        return (
            <section>
                <Map className="home-screen-map" mapContainerStyle={mapContainerStyle}/>
                {this.state.confirmStartDash ? <ConfirmStartDash toggleConfirmDash={this.toggleConfirmDash}/> : ""}
                <StartDashingButton toggleConfirmDash={this.toggleConfirmDash}/>
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