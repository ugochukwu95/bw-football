import React, {Component} from "react";
import LeaguesData from "./LeaguesData";
// import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom";
import {Preloader} from "./Preloader";

export class ResultsMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCompMenu: false,
			showTeamsMenu: false
		}
	}

	handleCompsClick = ev => {
		this.setState({showCompMenu: !this.state.showCompMenu, showTeamsMenu: false});
	}

	handleTeamsClick = ev => {
		this.setState({showTeamsMenu: !this.state.showTeamsMenu, showCompMenu: false});
	}


	render() {
		return <React.Fragment>
			<div className="white ugFrontContentCard ugBorder">
				<ul className="ugResultsCardMenu">
					<li className="grey-text text-darken-2" onClick={this.handleCompsClick}>
						Competitions <i className={`fas fa-angle-down ${this.state.showCompMenu ? "hide" : "show"}`}></i><i className={`fas fa-angle-up ${this.state.showCompMenu ? "show" : "hide"}`}></i>
					</li>
					<li className="grey-text text-darken-2" onClick={this.handleTeamsClick}>
						Teams <i className={`fas fa-angle-down ${this.state.showTeamsMenu ? "hide" : "show"}`}></i><i className={`fas fa-angle-up ${this.state.showTeamsMenu ? "show" : "hide"}`}></i>
					</li>
				</ul>
			</div>
			
			<ul className={`ugMenuTable ugComp ${this.state.showCompMenu ? "show" : "hide"}`}>
				{
					LeaguesData.map(obj => <li key={obj.leagueCode} onClick={this.handleCompsClick}>
						{
							(this.props.match && this.props.match.path === "/results/:league?/:clubId?") ? <Link className="grey-text text-darken-2" to={`/results/${obj.leagueCode}`}>{obj.league}</Link> : <Link className="grey-text text-darken-2" to={`/fixtures/${obj.leagueCode}`}>{obj.league}</Link>
						}
					</li>)
				}
			</ul>

			{
				(this.props.teams && !this.props.teams.error) && <ul className={`ugMenuTable ugComp ${this.state.showTeamsMenu ? "show" : "hide"}`}>
					{
						this.props.teams.teams.map(obj => <li key={obj.id} onClick={this.handleTeamsClick}>
							{
								(this.props.match && this.props.match.path === "/results/:league?/:clubId?") ? <Link className="grey-text text-darken-2" to={`/results/${this.props.lc}/${obj.id}`}>{obj.shortName}</Link> : <Link className="grey-text text-darken-2" to={`/fixtures/${this.props.lc}/${obj.id}`}>{obj.shortName}</Link>
							}
						</li>)
					}
				</ul>
			}

			{
				!this.props.teams && <div className={`ugMenuTable center ${this.state.showTeamsMenu ? "show" : "hide"}`}>
					<br /><br />
					<Preloader />
					<br /><br />
				</div>
			}

			{
				(this.props.teams && this.props.teams.error) && <div className={`row ${this.state.showTeamsMenu ? "show" : "hide"}`}>
					<div className="col s12 container">
					<br />
					<div className="card-panel center white-text">
						<h3 className="grey-text text-darken-2">:(</h3>
							<p className="grey-text text-darken-2">{this.props.teams.error}</p>
							<button onClick={this.props.handleTryAgain} className="btn btn-flat textTransform white-text indigo darken-4">Try again</button>
					</div>
					</div>
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {

	}
}