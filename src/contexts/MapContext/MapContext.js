import React from "react";

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

    watchLocation = ()=>{
        if(navigator.geolocation){
            navigator.geolocation.watchPosition(this.setLocation, this.postionError, this.options);
        };
    }

    setLocation = (position)=>{
        const driverLocation = {
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude)
        };

        this.setState({
            driverLocation
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