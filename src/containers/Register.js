import React, { Component } from 'react';
import update from 'immutability-helper';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import userActions from '../actions/user/userActions';
import * as types from '../actions/user/userActionTypes';
import userStore from '../stores/userStore';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                name: null,
                email: null,
                password: null
            }
        };

        this._handleChange = this._handleChange.bind(this);
        this._handleValidation = this._handleValidation.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleSubmitResponse = this._handleSubmitResponse.bind(this);

        userStore.on(types.USER_REGISTERED, this._handleSubmitResponse);
    }

    componentWillUnmount() {
        userStore.removeListener(types.USER_REGISTERED, this._handleSubmitResponse);
    }

    render() {
        return (
            <section>
                <div className="row">
                    <div className="col-md-12">
                        <h2>Register</h2>
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
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <TextField
                            name="name"
                            label="Name"
                            required
                            marginForm
                            onChange={this._handleChange}
                            onBlur={this._handleValidation}
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
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Button
                            raised
                            color="contrast"
                            onClick={this._handleSubmit}>
                            Register
                        </Button>
                    </div>
                </div>
            </section>
        );
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

    _handleValidation(e) {
        // TODO: Find a way to validate all inputs
    }

    _handleSubmit(e) {
        this._handleValidation(e);

        userActions.register(this.state.user);
    }

    _handleSubmitResponse(e) {
        userActions.login(this.state.user);
    }
}

export default Register;
