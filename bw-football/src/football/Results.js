import React, {Component} from "react";
// import M from 'materialize-css';
import { DataTypes } from "../data/Types";
import {Preloader} from "./Preloader";
import {Menu} from "./Menu";
import {ResultsMenu} from "./ResultsMenu";
import LeaguesData from "./LeaguesData";

export class Results extends Component {
	
	handleTryAgain = ev => {
		ev.preventDefault();
		this.props.clearData && this.props.clearData(DataTypes.TEAMS);
		this.props.clearData && this.props.clearData(DataTypes.MATCHES);

		(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
		(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: "FINISHED"});
	}

	render() {
		// handle page title
		let title = "Premier League";
		if (this.props.match && this.props.match.params.league && !this.props.match.params.clubId) {
			title = LeaguesData.find(obj => obj.leagueCode === this.props.match.params.league).league;
		}
		else if (this.props.match && this.props.match.params.clubId) {
			title = (this.props.teams && this.props.teams.teams.find(obj => obj.id === Number(this.props.match.params.clubId)).name) || <Preloader />;
		}

		// load results
		let matches = (this.props.matches && !this.props.matches.error) && this.props.matches.matches;

		if (matches && this.props.match && this.props.match.params.clubId) {
			let clubId = Number(this.props.match.params.clubId);
			matches = matches.filter(obj => obj.homeTeam.id === clubId || obj.awayTeam.id === clubId);
		}

		// sort matches by date descending
		matches && matches.sort((a,b) => {
			return new Date(b.utcDate) - new Date(a.utcDate);
		})

		let result = matches && matches.reduce((r, {id, utcDate}) => {
			let dateObj = new Date(utcDate);
			let monthyear = dateObj.toLocaleString("en-us", { month: "long", year: 'numeric' });
    		let xo = [matches.find(item => item.id === id)];
    		if(!r[monthyear]) r[monthyear] = {monthyear, xo, entries: 1}
  			else {
  				r[monthyear].entries++;
    			r[monthyear].xo.push(matches.find(item => item.id === id));
   			}
  			return r;
		}, {});

		let ru = result && Object.values(result);

		if (ru) {
			for (let i=0; i<ru.length; i++) {
				if (ru.hasOwnProperty(i)) {
					ru[i]['xo'] = ru[i]['xo'].reduce((r, {id, utcDate}) => {
						let dateObj = new Date(utcDate);
						let dayMonth = dateObj.toLocaleString("en-GB", {day: 'numeric', weekday: 'long', month: 'long'});
						let xxo = [matches.find(item => item.id === id)];
						if(!r[dayMonth]) { 
							r[dayMonth] = {dayMonth, xxo, entries: 1}
						}
						else {
			  				r[dayMonth].entries++;
			    			r[dayMonth].xxo.push(matches.find(item => item.id === id));
			   			}
			  			return r;
					}, {});
					ru[i]['xo'] = Object.values(ru[i]['xo']);
				}
			}
		}
		

		

		return <div className="white">
			<div className="card-panel white z-depth-0 ugHeader">
				<h5 className="grey-text text-darken-2">{title}</h5>
			</div>
			<Menu {...this.props} title="Results" match={this.props.match} />
			{
				this.props.match && <ResultsMenu {...this.props} handleTryAgain={this.handleTryAgain} lc={this.props.match.params.league} teams={this.props.teams} />
			}

			{
				(ru && this.props.teams && !this.props.teams.error) && ru.map(item => <div key={item.monthyear}>
					<h5 className="center monthYearTitle">{item.monthyear}</h5>
					<br />
					{
						item.xo.map(obj => <React.Fragment key={obj.dayMonth}>
							<div className="center dayMonthDiv indigo darken-4 white-text ugFrontContentCard">
								{obj.dayMonth}
							</div>
							<table className="scoreTable">
								<tbody>
							{
								obj.xxo.map(match => <tr key={match.id}>
									<td className="first">{((this.props.teams && !this.props.teams.error) && this.props.teams.teams.find(item => item.id === match.homeTeam.id).shortName) || match.homeTeam.name}</td>
									<td className="middle">
										<span className="">
											{match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
										</span>
									</td>
									<td className="last">{this.props.teams.teams.find(item => item.id === match.awayTeam.id).shortName || match.awayTeam.name}<span className="right">FT</span></td>
								</tr>)
							}
								</tbody>
							</table>
							<br />
						</React.Fragment>)
					}
					<br /><br />
				</div>)
			}

			{
				(!ru && !this.props.matches) && <div className="center">
					<br /><br />
					<Preloader />
					<br /><br />
					<br /><br />
				</div>
			}

			{
				((this.props.matches && this.props.matches.error) || (this.props.matches && this.props.matches.matches.length === 0)) && <div className="row">
					<div className="col s12 container">
					<br />
					<div className="card-panel center white-text">
						<h3 className="grey-text text-darken-2">:(</h3>
							<p className="grey-text text-darken-2">{this.props.matches.error}</p>
							<button onClick={this.handleTryAgain} className="btn btn-flat textTransform white-text indigo darken-4">Try again</button>
					</div>
					</div>
				</div>
			}
		</div>
	}

	componentDidMount() {
		this.props.clearData && this.props.clearData(DataTypes.TEAMS);
		this.props.clearData && this.props.clearData(DataTypes.MATCHES);

		(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
		(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: "FINISHED"});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.league !== this.props.match.params.league) {
			this.props.clearData && this.props.clearData(DataTypes.TEAMS);
			this.props.clearData && this.props.clearData(DataTypes.MATCHES);

			(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
			(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: "FINISHED"});
		}

		if (prevProps.match.url !== this.props.match.url) {
			this.props.clearData && this.props.clearData(DataTypes.TEAMS);
			this.props.clearData && this.props.clearData(DataTypes.MATCHES);

			(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
			(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: "FINISHED"});
		}
	}
}