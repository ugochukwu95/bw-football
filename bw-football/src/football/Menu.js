import React, {Component} from "react";
import {Link} from "react-router-dom";
import M from 'materialize-css';

export class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		}
	}

	handleMenuClick = ev => {
		ev.preventDefault();
		this.setState({showMenu: !this.state.showMenu});
	}

	handleDropClick = item => e => {
		e.stopPropagation();
		this.props.history && this.props.history.push(`/category/${item}`)
	}

	render() {
		return <React.Fragment>
			<div className="card-content indigo darken-4 ugFrontContentCard hide-on-large-only" onClick={this.handleMenuClick}>
				<span className="white-text">{this.props.title} 
					<small className="right ugMenuBtn">
						<strong>Menu <i className={`fas fa-angle-down ${this.state.showMenu ? "hide" : "show"}`}></i><i className={`fas fa-angle-up ${this.state.showMenu ? "show" : "hide"}`}></i></strong>
					</small>
				</span>
			</div>
			<div className="hide-on-large-only">
			<table className={`ugMenuTable ${this.state.showMenu ? "show" : "hide"}`}>
				<tbody>
					<tr>
						<td>
							<Link to="/latest" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/latest") ? "underlineText" : ""}`}>Latest</Link>
						</td>
						<td>
							<Link to="/results/PL" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/results/:league?/:club?") ? "underlineText" : ""}`}>Results</Link>
						</td>
					</tr>
					<tr>
						<td>
							<Link to="/tables/PL" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/tables/:league?") ? "underlineText" : ""}`}>Tables</Link>
						</td>
						<td>
							<Link to="/fixtures/PL" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/fixtures/:league?") ? "underlineText" : ""}`}>Fixtures</Link>
						</td>
					</tr>
					<tr>
						<td data-target="catDrop" className={`dropdown-trigger ${(this.props.match && this.props.match.path === "/category/:title") ? "underlineText" : ""}`}>
							News by category
						</td>
					</tr>
				</tbody>
			</table>
			{
				this.props.categories && <ul id="catDrop" className="dropdown-content">
					{
						this.props.categories.sort().map(item => <li onTouchEnd={this.handleDropClick(item)} key={item}>
							<Link className="grey-text text-darken-2" to={`/category/${item}`}>
								{item}
							</Link>
						</li>)
					}
				</ul>
			}
			</div>
		</React.Fragment>
	}

	componentDidMount() {
		if (this.props.categories) {
			let elems = document.querySelectorAll('.dropdown-trigger');
			let options = {
				constrainWidth: false,
				coverTrigger: false,
			};
	    	M.Dropdown.init(elems, options);
	    }
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.categories === undefined) && prevProps.categories !== this.props.categories) {
			let elems = document.querySelectorAll('.dropdown-trigger');
			let options = {
				constrainWidth: false,
				coverTrigger: false,
			};
	    	M.Dropdown.init(elems, options);
		}
	}
}