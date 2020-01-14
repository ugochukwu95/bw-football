import React, {Component} from "react";
import M from 'materialize-css';
import { DataTypes } from "../data/Types";
import {Table} from "./Table";
import {Fixture} from "./Fixture";
import {Teams} from "./Teams";
import {Scorers} from "./Scorers";
import {Preloader} from "./Preloader";

export class League extends Component {

	render() {
		let tables, resetTableState, tablestate, handleNextButtonClick, competitions, handlePreviousButtonClick, matches, teams, scorers;
		if (this.props.standings && this.props.standings !== undefined) {
			tables = this.props.standings.standings;
		}
		if (this.props.tablestate && this.props.tablestate !== undefined) {
			tablestate = this.props.tablestate;
		}
		if (this.props.handleNextButtonClick && this.props.handleNextButtonClick !== undefined) {
			handleNextButtonClick = this.props.handleNextButtonClick;
		}
		if (this.props.handlePreviousButtonClick && this.props.handlePreviousButtonClick !== undefined) {
			handlePreviousButtonClick = this.props.handlePreviousButtonClick;
		}
		if (this.props.resetTableState && this.props.resetTableState !== undefined) {
			resetTableState = this.props.resetTableState;
		}
		if (this.props.matches && this.props.matches !== undefined) {
			matches = this.props.matches;
		}
		if (this.props.teams && this.props.teams !== undefined) {
			teams = this.props.teams;
		}
		if (this.props.scorers && this.props.scorers !== undefined) {
			scorers = this.props.scorers;
		}
		if (this.props.competitions && this.props.competitions !== undefined) {
			competitions = this.props.competitions;
		}

		return <React.Fragment>
			<div className="league-name">
				<span className="league-title">{(competitions && competitions[0]["name"] !== undefined) ? competitions.find((obj) => obj.id === Number(this.props.match.params.id)).name : this.props.match.params.name && this.props.match.params.name.replace(/-/g, ' ')}</span>
			</div>
			<br />
			<div className="container">
				<div className="row">
					<div className="col s12">
						<ul className="tabs leagueTabs">
							<li className="tab col l2"><a href="#table">Table</a></li>
							<li className="tab col l2"><a href="#fixture">Fixtures</a></li>
							<li className="tab col l2"><a href="#teams">Teams</a></li>
							<li className="tab col l2"><a href="#scorers">Top Scorers</a></li>
						</ul>
					</div>
					<div id="table" className="col s12"><br /> {(tables && tablestate && handleNextButtonClick && handlePreviousButtonClick) ? 
						<Table {...this.props} display={{display: "show"}} tablestate={tablestate} table={tables} handleNextButtonClick={handleNextButtonClick} 
							handlePreviousButtonClick={handlePreviousButtonClick} resetTableState={resetTableState}/> : <div className="center"><br /><Preloader /></div>}</div>
				    <div id="fixture" className="col s12">{(matches && tables) ? <Fixture {...this.props} matches={matches} tables={tables} /> : <div className="center"><br /><Preloader /></div>}</div>
				    <div id="teams" className="col s12">{(teams !== undefined) ? <Teams {...this.props} teams={teams} /> : <div className="center"><br /><Preloader /></div>}</div>
				    <div id="scorers" className="col s12">{(scorers !== undefined) ? <Scorers scorers={scorers} /> : <div className="center"><br /><Preloader /></div>}</div>
				</div>
			</div>
		</React.Fragment>
	}

	/*shouldComponentUpdate(newProps, newState) {
		let change = newProps.match.params.id !== this.props.match.params.id;
		return change;
	}*/

	componentDidMount() {
		let elems = document.querySelectorAll('.leagueTabs');
		let options = {};
		
		M.Tabs.init(elems, options);
		
		this.props.loadCompetitionData(DataTypes.STANDINGS, this.props.match.params.id);
		this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.id);
		this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.id);
		this.props.loadTopScorersData(DataTypes.SCORERS, this.props.match.params.id);
	}

	componentDidUpdate(prevProps, prevState) {
		let change = prevProps.match.params.id !== this.props.match.params.id;
		if (change) {
			this.props.loadCompetitionData(DataTypes.STANDINGS, this.props.match.params.id);
			this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.id);
			this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.id);
			this.props.loadTopScorersData(DataTypes.SCORERS, this.props.match.params.id);
			M.toast({html: 'Loading...'});
		}
	}

}