import React, {Component} from "react";
import M from 'materialize-css';
import { DataTypes } from "../data/Types";
import {Preloader} from "./Preloader";
import {Menu} from "./Menu";
import {ResultsMenu} from "./ResultsMenu";
import LeaguesData from "./LeaguesData";
import {DesktopMenu} from "./DesktopMenu";

export class Fixture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "POSTPONED",
			dateFrom: "",
			dateTo: "",
			selectDateText: "Select a date",
		}
	}

	formatDate = date => {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) 
	        month = '0' + month;
	    if (day.length < 2) 
	        day = '0' + day;

	    return [year, month, day].join('-');
	}

	handlePostponedSelect = ev => {
		ev.preventDefault();
		this.setState({status: "POSTPONED"}, () => this.handleTryAgain())
	}

	handleScheduledSelect = ev => {
		ev.preventDefault();
		this.setState({status: "SCHEDULED"}, () => this.handleTryAgain())
	}

	handleTryAgain = (ev = null) => {
		if (ev) {
			ev.preventDefault();
		}

		this.props.clearData && this.props.clearData(DataTypes.TEAMS);
		this.props.clearData && this.props.clearData(DataTypes.MATCHES);

		(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
		(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: this.state.status, dateFrom: this.state.dateFrom, dateTo: this.state.dateTo});
	}

	openDatePicker = (ev) => {
		ev.preventDefault();
	}

	render() {
		// handle page title
		let title = "Premier League";
		if (this.props.match && this.props.match.params.league && !this.props.match.params.clubId) {
			title = LeaguesData.find(obj => obj.leagueCode === this.props.match.params.league).league;
		}
		else if (this.props.match && this.props.match.params.clubId) {
			title = ((this.props.teams && !this.props.teams.error) && this.props.teams.teams.find(obj => obj.id === Number(this.props.match.params.clubId)).name) || <Preloader />;
		}

		// load results
		let matches = (this.props.matches && !this.props.matches.error) && this.props.matches.matches;

		if (matches && this.props.match && this.props.match.params.clubId) {
			let clubId = Number(this.props.match.params.clubId);
			matches = matches.filter(obj => obj.homeTeam.id === clubId || obj.awayTeam.id === clubId);
		}

		// sort matches by date descending
		/*matches && matches.sort((a,b) => {
			return new Date(b.utcDate) - new Date(a.utcDate);
		})*/

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
			<div className="card-panel white z-depth-0 ugHeader hide-on-large-only">
				<h5 className="grey-text text-darken-2">{title}</h5>
			</div>
			<Menu {...this.props} title="Fixtures" match={this.props.match} />

			<div className="hide-on-med-and-down container">
				<br /><br />
				<div className="card-panel white z-depth-0 ugHeader">
					<h4 className="grey-text text-darken-2">{title}</h4>
				</div>
				<DesktopMenu {...this.props} title="Fixtures" match={this.props.match} />
			</div>
			<div className="container hide-on-med-and-down">
				{
					this.props.match && <ResultsMenu {...this.props} fixtures={true} handleTryAgain={this.handleTryAgain} lc={this.props.match.params.league} teams={this.props.teams} />
				}
			</div>
			<div className="hide-on-large-only">
				{
					this.props.match && <ResultsMenu {...this.props} fixtures={true} handleTryAgain={this.handleTryAgain} lc={this.props.match.params.league} teams={this.props.teams} />
				}
			</div>

			<div className="row hide-on-large-only">
				<div className="col s12">
					<ul className="fixturesMenuBtns">
						<li>
							<button onClick={this.handlePostponedSelect} className={`btn indigo darken-4 white-text ${(this.state.status === "POSTPONED") ? "disabled" : ""}`}>Postponed</button>
						</li>
						<li>
							<button onClick={this.handleScheduledSelect} className={`btn indigo darken-4 white-text ${(this.state.status === "SCHEDULED") ? "disabled" : ""}`}>Sceduled</button>
						</li>
						<li className="right">
							<button id="datepicker" className="btn datepicker white blue-text fixtueDatePicker z-depth-0">
								{this.state.selectDateText}
							</button>
						</li>
					</ul>
					<p className="grey-text text-darken-2">Showing {this.state.status.toLowerCase()} matches for {this.state.selectDateText === "Select a date" ? "this month" : this.state.selectDateText}</p>
				</div>
			</div>

			<div className="container hide-on-med-and-down">
				<div className="">
					<ul className="fixturesMenuBtns">
						<li>
							<button onClick={this.handlePostponedSelect} className={`btn indigo darken-4 white-text ${(this.state.status === "POSTPONED") ? "disabled" : ""}`}>Postponed</button>
						</li>
						<li>
							<button onClick={this.handleScheduledSelect} className={`btn indigo darken-4 white-text ${(this.state.status === "SCHEDULED") ? "disabled" : ""}`}>Sceduled</button>
						</li>
						<li className="right">
							<button id="datepicker" className="btn datepicker white blue-text fixtueDatePicker z-depth-0">
								{this.state.selectDateText}
							</button>
						</li>
					</ul>
					<p className="grey-text text-darken-2">Showing {this.state.status.toLowerCase()} matches for {this.state.selectDateText === "Select a date" ? "this month" : this.state.selectDateText}</p>
				</div>
			</div>

			{
				(ru && (this.props.teams && !this.props.teams.error)) && ru.map(item => <div key={item.monthyear}>
					<div className="row">
						<div className="col l8 offset-l2 s12">
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
										obj.xxo.map(match => {
											let matchDate = "";
											if (this.state.status === "SHEDULED") {
												let d = new Date(match.utcDate);
												let m = d.getMinutes();
		  										let h = d.getHours(); 
		  										matchDate = h + ":" + m;
											}
											return <tr key={match.id}>
												<td className="first">{((this.props.teams && !this.props.teams.error) && this.props.teams.teams.find(item => item.id === match.homeTeam.id).shortName) || match.homeTeam.name}</td>
												<td className="middle">
													<span className={(this.state.status === "POSTPONED" || this.state.status === "SCHEDULED") ? "hide" : "show"}>
														{match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
													</span>
													<span className={this.state.status === "POSTPONED" ? "show" : "hide"}>
														p - p
													</span>
													<span className={`white grey-text text-darken-2 ${this.state.status === "SHEDULED" ? "show" : "hide"}`}>
														{matchDate}
													</span>
												</td>
												<td className="last">{((this.props.teams && !this.props.teams.error) && this.props.teams.teams.find(item => item.id === match.awayTeam.id).shortName) || match.awayTeam.name}</td>
											</tr>
										})
									}
										</tbody>
									</table>
									<br />
								</React.Fragment>)
							}
							<br /><br />
						</div>
					</div>
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
				(this.props.matches && this.props.matches.error) && <div className="row">
					<div className="col l6 offset-l3 s12 container">
					<br />
					<div className="card-panel center white-text">
						<h3 className="grey-text text-darken-2">:(</h3>
							<p className="grey-text text-darken-2">{this.props.matches.error}</p>
							<button onClick={this.handleTryAgain} className="btn btn-flat textTransform white-text indigo darken-4">Try again</button>
					</div>
					</div>
				</div>
			}

			{
				(this.props.matches && !this.props.matches.error && this.props.matches.matches.length === 0) && <div className="row">
					<div className="col l6 offset-l3 s12 container">
					<br />
					<div className="card-panel center white-text">
						<h3 className="grey-text text-darken-2">:(</h3>
							<p className="grey-text text-darken-2">No {this.state.status.toLowerCase()} matches</p>
					</div>
					</div>
				</div>
			}
		</div>
	}

	componentDidMount() {
		const that = this;

		// get first and last date of month
		let date = new Date();
		let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		this.setState({dateFrom: this.formatDate(firstDay), dateTo: this.formatDate(lastDay)}, () => {
			this.props.clearData && this.props.clearData(DataTypes.TEAMS);
			this.props.clearData && this.props.clearData(DataTypes.MATCHES);

			(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
			(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: this.state.status, dateFrom: this.state.dateFrom, dateTo: this.state.dateTo});
		});

		// initialize datepicker
		let elems = document.querySelectorAll('.datepicker');
		let options = {
			autoClose: true,
			onSelect: () => {
				let instance = M.Datepicker.getInstance(document.getElementById("datepicker"));
				let selectedText = instance.toString();

				// get date for selected date
				that.setState({status: "SCHEDULED", dateFrom: that.formatDate(selectedText), dateTo: that.formatDate(selectedText), selectDateText: selectedText}, () => {
					// clear current matches data
					that.props.clearData && that.props.clearData(DataTypes.MATCHES);

					// Load new matches data
					(that.props.match && that.props.loadMatchesData) && that.props.loadMatchesData(DataTypes.MATCHES, that.props.match.params.league, {status: that.state.status, dateFrom: that.state.dateFrom, dateTo: that.state.dateTo});
				})

			},
		};
    	M.Datepicker.init(elems, options);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.league !== this.props.match.params.league) {
			// get first and last date of month
			let date = new Date();
			let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

			this.setState({dateFrom: this.formatDate(firstDay), dateTo: this.formatDate(lastDay)}, () => {
				this.props.clearData && this.props.clearData(DataTypes.TEAMS);
				this.props.clearData && this.props.clearData(DataTypes.MATCHES);

				(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
				(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: this.state.status, dateFrom: this.state.dateFrom, dateTo: this.state.dateTo});
			});
		}

		if (prevProps.match.url !== this.props.match.url) {
			// get first and last date of month
			let date = new Date();
			let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
			let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

			this.setState({dateFrom: this.formatDate(firstDay), dateTo: this.formatDate(lastDay)}, () => {
				this.props.clearData && this.props.clearData(DataTypes.TEAMS);
				this.props.clearData && this.props.clearData(DataTypes.MATCHES);

				(this.props.match && this.props.loadTeamsData) && this.props.loadTeamsData(DataTypes.TEAMS, this.props.match.params.league);
				(this.props.match && this.props.loadMatchesData) && this.props.loadMatchesData(DataTypes.MATCHES, this.props.match.params.league, {status: this.state.status, dateFrom: this.state.dateFrom, dateTo: this.state.dateTo});
			});
		}
	}
}