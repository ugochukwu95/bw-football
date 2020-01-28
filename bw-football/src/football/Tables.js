import React, {Component} from "react";
import M from 'materialize-css';
import { DataTypes } from "../data/Types";
import {Preloader} from "./Preloader";
import {Table} from "./Table";

export class Tables extends Component {
	handleChange = (event) => {
		event.persist();
		if (this.props.loadCompetitionData && this.props.loadCompetitionData !== undefined) {
			if (this.props.loadCompetitionData(DataTypes.STANDINGS, event.target.value)) {
				let toastElement = document.querySelector('.toast');
			    let toastInstance = M.Toast.getInstance(toastElement);
			    toastInstance.dismiss();
			}
			else {
				M.toast({html: 'Loading...'});
				let elt = document.getElementById("compSel");
				let header = document.getElementById('table-header');
				header.innerHTML = elt.options[elt.selectedIndex].text	
			}

		}
	}

	render() {
		let tables, resetTableState, tablestate, handleNextButtonClick, handlePreviousButtonClick;
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

		return <div className="row">
			<div className="col s12">
				<div className="container">
					<h5 className="grey-text text-darken-2 center"><strong id="table-header">{this.props.competitions && this.props.competitions.find((obj) => {
						return obj.id === 2021
					}).name}</strong></h5>
					<div className="input-field col l4 m8 s8">
						{(this.props.competitions !== undefined) ? (<select id="compSel" onChange={this.handleChange}>{this.props.competitions.map((obj) => {
							let selected;
							if (obj.id === 2021) {
								selected = "selected";
							}
							return <option value={obj.id} selected={selected} key={obj.id}>{obj.name}</option>
						})}</select>) : ""}
					</div>
					<br /><br /><br /><br />
					{(tables && tablestate && handleNextButtonClick && handlePreviousButtonClick) ?
					<Table {...this.props} display={{display: "show"}} tablestate={tablestate} table={tables} handleNextButtonClick={handleNextButtonClick} 
							handlePreviousButtonClick={handlePreviousButtonClick} resetTableState={resetTableState} /> : <div className="center"><Preloader /></div>}
				</div>
			</div>
		</div>
	}

	componentDidMount() {
		let elems = document.querySelectorAll('select');
		let options = {};
    	M.FormSelect.init(elems, options);
		if (this.props.loadCompetitionData && this.props.loadCompetitionData !== undefined) {
			this.props.loadCompetitionData(DataTypes.STANDINGS, 2021);
		}

	    let elemss = document.querySelectorAll('.sidenav');
		let optionss = {edge: "right"};
    	M.Sidenav.init(elemss, optionss);
	}
}