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

        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitResponse = this.handleSubmitResponse.bind(this);

        userStore.on(types.USER_REGISTERED, this.handleSubmitResponse);
    }

    componentWillUnmound() {
        userStore.removeListener(types.USER_REGISTERED, this.handleSubmitResponse);
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
                            onChange={this.handleChange}
                            onBlur={this.handleValidation}
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
                            onChange={this.handleChange}
                            onBlur={this.handleValidation}
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
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Button
                            raised
                            color="contrast"
                            onClick={this.handleSubmit}>
                            Register
                        </Button>
                    </div>
                </div>
            </section>
        );
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

    handleValidation(e) {
        // TODO: Find a way to validate all inputs
    }

    handleSubmit(e) {
        this.handleValidation(e);

        userActions.register(this.state.user);
    }

    handleSubmitResponse(e) {
        console.log(e);
    }
}

export default Register;
