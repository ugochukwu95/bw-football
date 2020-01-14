import React, {Component} from "react";
import {CategoryNavigation} from "./CategoryNavigation";
import {Link} from "react-router-dom";
import {FrontPage} from "./FrontPage";
import { League } from "./League";
import { Results } from "./Results";
import { Tables } from "./Tables";
import {News} from "./News";
import {Preloader} from "./Preloader";
import M from 'materialize-css';

export class Football extends Component {
	render() {
		let today = new Date();
		let yyyy = today.getFullYear();

		let comp;
		if (this.props.match.url.search("league") !== -1)  {
			if (this.props.competitions && this.props.competitions[0].name !== undefined) {
				comp = <League {...this.props} competitions={this.props.competitions} />;
			}
			else {
				comp = <div className="center"><br /><br /><Preloader /></div>
			}
		}
		else if (this.props.match.url.search("results") !== -1)  {
			comp = <Results {...this.props} />;
		}
		else if (this.props.match.url.search("tables") !== -1)  {
			if (this.props.competitions !== undefined) {
				comp = <Tables {...this.props} competitions={this.props.competitions} />;
			}
		}
		else if (this.props.match.url.search("news") !== -1)  {
			if (this.props.news !== undefined) {
				comp = <News {...this.props} news={this.props.news} />;
			}
			else {
				comp = <div className="center"><br /><br /><Preloader /></div>
			}
		}
		else if (this.props.match.url === '/') {
			if (this.props.news !== undefined) {
				comp = <FrontPage news={this.props.news} />;
			}
			else {
				comp = <div className="center"><br /><br /><Preloader /></div>
			}
		}

		return <React.Fragment>
			<header>
				<nav className="top-nav-color top-nav z-depth-0 white-text hide-on-med-and-down">
					<div className="nav-wrapper container">
						<ul className="left hide-on-med-and-down">
                            <li><a href="#!"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#!"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#!"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#!"><i className="fab fa-youtube"></i></a></li>
                            <li><a href="#!">Contact Us</a></li>
                            <li><a href="#!">Donations</a></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="#!" className="white-text">
                            	Currency <span className="top-gold-color">USD</span></a>
                            </li>
                            <li><a href="#!" className="white-text"><span className="top-gold-color">
                            	Sign Up</span> or Login</a>
                            </li>
                        </ul>
					</div>
				</nav>
				<nav className="grey-text text-darken-1 white z-depth-1 middle-nav">
					<div className="nav-wrapper container">
						<Link to="/" className="left grey-text text-darken-1 cover-img">
							<img className="cover" src={require(`../images/images/logo.png`)} alt="BW Footbal club logo" />
						</Link>
						<ul className="left grey-text text-darken-1">
							<li><Link to="/" className="grey-text text-darken-1">BW FOOTBALL CLUB</Link></li>
						</ul>
						<ul className="right grey-text text-darken-1 hide-on-large-only">
							<li><a href="#!" data-target="slide-out" className="sidenav-trigger grey-text text-darken-1 logo-text"><i className="material-icons">menu</i></a></li>
						</ul>
						<ul className="right hide-on-med-and-down grey-text text-darken-1">
          					<li><Link to="/" className="grey-text text-darken-1">HOME</Link></li>
          					<li><Link to="/results" className="grey-text text-darken-1">RESULTS</Link></li>
          					<li><Link to="/tables" className="grey-text text-darken-1">TABLES</Link></li>
          					<li><Link to="#!" className="grey-text text-darken-1">TIPS</Link></li>
          					<li><Link to="#!" className="grey-text text-darken-1">FEATURES</Link></li>
          					<li><Link to="#!" className="grey-text text-darken-1">ABOUT</Link></li>
        				</ul>
					</div>
				</nav>
				<CategoryNavigation {...this.props} />
			</header>
			<main>
				{comp}
				<ul id="slide-out" className="sidenav">
				    <li><Link to="/" className="grey-text text-darken-1 sidenav-close">HOME</Link></li>
					<li><Link to="/results" className="grey-text text-darken-1 sidenav-close">RESULTS</Link></li>
					<li><Link to="/tables" className="grey-text text-darken-1 sidenav-close">TABLES</Link></li>
				</ul>
			</main>
			<footer className="page-footer">
				<div className="container">
					<div className="row">
						<div className="col s12">
							<p className="white-text"><span className="footer-headline">Never miss the action from your winning team</span>
							<span className="right hide-on-med-and-down"><a href="#!" className="btn waves-effect waves-light explore-btn grey-text text-darken-4">Explore More <i className="material-icons right">chevron_right</i></a></span></p>
							<p className="hide-on-large-only"><span className=""><a href="#!" className="btn waves-effect waves-light explore-btn grey-text text-darken-4">Explore More <i className="material-icons right">chevron_right</i></a></span></p>
						</div>
					</div>
				</div>
				<div className="more-links">
				<br />
				<div className="row container">
					<div className="col l2 s6">
						<h6 className="white-text">ABOUT US</h6>
		                <ul>
		                  <li><a className="grey-text text-lighten-3" href="#!">Latest News</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Players Room</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Media Gallery</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Feedback</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Contact Us</a></li>
		                </ul>
					</div>
					<div className="col l2 s6">
						<h6 className="white-text">INFORMATION</h6>
		                <ul>
		                  <li><a className="grey-text text-lighten-3" href="#!">Olympics</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">FIFA 2019</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">NFL 2019</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">NBA 2019</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Boxing</a></li>
		                </ul>
					</div>
					<div className="col l2 s6">
						<h6 className="white-text">SUPPORT</h6>
		                <ul>
		                  <li><a className="grey-text text-lighten-3" href="#!">Terms and Conditions</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Privacy Policy</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Sitemap</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">FAQ</a></li>
		                  <li><a className="grey-text text-lighten-3" href="#!">Account</a></li>
		                </ul>
					</div>
					<div className="col l6 s12">
						<div className="right-pic">
							<img className="cover" src={require(`../images/images/logo.png`)} alt="BW Footbal club logo" /> 
							<span className="footer-web-name">BW FOOTBALL CLUB</span>
						</div>
					</div>
				</div>
				<div className="footer-copyright">
           			<div className="container">
            			<strong>© All rights reserved {yyyy}</strong>
            			<a className="grey-text text-darken-4 right hide-on-med-and-down" href="#!"><strong>Follow us: &nbsp; </strong> 
            				<i className="fab fa-facebook-f"></i>&nbsp; &nbsp;<i className="fab fa-youtube"></i>&nbsp; 
            				&nbsp;<i className="fab fa-twitter"></i>&nbsp; &nbsp;<i className="fab fa-instagram"></i></a>

            			<a className="white-text hide-on-large-only" href="#!"><br /><br /><strong>Follow us: &nbsp; </strong> 
            				<i className="fab fa-facebook-f"></i>&nbsp; &nbsp;<i className="fab fa-youtube"></i>&nbsp; 
            				&nbsp;<i className="fab fa-twitter"></i>&nbsp; &nbsp;<i className="fab fa-instagram"></i></a>
            		</div>
          		</div>
          		</div>
			</footer>
		</React.Fragment>
	}

	componentDidMount() {
		let elems = document.querySelectorAll('.sidenav');
		let options = {edge: "right"};
    	M.Sidenav.init(elems, options);
	}
}