import React, {Component} from "react";
import {Link} from "react-router-dom";

export class CategoryNavigation extends Component {
	handleEvent = (event) => {
		event.preventDefault();
		event.persist();
		let anchor = event.target.closest("a");
		this.props.history && this.props.history.push(anchor.getAttribute('href'));
	}
	render() {
		return <nav className="white-text white bottom-nav">
			<div className="nav-wrapper container">
				<ul className="tabs catTabs">
					{this.props.competitions && this.props.competitions.map((league) => {
						return <li className="tab col l3" key={league.id}>
							<Link onClick={this.handleEvent} className="grey-text text-darken-1" to={`/league/${league.name.replace(/\s+/g, '-').toLowerCase()}/${league.id}`}>
								{league.name.toUpperCase()}
							</Link>
						</li>
					})}
				</ul>
				<br/>
			</div>
		</nav>
	}
}