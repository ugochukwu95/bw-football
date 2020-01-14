import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux";
import * as footballActions from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Football } from "./Football";

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
				<Route exact={true} path="/" render={(routeProps) => <Football {...this.props} {...routeProps} />} />
				<Route exact={true} path={["/league/:name/:id", "/results", "/tables", "/news/:title/:newsId"]} render={(routeProps) => <Football {...this.props} {...routeProps} 
				/>} />
				<Redirect to="/" />
			</Switch>
		}

		componentDidMount() {
			this.props.loadData(DataTypes.COMPETITIONS);
			this.props.loadData(DataTypes.TABLESTATE);
			this.props.loadData(DataTypes.NEWS);
		}
	}
)