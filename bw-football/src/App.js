import React, { Component } from "react";
import { FootballDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { FootballConnector } from "./football/FootballConnector";

export default class App extends Component {
    render() {
        return <Provider store={ FootballDataStore }>
            <Router>
                <Switch>
                      <Route path="/" component={ FootballConnector } />
                      <Redirect to="/" />
                </Switch>
          </Router>
        </Provider>
    }
}