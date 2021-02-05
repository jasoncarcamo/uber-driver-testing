import React from "react";
import DriverTokenService from "../../services/DriverTokenService/DriverTokenService";

const DriverContext = React.createContext({
    driver: {},
    getDriver: ()=>{},
    setDriver: ()=>{},
    updateDriver: ()=>{},
    removeDriver: ()=>{}
});

export default DriverContext;

export class DriverProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            driver: {}
        }
    }

    componentDidMount(){
        this.getDriver();
    }

    getDriver =()=>{
        if(!DriverTokenService.hasToken()){
            return;
        };

        fetch("http://localhost:7000/api/driver-info", {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${DriverTokenService.getToken()}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                this.setDriver(resData.driver);
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            })
    }

    setDriver = (driver)=>{
        this.setState({
            driver,
            error: ""
        });
    }

    updateDriver =(driver)=>{
        this.setDriver(driver);
    }

    removeDriver = ()=>{
        const removeDriver = {};

        this.setDriver(removeDriver);
    }

    render(){
        const value = {
            driver: this.state.driver,
            getDriver: this.getDriver,
            setDriver: this.setDriver,
            updateDriver: this.updateDriver,
            removeDriver: this.removeDriver
        };

        return (
            <DriverContext.Provider value={value}>
                {this.props.children}
            </DriverContext.Provider>
        );
    };
};