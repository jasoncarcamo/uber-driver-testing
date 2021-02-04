import React from 'react';
import AppContext, {AppProvider} from "../AppContext/AppContext";
import DriverContext, {DriverProvider} from "../DriverContext/DriverContext";
import TripContext, {TripProvider} from "../TripContext/TripContext";
import MapContext, {MapProvider} from "../MapContext/MapContext";

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
                                        <MapProvider>
                                            <MapContext.Consumer>
                                                { mapContext => (
                                                    <AppProvider 
                                                    driverContext={driverContext}
                                                    tripContext={tripContext}
                                                    mapContext={mapContext}>
                                                        {this.props.children}
                                                    </AppProvider>
                                                )}
                                            </MapContext.Consumer>
                                        </MapProvider>
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