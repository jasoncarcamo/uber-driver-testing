import React from 'react';
import AppContext, {AppProvider} from "../AppContext/AppContext";
import DriverContext, {DriverProvider} from "../DriverContext/DriverContext";
import TripContext, {TripProvider} from "../TripContext/TripContext";

export default class ContextConsumers extends React.Component{
    render(){
        return (
            <DriverProvider>
                <DriverContext.Consumer>
                    { driverContext => (
                        <TripProvider>
                            <TripContext.Consumer>
                                {
                                    tripContext => (
                                        <AppProvider 
                                        driverContext={driverContext}
                                        tripContext={tripContext}>
                                            {this.props.children}
                                        </AppProvider>
                                    )
                                }
                            </TripContext.Consumer>
                        </TripProvider>
                    )}
                </DriverContext.Consumer>
            </DriverProvider>
        );
    };
} ;