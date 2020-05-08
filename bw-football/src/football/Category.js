import React, {Component} from "react";
import {Link} from "react-router-dom";
import { DataTypes } from "../data/Types";
import {cleanUrlText} from "./cleanUrlText";
import {Preloader} from "./Preloader";
import ReactTimeAgo from 'react-time-ago';
import {Menu} from "./Menu";
import {DesktopMenu} from "./DesktopMenu";

export class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			page: 1,
			pages: null
		}
	}

	handleOnScroll = (event) => {
		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  		let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
 		let clientHeight = document.documentElement.clientHeight || window.innerHeight;
  		let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 300);

  		if (scrolledToBottom) {
  			if (Number(this.state.page) === Number(this.state.pages)) {
  				this.setState({loading: false});
  				return;
  			}

  			this.setState({loading: true, page: Number(this.state.page) + 1}, () => this.props.loadNewsCategory(DataTypes.NEWS_CATEGORY, {category: decodeURIComponent(this.props.match.params.title), page: Number(this.state.page)}));
  		}
	}

	render() {
		return <React.Fragment>
			{
				this.props.match && <div className="hide-on-med-and-down container">
					<br /><br />
					<div className="card-panel white z-depth-0 ugHeader">
						<h4 className="grey-text text-darken-2">{decodeURIComponent(this.props.match.params.title)}</h4>
					</div>
					<DesktopMenu {...this.props} title="Home" title="Category" />
				</div>
			}
			{
				this.props.news_category && <React.Fragment>
					<div className="hide-on-large-only">
						<div className="card-panel white z-depth-0 ugHeader">
							<h5 className="grey-text text-darken-2">{decodeURIComponent(this.props.match.params.title)}</h5>
						</div>
						<Menu {...this.props} title="Category" match={this.props.match} />
						<div className="white">
							<br />
							<table className="ugLatestTable">
								<tbody>
									{
										this.props.news_category.data.map(obj => <tr key={obj._id}>
											<td className="ugLatestImageRow">
												<Link to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
													<img className="lazy responsive-img" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={obj.thumbnail} data-srcset={`${obj.thumbnail || `/unavailable-image.jpg`} 1x`} alt={obj.title} />
												</Link>
											</td>
											<td>
												<span className="grey-text text-darken-2"><ReactTimeAgo date={Date.parse(obj.pubDate)}/></span>
												<br />
												<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
													<strong>{obj.title}</strong>
												</Link>
											</td>
										</tr>)
									}
								</tbody>
							</table>
							<br />
						</div>
					</div>

					<div className="hide-on-med-and-down container">
						

						<div className="white container">
							<div className="divider"></div>
							<table className="ugLatestTable">
								<tbody>
									{
										this.props.news_category.data.map(obj => <tr key={obj._id}>
											<td className="ugLatestImageRow">
												<Link to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
													<img className="lazy responsive-img" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={obj.thumbnail} data-srcset={`${obj.thumbnail || `/unavailable-image.jpg`} 1x`} alt={obj.title} />
												</Link>
											</td>
											<td>
												<span>
													<Link className="blue-text catItemLink" to={`/category/${obj.category}`}>{obj.category}</Link>
												</span> &nbsp; 
												<span className="grey-text text-darken-2"><ReactTimeAgo date={Date.parse(obj.pubDate)}/></span>
												<br />
												<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
													<strong className="black-text ugLatestTitle">{obj.title}</strong>
													<br />
													<strong>{obj.description.length < 100 ? obj.description : obj.description.substring(0, 100) + " ..."}</strong>
												</Link>
											</td>
										</tr>)
									}
								</tbody>
							</table>
							<br />
						</div>
					</div>
				</React.Fragment>
			}

			{
				(!this.props.news_category) && <div className="center">
					<br /><br />
					<Preloader />
					<br /><br />
				</div>
			}

			{
				(this.state.loading) && <div className="center">
					<br /><br />
					<Preloader />
					<br /><br />
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {
		// get category news
		this.props.clearData && this.props.clearData(DataTypes.NEWS_CATEGORY);
		(!this.props.news_category && this.props.loadNewsCategory) && this.props.loadNewsCategory(DataTypes.NEWS_CATEGORY, {category: decodeURIComponent(this.props.match.params.title)});
		(this.props.news_category && !this.props.news_category.data.error) && this.setState({page: Number(this.props.news_category.page), pages: Number(this.props.news_category.pages)});

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

		// Create scroll event
		window.addEventListener('scroll', this.handleOnScroll);

		// Scroll to top 
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.news_category !== undefined && prevProps.news_category !== null) && prevProps.news_category !== this.props.news_category) {
			(!this.props.news_category && this.props.loadNewsCategory) && this.props.loadNewsCategory(DataTypes.NEWS_CATEGORY, {category: decodeURIComponent(this.props.match.params.title)});
		}

		if (prevProps.match.params.title !== this.props.match.params.title) {
			this.props.clearData && this.props.clearData(DataTypes.NEWS_CATEGORY);
			(!this.props.news_category && this.props.loadNewsCategory) && this.props.loadNewsCategory(DataTypes.NEWS_CATEGORY, {category: decodeURIComponent(this.props.match.params.title)});
		}

		if (prevProps.news_category !== this.props.news_category) {
			(this.props.news_category && !this.props.news_category.data.error) && this.setState({page: Number(this.props.news_category.page), pages: Number(this.props.news_category.pages)});
		}

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

		// Create scroll event
		window.addEventListener('scroll', this.handleOnScroll);
	}
}