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
                                        <MapProvider
                                            driverContext={driverContext}
                                        >
                                            <MapContext.Consumer>
                                                { mapContext => (
                                                    <NotificationProvider>
                                                        <NotificationContext.Consumer>
                                                            {notificationContext => (
                                                                <AppProvider 
                                                                    driverContext={driverContext}
                                                                    tripContext={tripContext}
                                                                    notificationContext={notificationContext}
                                                                    mapContext={mapContext}
                                                                >
                                                                    {this.props.children}
                                                                </AppProvider>
                                                            )}
                                                        </NotificationContext.Consumer>
                                                    </NotificationProvider>
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