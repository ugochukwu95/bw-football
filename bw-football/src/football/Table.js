import React, {Component} from "react";
import {DataTypes} from "../data/Types";

export class Table extends Component {

	handleNextBtnClick = (event) => {
		event.preventDefault();
		if (this.props.tablestate.startItem === 10) {
			return;
		}

		let startItem = this.props.tablestate.startItem + this.props.tablestate.itemsPerPage;
		let itemsPerPage = startItem + this.props.tablestate.itemsPerPage;
		this.props.handleNextButtonClick(DataTypes.TABLESTATE, startItem, itemsPerPage);
	}

	handlePreviousButtonClick = (event) => {
		event.preventDefault();
		if (this.props.tablestate.startItem === 0) {
			return;
		}

		let startItem = this.props.tablestate.startItem - 10;
		let itemsPerPage = this.props.tablestate.itemsPerPage - 10;
		this.props.handlePreviousButtonClick(DataTypes.TABLESTATE, startItem, itemsPerPage);
	}

	render() {
		let tableArray;

		if (this.props.table) {
			tableArray = this.props.table.find((obj) => obj.type === "TOTAL").table;
			tableArray = tableArray.slice(this.props.tablestate.startItem, this.props.tablestate.itemsPerPage);
		}

		let elem = (<React.Fragment>
			<div id="card" className="card white">
				<div className="card-content">
				<table className="standings">
					<thead>
						<tr>
							<th colSpan="2">club</th>
							<th className="hide-on-med-and-down">&nbsp; </th>
							<th>MP</th>
							<th>W</th>
							<th>L</th>
							<th>Pts</th>
						</tr>
					</thead>
					<tbody>
						{tableArray && tableArray.map((obj) => {
							return <tr key={obj.team.id}>
								<td>{obj.position}</td>
								<td>{(obj.team.crestUrl === null) ? " " : (<img src={obj.team.crestUrl} width="25px" height="25px" alt={(obj.team.name).substring(0, 3).toUpperCase()} />)}</td>
								<td className="truncate hide-on-med-and-down">{obj.team.name}</td>
								<td>{obj.playedGames}</td>
								<td>{obj.won}</td>
								<td>{obj.lost}</td>
								<td>{obj.points}</td>
							</tr>
						})}
					</tbody>
				</table>
				</div>
			</div>
			<br />
			<div className={`row ${this.props.display.display}`}>
				<div className="col s12">
					<p className="right">
						<a href="#!" className="btn waves-effect waves-light explore-btn grey-text text-darken-4" onClick={this.handlePreviousButtonClick}><i className="material-icons left">chevron_left</i>PREV</a>&nbsp; 
						<a href="#!" className="btn waves-effect waves-light explore-btn grey-text text-darken-4" onClick={this.handleNextBtnClick}><i className="material-icons left">chevron_right</i>NEXT</a>
					</p>
				</div>
			</div>
		</React.Fragment>);

		return(
	        elem
	    )
	}

	componentDidUpdate(prevProps, prevState) {
		let change = prevProps.match.params.id !== this.props.match.params.id;
		if (change) this.props.resetTableState(DataTypes.TABLESTATE);
	}

	componentWillUnmount() {
		this.props.resetTableState(DataTypes.TABLESTATE);
	}

	/*static getDerivedStateFromProps(props, state) {
		if (props.table) {
			let tableState = props.table.find((obj) => obj.type === "TOTAL").table;
			let totalPages = Math.round(Number((tableState.length) / 10));

			return {
				isloading: true,
				totalPages: totalPages,
		    	startItem: 0,
		    	itemsPerPage: 10,
		    	table: tableState
			}
		}
		return state;
	}*/

	/*componentDidMount() {
		this.setState({isLoading: false});
	}*/
}