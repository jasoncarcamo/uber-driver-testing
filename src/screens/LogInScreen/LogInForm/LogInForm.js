import React from "react";
import DriverTokenService from "../../../services/DriverTokenService/DriverTokenService";
import AppContext from "../../../contexts/AppContext/AppContext";

export default class LogInForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    static contextType = AppContext;

    componentDidMount(){
        if(DriverTokenService.hasToken()){
            this.props.history.push("/driver");
        };
    }

    handleInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getTripContext = ()=>{
        this.context.tripContext.getTrip();
    }

    setContextDriver = (driver)=>{
        this.context.driverContext.setDriver(driver);
    }

    handleLogIn = (e)=>{
        e.preventDefault();

        const driver = {
            email: this.state.email,
            password: this.state.password
        };

        fetch("http://localhost:7000/api/login-driver", {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(driver)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                DriverTokenService.saveToken(resData.token);

                this.setContextDriver(resData.driver);
                this.getTripContext();

                this.props.history.push("/driver");
            })
            .catch( err => {
                this.setState({
                    error: err.error
                });
            });
    }
    render(){
        return (
            <form onSubmit={this.handleLogIn}>
                <fieldset>
                    <legend>Log in to your account!</legend>

                    <label htmlFor="log-in-email" className="log-in-label">
                        <input id="log-in-email" type="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                    </label>

                    <label htmlFor="log-in-password" className="log-in-label">
                        <input id="log-in-password" type="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    </label>

                    <button type="submit">Log In</button>
                </fieldset>
            </form>
        )
    }
}