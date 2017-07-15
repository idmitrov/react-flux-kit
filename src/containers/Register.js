import React, { Component } from 'react';
import requester from '../utils/requester';

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
    }

    render() {
        requester.post('/auth/signup', this.state.user)
            .then(response => {
                console.log(response);
            });
        return (
            <section>
                <h2>Register</h2>
            </section>
        );
    }
}

export default Register;
