import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux";
import * as footballActions from "../data/ActionCreators";
import { Football } from "./Football";
import { DataTypes } from "../data/Types";

const mapStateToProps = (dataStore) => ({
	...dataStore
})

const mapDispatchToProps = {
	...footballActions
}

export const FootballConnector = connect(mapStateToProps, mapDispatchToProps)(
	class extends Component {
		render() {
			return <Switch>
				<Route exact={true} path={["/", "/latest", "/fixtures/:league?/:clubId?", "/league/:name/:id", "/results/:league?/:clubId?", "/tables/:league?", "/news/:title/:newsId", "/category/:title"]} render={(routeProps) => <Football {...this.props} {...routeProps} />} />
				<Redirect to="/" />
			</Switch>
		}

		componentDidMount() {
			//this.props.loadData(DataTypes.COMPETITIONS);
			//this.props.loadData(DataTypes.TABLESTATE);
			this.props.loadCategories(DataTypes.CATEGORIES);
		}
	}
)