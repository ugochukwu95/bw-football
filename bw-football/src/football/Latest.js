import React, {Component} from "react";
import {Preloader} from "./Preloader";
import ReactTimeAgo from 'react-time-ago';
import {Link} from "react-router-dom";
import { DataTypes } from "../data/Types";
import {cleanUrlText} from "./cleanUrlText";
import {Menu} from "./Menu";

export class Latest extends Component {
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

  			this.setState({loading: true, page: Number(this.state.page) + 1}, () => this.props.loadData(DataTypes.NEWS, {page: Number(this.state.page)}));
  		}
	}

	render() {
		return <React.Fragment>
			{
				this.props.news && <React.Fragment>
					<div className="card-panel white z-depth-0 ugHeader">
						<h5 className="grey-text text-darken-2">Football</h5>
					</div>
					<Menu {...this.props} title="Latest" match={this.props.match} />
					<div className="white">
						<br />
						<table className="ugLatestTable">
							<tbody>
								{
									this.props.news.data.map(obj => <tr key={obj._id}>
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
				</React.Fragment>
			}

			{
				(!this.props.news) && <div className="center">
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
		(!this.props.news && this.props.loadData) && this.props.loadData(DataTypes.NEWS);
		
		(this.props.news && !this.props.news.data.error) && this.setState({page: Number(this.props.news.page), pages: Number(this.props.news.pages)});

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
		if (prevProps.news !== this.props.news) {
			(this.props.news && !this.props.news.data.error) && this.setState({page: Number(this.props.news.page), pages: Number(this.props.news.pages)});
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