import React, {Component} from "react";
import {DataTypes} from "../data/Types";

export class Fixture extends Component {
	handleFixturePreviousButtonClick = (event) => {
		event.preventDefault();
		if (this.props.matches.matchDay === 1) {
			return;
		}

		let matchDay = this.props.matches.matchDay - 1;

		this.props.handleFixturePreviousButtonClick(DataTypes.MATCHES, matchDay);
	}
	handleFixtureNextBtnClick = (event) => {
		event.preventDefault();

		let totalTeams = this.props.tables[0].table.length;
		let totalMatchdays = Math.round((this.props.matches.matchesCount / totalTeams) * 2);

		if (this.props.matches.matchDay === totalMatchdays) {
			return;
		}
		let matchDay = this.props.matches.matchDay + 1;

		this.props.handleFixturePreviousButtonClick(DataTypes.MATCHES, matchDay);
	}
	render() {
		let matchesArray;
		let matchDay, totalTeams, totalMatchdays;
		if (this.props.matches) {
			//console.log(this.props.matches);
			totalTeams = this.props.tables[0].table.length;
			totalMatchdays = Math.round((this.props.matches.matchesCount / totalTeams) * 2);
			matchDay = this.props.matches.matchDay;
			matchesArray = this.props.matches.matches.filter((obj) => matchDay === obj.matchday);
		}
		return <div className="row">
			<div className="col s12">
				<br />
				<h6 className="center grey-text text-darken-2"><strong>Matchday {matchDay} of {totalMatchdays}</strong></h6><br />
				<div className="card white">
					<div className="card-content grey-text text-darken-1">
						<table className="highlight fixture-table">
							<tbody>
								{matchesArray && matchesArray.map((obj) => {
									let localDate = new Date(obj.utcDate);
									let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
									var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

									let day = days[localDate.getDay()];
									let month = months[localDate.getMonth()];
									let vdate = localDate.getDate();
									let hour = localDate.getHours();
									let minute = localDate.getMinutes();
									if (minute === 0) {
										minute = "00";
									}

									return <tr key={obj.id}>
										<td className={`truncate ${((obj.status === "FINISHED") && (obj.score.winner === "HOME_TEAM")) ? "winner_bold" : ""}`}>
											{obj.homeTeam.name}
										</td>
										{(obj.status === "FINISHED") ? (<td colSpan="3" className="center center-column">{`${obj.score.fullTime.homeTeam} : ${obj.score.fullTime.awayTeam}`}</td>) : 
											<td className="center center-column" colSpan="3">{`${day}, ${vdate}/${month} ${hour}:${minute}`}</td>}
										<td className={`${((obj.status === "FINISHED") && (obj.score.winner === "AWAY_TEAM")) ? "winner_bold" : ""} truncate alnright`}>
											{obj.awayTeam.name}
										</td>
									</tr>
								})}
							</tbody>
						</table>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col s12">
						<p className="right">
							<a href="#!" className="btn waves-effect waves-light explore-btn grey-text text-darken-4" onClick={this.handleFixturePreviousButtonClick}><i className="material-icons left">chevron_left</i>PREV</a>&nbsp; 
							<a href="#!" className="btn waves-effect waves-light explore-btn grey-text text-darken-4" onClick={this.handleFixtureNextBtnClick}><i className="material-icons left">chevron_right</i>NEXT</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	}
}