import React from "react";
import Map from "../Map/Map";
import StartDashingButton from "./StartDashingButton/StartDashingButton";
import ConfirmStartDash from "./ConfirmStartDash/ConfirmStartDash";
import AppContext from "../../../contexts/AppContext/AppContext";

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            confirmStartDash: false
        }
    }

    static contextType = AppContext;

    toggleConfirmDash = ()=>{
        this.setState({
            confirmStartDash: !this.state.confirmStartDash
        });
    }

    renderStartDashingButton = (context)=>{
        return !context.driverContext.driver.active ? <StartDashingButton toggleConfirmDash={this.toggleConfirmDash}/> : ""
    }
    
    render(){
        return (
            <section>
                <Map className="home-screen-map" mapContainerStyle={mapContainerStyle}/>

                {this.state.confirmStartDash ? <ConfirmStartDash toggleConfirmDash={this.toggleConfirmDash} history={this.props.history}/> : ""}

                {this.renderStartDashingButton(this.context)}
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