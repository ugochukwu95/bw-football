import React, {Component} from "react";
import M from 'materialize-css';
import { DataTypes } from "../data/Types";
import {ResultsCard} from "./ResultsCard";
import {Preloader} from "./Preloader";
import {MessagePanel} from "./MessagePanel";

export class Results extends Component {
	handleChange = (event) => {
		console.log(event);
	}
	render() {
		let laliga, epl, italy, bundesliga, portugal, french, resultsDate, localDate, days, months, day, month, vdate;

		if (this.props.results && this.props.results.matches) {
			laliga = this.props.results.matches.filter((obj) => obj.competition.id === 2014);
			epl = this.props.results.matches.filter((obj) => obj.competition.id === 2021);
			italy = this.props.results.matches.filter((obj) => obj.competition.id === 2019);
			bundesliga = this.props.results.matches.filter((obj) => obj.competition.id === 2002);
			portugal = this.props.results.matches.filter((obj) => obj.competition.id === 2017);
			french = this.props.results.matches.filter((obj) => obj.competition.id === 2015);
			resultsDate = new Date(Date.parse(this.props.results.filters.dateFrom));
			localDate = resultsDate;
		    days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
			months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

			day = days[localDate.getDay()];
			month = months[localDate.getMonth()];
			vdate = localDate.getDate();
		}

		return <div className="row prow">
			<div className="col l8 offset-l2 s12">
				<div className="container">
				    <br /><br />
					<p className="datepicker"><i className="left material-icons">calendar_today</i> {resultsDate && `${day}, ${vdate}/${month}`} <br /><small>choose date</small></p>
					{(this.props.results === undefined) ? (<div className="center"><br /><br /><br /><Preloader /><br /><br /></div>) : ""}
					{(this.props.results && this.props.results.matches.length === 0) ? (<MessagePanel message="No matches on this date" icon="deck" />) : ""}
					{(laliga === undefined || laliga.length === 0) ? "" : <ResultsCard name="La Liga" matchesArray={laliga} />}
					{(epl === undefined || epl.length === 0) ? "" : <ResultsCard name="English Premier League" matchesArray={epl} />}
					{(italy === undefined || italy.length === 0) ? "" : <ResultsCard name="Serie A" matchesArray={italy} />}
					{(bundesliga === undefined || bundesliga.length === 0) ? "" : <ResultsCard name="Bundesliga" matchesArray={bundesliga} />}
					{(french === undefined || french.length === 0) ? "" : <ResultsCard name="Ligue 1" matchesArray={french} />}
					{(portugal === undefined || portugal.length === 0) ? "" : <ResultsCard name="Primeira Liga" matchesArray={portugal} />}
				</div>
			</div>
		</div>
	}

	componentDidMount() {
		// activate all materialize components
		// M.AutoInit();
		let reProps = this.props.loadResultsData;
		
		if (this.props.loadResultsData && this.props.loadResultsData !== undefined) {
			let today = new Date();
			let dd = String(today.getDate()).padStart(2, '0');
			let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			let yyyy = today.getFullYear();

			today = yyyy + '-' + mm + '-' + dd;

			this.props.loadResultsData(DataTypes.RESULTS, today);
		}

		let elems = document.querySelectorAll('.datepicker');
		let options = {
		 	autoClose: true,
		 	onSelect: function(obj) {
		 		let d = new Date(obj);
		 		let dd = String(d.getDate()).padStart(2, '0');
				let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
				let yyyy = d.getFullYear();

				d = yyyy + '-' + mm + '-' + dd;

				if (reProps(DataTypes.RESULTS, d)) {
					
					let toastElement = document.querySelector('.toast');
				    let toastInstance = M.Toast.getInstance(toastElement);
				    toastInstance.dismiss();
				}
				else {
					M.toast({html: 'Loading...'});
				}
		 	}
		};
		if (elems && options) M.Datepicker.init(elems, options);
		 
	}
}