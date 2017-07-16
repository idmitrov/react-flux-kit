import React, { Component } from 'react';
import update from 'immutability-helper';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import userActions from '../actions/user/userActions';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                email: null,
                password: null
            }
        }

        this._handleChange = this._handleChange.bind(this);
        this._handleValidation = this._handleValidation.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
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
                            onChange={this._handleChange}
                            onBlur={this._handleValidation}
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
                            onChange={this._handleChange}
                            onBlur={this._handleValidation}
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
                            onClick={this._handleSubmit}>
                            Login
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    _handleValidation(e) {
        // TODO: Find a way to validate all inputs
    }

    _handleChange(e) {
        let newState = update(this.state, {
            user: {
                [e.target.name]: {
                    "$set": e.target.type === 'checkbox' ? e.target.checked : e.target.value
                }
            }
        });

        this.setState(newState);
    }

    _handleSubmit(e) {
        this._handleValidation(e);

        userActions.login(this.state.user);
    }
}

export default Login;
