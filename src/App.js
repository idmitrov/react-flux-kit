import React, { Component } from 'react';

import { MuiThemeProvider } from 'material-ui/styles';
import 'bootstrap/dist/css/bootstrap-grid.css';

import AppLayout from './components/shared/AppLayout';
import AppRoutes from './components/shared/AppRoutes';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <AppLayout heading="My App">
                    <AppRoutes />
                </AppLayout>
            </MuiThemeProvider>
        );
    }
}

export default App;
