import React, { Component } from 'react';

import { MuiThemeProvider } from 'material-ui/styles';
import 'bootstrap/dist/css/bootstrap-grid.css';

import AppLayout from './components/shared/AppLayout';
import AppRoutes from './components/shared/AppRoutes';

class App extends Component {
    constructor() {
        super();

        this.state = {
            name: 'My App',
            drawer: [
                { name: 'Home', href: '/', title: 'Home' },
                { name: 'About', href: '/about', title: 'About' },
                { name: 'Test', href: '/test', title: 'Test' },
            ]
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <AppLayout heading={this.state.name} drawer={this.state.drawer}>
                    <AppRoutes />
                </AppLayout>
            </MuiThemeProvider>
        );
    }
}

export default App;
