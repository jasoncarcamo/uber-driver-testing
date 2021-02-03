import React from "react";
import DriverTokenService from "../../../services/DriverTokenService/DriverTokenService";

export default class SignUpForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            mobile_number: "",
            confirm_password: "",
            loading: false,
            error: ""
        }
    }

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

    handleSignUp = (e)=>{
        e.preventDefault();

        const newDriver = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            mobile_number: this.state.mobile_number,
            date_created: new Date()
        };

        fetch("http://localhost:7000/api/register-driver", {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(newDriver)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( resData => {
                console.log(resData);
                DriverTokenService.saveToken(resData.token);
                this.props.history.push("/driver");
            })
            .catch( err => {
                console.log(err);

                this.setState({
                    error: err.error
                });
            });
    }

    render(){
        return (
            <form id="sign-up-form" onSubmit={this.handleSignUp}>
                <fieldset id="sign-up-fieldset">
                    <legend id="sign-up-legend">Sign up and start earning money on your time!</legend>

                    <label htmlFor="sign-up-first-name" className="sign-up-label">
                        First name:
                        <input id="sign-up-first-name" type="text" name="first_name" value={this.state.first_name} onChange={this.handleInput}/>
                    </label>

                    <label htmlFor="sign-up-last-name" className="sign-up-label">
                        Last name:
                        <input id="sign-up-last-name" type="text" name="last_name" value={this.state.last_name} onChange={this.handleInput}/>
                    </label>

                    <label  htmlFor="sign-up-email" className="sign-up-label">
                        Email:
                        <input id="sign-up-email" type="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                    </label>

                    <label  htmlFor="sign-up-mobile-number" className="sign-up-label">
                        Mobile number: 
                        <input id="sign-up-mobile-number" type="text" name="mobile_number" value={this.state.mobile_number} onChange={this.handleInput}/>
                    </label>

                    <label  htmlFor="sign-up-password" className="sign-up-label">
                        Password
                        <input id="sign-up-password" type="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    </label>

                    <label  htmlFor="sign-up-confirm-password" className="sign-up-label">
                        Retype password:
                        <input id="sign-up-confirm-password" type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleInput}/>
                    </label>

                    <p>{this.state.error ? this.state.error : ""}</p>

                    <button type="submit">Sign up</button>
                </fieldset>
            </form>
        );
    };
};