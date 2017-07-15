import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import requester from '../utils/requester';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: null,
            password: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <section>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Login</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            required
                            marginForm
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            marginForm
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Button
                            raised
                            color="contrast"
                            onClick={this.handleSubmit}>
                            Login
                                </Button>
                    </div>
                </div>
            </section>
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    }

    handleSubmit() {
        // TODO: Call userAction instaad
        requester.post('/auth/login', this.state)   
            .then(response => {
                console.log(response);
            });
    }
}

export default Login;
