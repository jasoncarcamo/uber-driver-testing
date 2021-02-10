import React from "react";

const NotificationContext = React.createContext({

});

export default NotificationContext;

export class NotificationProvider extends React.Component{
    render(){
        const value = {

        };
        
        return (
            <NotificationContext.Provider value={value}>
                {this.props.children}
            </NotificationContext.Provider>
        )
    }
}