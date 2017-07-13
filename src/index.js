import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import history from './tools/history';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={history}>
        <Route path="/" component={App} />
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
