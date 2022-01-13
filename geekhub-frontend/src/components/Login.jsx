import react from 'react';
import React, { Component } from 'react';
import { routes } from './endpoints'
import { Navigate } from 'react-router-dom';

class Login extends React.Component {

    state = {
        dataIsLoaded: true,
        username: null,
        password: null,
        submitStatus: "",
        token: null,
        redirect:false
    }

    change = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    login = () => {
        var formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);

        const requestOptions = {
            method: "POST",
            body: formdata
        }
        fetch(routes['auth'] + 'login', requestOptions)
            .then(response => response.text)
            .then(data => {
                this.setState({ "token": "XXX", "submitStatus": "Logged in successful", "redirect":true})
                console.log(this.state)
                localStorage.setItem("token", this.state.token)
                localStorage.setItem("username", "Hello, " +this.state.username)
            });


    }

    signup = () => {
        var formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({"username": this.state.username, "password": this.state.password}),
            headers: {"Content-Type": "application/json"}
        }
        fetch(routes['auth'] + 'register', requestOptions)
            .then(response => response.text())
            .then(data => {
                this.setState({ "token": "XXX", "submitStatus": "Sign up in successful", "redirect":true })
                console.log(this.state)

            }).then(data => {
                localStorage.setItem("token", this.state.authToken)
                localStorage.setItem("username", "Hello, " +this.state.username)
            });
    }

    render() {
        if (!this.state.dataIsLoaded)
            return <div>LOADING</div>;

        return (
            <div>
                <h1>Login</h1>
                <br />
                <br />
                <form >
                    <label>
                        Username:
                        <br />
                        <input type="text" name="username" placeholder="..." value={this.state.title} onChange={this.change} />
                    </label>
                    <br />
                    <br />
                    <label>
                        Password:
                        <br />
                        <input type="password" name="password" placeholder="..." value={this.state.title} onChange={this.change} />
                    </label>
                </form>

                <button onClick={() => this.signup()}>Signup</button>
                <button onClick={() => this.login()}>Login</button>
                <br />
                <div style={{color:'green'}}>
                    {this.state.loginStatus}
                </div>

                {this.state.redirect ? (<Navigate to="/contentList" />) : null}
            </div>
        );
    }
}

export default Login;