import React, {Component} from "react";
import LeaguesData from "./LeaguesData";
// import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom";
// import {Preloader} from "./Preloader";

export class StandingsMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCompMenu: false,
		}
	}

	handleCompsClick = ev => {
		this.setState({showCompMenu: !this.state.showCompMenu});
	}

	render() {
		let startDate, endDate;
		startDate = this.props.standings && (new Date(this.props.standings.season.startDate)).getFullYear();
		endDate = this.props.standings && (new Date(this.props.standings.season.endDate)).getFullYear();
		return <React.Fragment>
			<div className="white ugFrontContentCard ugBorder">
				<ul className="ugResultsCardMenu ugStandCardMenu">
					<li className="grey-text text-darken-2 increaseFontSize">
						{(startDate && startDate + "/" + endDate) || "2019/2020"} Season
					</li>
					<li className="blue-text right" onClick={this.handleCompsClick}>
						All Tables <i className={`fas fa-angle-down ${this.state.showCompMenu ? "hide" : "show"}`}></i><i className={`fas fa-angle-up ${this.state.showCompMenu ? "show" : "hide"}`}></i>
					</li>
				</ul>
			</div>

			<ul className={`ugMenuTable ugComp ${this.state.showCompMenu ? "show" : "hide"}`}>
				{
					LeaguesData.map(obj => <li key={obj.leagueCode} onClick={this.handleCompsClick}>
						<Link className="grey-text text-darken-2" to={`/tables/${obj.leagueCode}`}>{obj.league}</Link>
					</li>)
				}
			</ul>
		</React.Fragment>
	}
}