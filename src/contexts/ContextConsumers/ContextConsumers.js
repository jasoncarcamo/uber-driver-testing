import React from 'react';
import AppContext, {AppProvider} from "../AppContext/AppContext";
import DriverContext, {DriverProvider} from "../DriverContext/DriverContext";
import TripContext, {TripProvider} from "../TripContext/TripContext";
import MapContext, {MapProvider} from "../MapContext/MapContext";
import NotificationContext, {NotificationProvider} from "../NotificationContext/NotificationContext";

export default class ContextConsumers extends React.Component{
    render(){
        return (
            <DriverProvider>
                <DriverContext.Consumer>
                    { driverContext => (
                        <TripProvider
                            driverContext={driverContext}
                        >
                            <TripContext.Consumer>
                                {
                                    tripContext => (
                                        <NotificationProvider
                                            driverContext={driverContext}
                                            tripContext={tripContext}
                                        >
                                            <NotificationContext.Consumer>
                                                { notificationContext => (
                                                    <MapProvider
                                                        driverContext={driverContext}
                                                    >
                                                        <MapContext.Consumer>
                                                            { mapContext => (
                                                                <AppProvider 
                                                                    driverContext={driverContext}
                                                                    tripContext={tripContext}
                                                                    notificationContext={notificationContext}
                                                                    mapContext={mapContext}
                                                                >
                                                                    {this.props.children}
                                                                </AppProvider>
                                                            )}
                                                        </MapContext.Consumer>
                                                    </MapProvider>
                                                )}
                                            </NotificationContext.Consumer>
                                        </NotificationProvider>
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