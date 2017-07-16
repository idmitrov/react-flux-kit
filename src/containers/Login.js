import React, { Component } from 'react';
import update from 'immutability-helper';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import userActions from '../actions/user/userActions';
import userStore from '../stores/userStore';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                email: null,
                password: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                            onBlur={this.handleValidation}
                            data-required
                            data-error-message="Invalid email"
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
                            onBlur={this.handleValidation}
                            data-required
                            data-error-message="Invalid email"
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

    handleValidation(e) {
        // TODO: Find a way to validate all inputs
    }

    handleChange(e) {
        let newState = update(this.state, {
            user: {
                [e.target.name]: {
                    "$set": e.target.type === 'checkbox' ? e.target.checked : e.target.value
                }
            }
        });

        this.setState(newState);
    }

    handleSubmit(e) {
        this.handleValidation(e);

        userActions.login(this.state.user);
    }
}

export default Login;
