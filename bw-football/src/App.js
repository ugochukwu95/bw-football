import React, { Component } from "react";
import { FootballDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { FootballConnector } from "./football/FootballConnector";
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

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

    componentDidMount() {
      JavascriptTimeAgo.locale(en)
    }
}