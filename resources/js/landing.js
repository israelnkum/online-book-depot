/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import ReactDOM from "react-dom";
import React from 'react'
require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Landing from "./components/landing";
import {BrowserRouter as Router} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {Store, persistor} from "./utils/store";

if (document.getElementById('lading-page')) {
    ReactDOM.render(
        <Provider store={Store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Landing/>
                </Router>
            </PersistGate>
        </Provider>,
        document.getElementById('lading-page')
    )
}
