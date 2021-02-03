import React from 'react';
import AppContext, {AppProvider} from "../AppContext/AppContext";
import DriverContext, {DriverProvider} from "../DriverContext/DriverContext";

export default class ContextConsumers extends React.Component{
    render(){
        return (
            <DriverProvider>
                <DriverContext.Consumer>
                    { driverContext => (
                        <AppProvider 
                        driverContext={driverContext}>
                            {this.props.children}
                        </AppProvider>
                    )}
                </DriverContext.Consumer>
            </DriverProvider>
        );
    };
} ;