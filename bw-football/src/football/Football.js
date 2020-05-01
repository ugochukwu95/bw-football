import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FrontPage} from "./FrontPage";
import { League } from "./League";
import { Results } from "./Results";
import { Tables } from "./Tables";
import { Fixture } from "./Fixture";
import {News} from "./News";
import M from 'materialize-css';
import {Latest} from "./Latest";
import {Category} from "./Category";
import {Preloader} from "./Preloader";
import { DataTypes } from "../data/Types";
import ReactTimeAgo from 'react-time-ago';
import {cleanUrlText} from "./cleanUrlText";

export class Football extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchField: "",
			loading: false,
			page: 1,
			pages: 1,
			sortByDate: false
		}
	}

	handleSearch = ev => {
		this.setState({[ev.target.name]: ev.target.value, loading: true, page: 1, pages: 1}, () => {
			this.props.clearData && this.props.clearData(DataTypes.SEARCH_RESULTS);
			(this.props.loadSearchResults) && this.props.loadSearchResults(DataTypes.SEARCH_RESULTS, {searchString: this.state.searchField, page: Number(this.state.page)})
		});
	}

	openReviews = (ev) => {
		ev.preventDefault();
		document.getElementById("myProductReviewsNav").style.width = "100%";
		document.body.style.overflow = "hidden";
	}

	closeNav = (ev) => {
		ev.preventDefault();
		this.setState({loading: false});
		document.body.style.overflow = "auto";
		document.getElementById("myProductReviewsNav").style.width = "0";
	}

	closeAndNavigate = (item, id) => ev => {
		this.closeNav(ev);
		this.props.history && this.props.history.push(`/news/${item}/${id}`)
	}

	handleSortByDate = ev => {
		ev.preventDefault();
		this.setState({sortByDate: !this.state.sortByDate}, () => {
			if (this.state.sortByDate) {
				this.props.sortDataByDate && this.props.sortDataByDate(DataTypes.SEARCH_RESULTS);
			}
		});
	}


	render() {
		let comp;
		if (this.props.match.path === "/league/:name/:id")  {
			comp = <League {...this.props} />;
		}
		else if (this.props.match.path === "/results/:league?/:clubId?")  {
			comp = <Results {...this.props} />;
		}
		else if (this.props.match.path === "/tables/:league?")  {
			comp = <Tables {...this.props} />;
		}
		else if (this.props.match.path === "/news/:title/:newsId")  {
			comp = <News {...this.props} />;
		}
		else if (this.props.match.path ===  "/latest") {
			comp = <Latest {...this.props} />;
		}
		else if (this.props.match.path ===  "/category/:title") {
			comp = <Category {...this.props} />;
		}
		else if (this.props.match.path === "/") {
			comp = <FrontPage {...this.props} />;
		}
		else if (this.props.match.path === "/fixtures/:league?/:clubId?") {
			comp = <Fixture {...this.props} />
		}

		return <React.Fragment>
			<header>
				<div className="navbar-fixed">
					<nav className="white-text red darken-1">
						<div className="nav-wrapper">
							<ul className="left white-text">
								<li><Link to="/" className="white-text logoFont ugPageName">BWSPORTS</Link></li>
							</ul>
							<ul className="right white-text">
								<li><a href="#!" onClick={this.openReviews} className="white-text"><i className="fas fa-search"></i></a></li>
							</ul>
						</div>
					</nav>
				</div>
				{/*<CategoryNavigation {...this.props} />*/}
			</header>
			<main>
				{comp}


				<div id="myProductReviewsNav" className="myProductDetailsNav white">
					<div className="row">
						<div className="col s12">
							<p>
								<a href="#!" className="closebtn sec-color right" onClick={this.closeNav}>Back</a>
							</p>
							<input type="text" name="searchField" className="browser-default searchField" value={this.state.searchField} onChange={this.handleSearch} placeholder="Search news articles, headlines and more ..." />
							
							{
								(this.props.search_results && this.props.search_results.data && !this.props.search_results.data.error) && <React.Fragment>
									<div className="white">
										{
											(this.props.search_results.data.length > 1) && <p>
												<button onClick={this.handleSortByDate} className={`btn sortBtn ${(this.state.sortByDate) ? "disabled" : "indigo darken-4 white-text"}`}>Sort by date</button>
											</p>
										}
										<br />
										<table className="ugLatestTable">
											<tbody>
												{
													this.props.search_results.data.map(obj => <tr key={obj._id}>
														<td className="ugLatestImageRow">
															<Link onClick={this.closeAndNavigate(cleanUrlText(obj.title), obj._id)} to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
																<img className="lazy responsive-img" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={obj.thumbnail} data-srcset={`${obj.thumbnail || `/unavailable-image.jpg`} 1x`} alt={obj.title} />
															</Link>
														</td>
														<td>
															<span className="grey-text text-darken-2"><ReactTimeAgo date={Date.parse(obj.pubDate)}/></span>
															<br />
															<Link onClick={this.closeAndNavigate(cleanUrlText(obj.title), obj._id)} className="grey-text text-darken-2" to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
																<strong>{obj.title}</strong>
															</Link>
														</td>
													</tr>)
												}
											</tbody>
										</table>
										<br />
									</div>
								</React.Fragment>
							}

							{
								(this.state.loading && !this.props.search_results) && <React.Fragment>
									<div className="center">
										<br /><br />
										<Preloader />
										<br /><br />
									</div>
								</React.Fragment>
							}

							{
								(this.props.search_results && !this.props.search_results.error && this.props.search_results.data.length === 0) && <div className="row">
									<div className="col s12 container">
									<br />
									<div className="card-panel center white-text">
										<h3 className="grey-text text-darken-2">:(</h3>
											<p className="grey-text text-darken-2">No search results.</p>
									</div>
									</div>
								</div>
							}
						</div>
					</div>
				</div>

				<br /><br />
			</main>
			<footer>
				<a href="https://ugooguejiofor.herokuapp.com/" rel="noopener noreferrer" target="_blank" className="white-text">
					<div className="card-content indigo darken-4 ugFrontContentCard">
						<span className="white-text">Built by Ugo</span> <span className="right white-text"> Find me &nbsp; <i className="fas fa-angle-right"></i></span>
					</div>
				</a>
			</footer>
		</React.Fragment>
	}

	componentDidMount() {
		let elems = document.querySelectorAll('.sidenav');
		let options = {edge: "right"};
    	M.Sidenav.init(elems, options);

    	var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

		  if ("IntersectionObserver" in window) {
		    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
		      entries.forEach(function(entry) {
		        if (entry.isIntersecting) {
		          let lazyImage = entry.target;
		          lazyImage.src = lazyImage.dataset.src;
		          lazyImage.srcset = lazyImage.dataset.srcset;
		          lazyImage.classList.remove("lazy");
		          lazyImageObserver.unobserve(lazyImage);
		        }
		      });
		    });

		    lazyImages.forEach(function(lazyImage) {
		      lazyImageObserver.observe(lazyImage);
		    });
		  } else {
		    // Possibly fall back to a more compatible method here
		    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
			  let active = false;

			  const lazyLoad = function() {
			    if (active === false) {
			      active = true;

			      setTimeout(function() {
			        lazyImages.forEach(function(lazyImage) {
			          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
			            lazyImage.src = lazyImage.dataset.src;
			            lazyImage.srcset = lazyImage.dataset.srcset;
			            lazyImage.classList.remove("lazy");

			            lazyImages = lazyImages.filter(function(image) {
			              return image !== lazyImage;
			            });

			            if (lazyImages.length === 0) {
			              document.removeEventListener("scroll", lazyLoad);
			              window.removeEventListener("resize", lazyLoad);
			              window.removeEventListener("orientationchange", lazyLoad);
			            }
			          }
			        });

			        active = false;
			      }, 200);
			    }
			  };

			  document.addEventListener("scroll", lazyLoad);
			  window.addEventListener("resize", lazyLoad);
			  window.addEventListener("orientationchange", lazyLoad);
		  }

	}

	componentDidUpdate(prevProps) {
		let elemss = document.querySelectorAll('.sidenav');
		let optionss = {edge: "right"};
    	M.Sidenav.init(elemss, optionss);

    	var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

		  if ("IntersectionObserver" in window) {
		    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
		      entries.forEach(function(entry) {
		        if (entry.isIntersecting) {
		          let lazyImage = entry.target;
		          lazyImage.src = lazyImage.dataset.src;
		          lazyImage.srcset = lazyImage.dataset.srcset;
		          lazyImage.classList.remove("lazy");
		          lazyImageObserver.unobserve(lazyImage);
		        }
		      });
		    });

		    lazyImages.forEach(function(lazyImage) {
		      lazyImageObserver.observe(lazyImage);
		    });
		  } else {
		    // Possibly fall back to a more compatible method here
		    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
			  let active = false;

			  const lazyLoad = function() {
			    if (active === false) {
			      active = true;

			      setTimeout(function() {
			        lazyImages.forEach(function(lazyImage) {
			          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
			            lazyImage.src = lazyImage.dataset.src;
			            lazyImage.srcset = lazyImage.dataset.srcset;
			            lazyImage.classList.remove("lazy");

			            lazyImages = lazyImages.filter(function(image) {
			              return image !== lazyImage;
			            });

			            if (lazyImages.length === 0) {
			              document.removeEventListener("scroll", lazyLoad);
			              window.removeEventListener("resize", lazyLoad);
			              window.removeEventListener("orientationchange", lazyLoad);
			            }
			          }
			        });

			        active = false;
			      }, 200);
			    }
			  };

			  document.addEventListener("scroll", lazyLoad);
			  window.addEventListener("resize", lazyLoad);
			  window.addEventListener("orientationchange", lazyLoad);
		  }
	}
}