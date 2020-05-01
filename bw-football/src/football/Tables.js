import React, {Component} from "react";
// import M from 'materialize-css';
import { DataTypes } from "../data/Types";
import {Preloader} from "./Preloader";
import {Menu} from "./Menu";
import LeaguesData from "./LeaguesData";
import {StandingsMenu} from "./StandingsMenu";

export class Tables extends Component {

	handleTryAgain = ev => {
		ev.preventDefault();
		this.props.clearData && this.props.clearData(DataTypes.STANDINGS);
		(this.props.match && this.props.loadCompetitionData) && this.props.loadCompetitionData(DataTypes.STANDINGS, this.props.match.params.league);
	}

	render() {
		// handle page title
		let title = <Preloader />;
		if (this.props.match && this.props.match.params.league) {
			title = LeaguesData.find(obj => obj.leagueCode === this.props.match.params.league).league;
		}

		return <div className="white">
			<div className="card-panel white z-depth-0 ugHeader">
				<h5 className="grey-text text-darken-2">{title}</h5>
			</div>
			<Menu {...this.props} title="Tables" match={this.props.match} />
			<StandingsMenu standings={this.props.standings} />
			<div className="center dayMonthDiv indigo darken-4 white-text ugFrontContentCard">
				{title} {(this.props.standings && !this.props.standings.error) && (new Date(this.props.standings.season.startDate)).getFullYear()} {(this.props.standings && !this.props.standings.error) && "/"} {(this.props.standings && !this.props.standings.error) && (new Date(this.props.standings.season.endDate)).getFullYear()}
			</div>
			{
				(this.props.standings && !this.props.standings.error) && <div className="container">
					<table className="standingsTable">
						<thead>
							<tr className="grey lighten-5">
								<td>#</td>
								<td>Team</td>
								<td>Pl</td>
								<td>GD</td>
								<td>Pts</td>
							</tr>
						</thead>
						<tbody>
							{
								this.props.standings.standings.find(item => item.type === "TOTAL").table.map((obj, index) => <tr key={obj.team.id}>
									<td>{index + 1}</td>
									<td>{obj.team.name}</td>
									<td>{obj.playedGames}</td>
									<td>{obj.goalDifference}</td>
									<td>{obj.points}</td>
								</tr>)
							}
						</tbody>
					</table>
					<p className="grey-text text-darken-2">
						Last updated: {new Date(this.props.standings.competition.lastUpdated).toLocaleString("en-GB", {day: 'numeric', weekday: 'long', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC'})}
					</p>
				</div>
			}

			{
				(this.props.standings && this.props.standings.error) && <div className="row">
					<div className="col s12 container">
					<br />
					<div className="card-panel center white-text">
						<h3 className="grey-text text-darken-2">:(</h3>
							<p className="grey-text text-darken-2">{this.props.standings.error}</p>
							<button onClick={this.handleTryAgain} className="btn btn-flat textTransform white-text indigo darken-4">Try again</button>
					</div>
					</div>
				</div>
			}

			{
				(!this.props.standings) && <div className="center">
					<br /><br />
					<Preloader />
					<br /><br />
					<br /><br />
				</div>
			}
		</div>
	}

	componentDidMount() {
		// load standings
		this.props.clearData && this.props.clearData(DataTypes.STANDINGS);
		(this.props.match && this.props.loadCompetitionData) && this.props.loadCompetitionData(DataTypes.STANDINGS, this.props.match.params.league);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.league !== this.props.match.params.league) {
			this.props.clearData && this.props.clearData(DataTypes.STANDINGS);
			(this.props.match && this.props.loadCompetitionData) && this.props.loadCompetitionData(DataTypes.STANDINGS, this.props.match.params.league);
		}

		if (prevProps.match.url !== this.props.match.url) {
			this.props.clearData && this.props.clearData(DataTypes.STANDINGS);
			(this.props.match && this.props.loadCompetitionData) && this.props.loadCompetitionData(DataTypes.STANDINGS, this.props.match.params.league);
		}
	}
}