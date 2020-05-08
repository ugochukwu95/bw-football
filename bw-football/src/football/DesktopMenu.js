import React, {Component} from "react";
import {Link} from "react-router-dom";
import M from 'materialize-css';

export class DesktopMenu extends Component {
	render() {
		return <React.Fragment>
			<div className="hide-on-med-and-down">
				<ul className="ugDesktopMenu">
					<li>
						<Link to="/latest" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/latest") ? "underlineText ugBoldText" : ""}`}>Latest</Link>
					</li>
					<li>
						<Link to="/results/PL" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/results/:league?/:club?") ? "underlineText ugBoldText" : ""}`}>Results</Link>
					</li>
					<li>
						<Link to="/tables/PL" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/tables/:league?") ? "underlineText ugBoldText" : ""}`}>Tables</Link>
					</li>
					<li>
						<Link to="/fixtures/PL" className={`grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/fixtures/:league?") ? "underlineText ugBoldText" : ""}`}>Fixtures</Link>
					</li>
					<li>
						<a href="#!" data-target="catDesktopDrop" className={`dropdown-trigger grey-text text-darken-2 ${(this.props.match && this.props.match.path === "/category/:title") ? "underlineText ugBoldText" : ""}`}>
							News by category <i className="fas fa-angle-down"></i>
						</a>
					</li>
				</ul>
				{
					this.props.categories && <ul id="catDesktopDrop" className="dropdown-content">
						{
							this.props.categories.sort().map(item => <li key={item}>
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
}