/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import ReactDOM from "react-dom";
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Store, persistor } from './utils/store'
require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Dashboard from "./components/dashboard";
import {BrowserRouter as Router} from "react-router-dom";

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={Store}>
            <PersistGate persistor={persistor}>
                <Router>
                <Dashboard/>
                </Router>
            </PersistGate>
        </Provider>,
        document.getElementById('root')
    )
}
