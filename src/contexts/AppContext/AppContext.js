import React from "react";
import App from "../../App/App";

const AppContext = React.createContext({
    driverContext: {},
    tripContext: {},
    mapContext: {},
    notificationContext: {}
});

export default AppContext;

export class AppProvider extends React.Component{
    render(){
        const value = {
            driverContext: this.props.driverContext,
            tripContext: this.props.tripContext,
            mapContext: this.props.mapContext,
            notificationContext: this.props.notificationContext
        };
        console.log(value);
        return (
            <AppContext.Provider value={value}>
                {this.props.children}
            </AppContext.Provider>
        );
    };
};