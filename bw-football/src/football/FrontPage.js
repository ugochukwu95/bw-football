import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import {cleanUrlText} from "./cleanUrlText";
import { DataTypes } from "../data/Types";
import {Preloader} from "./Preloader";
import {Menu} from "./Menu";
import {DesktopMenu} from "./DesktopMenu";

const Entities = require('html-entities').XmlEntities;
 
const entities = new Entities();

export class FrontPage extends Component {

	render() {
		let mainNews = this.props.news && this.props.news.data[0];
		let secondNews = this.props.news && this.props.news.data[1];
		let thirdNews = this.props.news && this.props.news.data[2];
		let fourthNews = this.props.news && this.props.news.data[3];
		let fifthNews = this.props.news && this.props.news.data[4];
		let theRest = this.props.news && this.props.news.data.filter((obj, index) => (index > 4 && index < 10));

		return <React.Fragment>
			<div className="hide-on-med-and-down container">
				<br /><br />
				<div className="card-panel white z-depth-0 ugHeader">
					<h4 className="grey-text text-darken-2"><Link to="/" className="grey-text text-darken-2">Football</Link></h4>
				</div>
				<DesktopMenu {...this.props} title="Home" />
			</div>
			{
				(this.props.news && !this.props.news.data.error) && <React.Fragment>
					<div className="card-panel white z-depth-0 ugHeader hide-on-large-only">
						<h5 className="grey-text text-darken-2">Football</h5>
					</div>
					<Menu {...this.props} title="Home" />
					<div className="white ugMainDiv hide-on-large-only">
						<div className="card white z-depth-0 ugFrontMainCard">
							<div className="card-image">
								<Link className="black-text text-darken-4" to={`/news/${cleanUrlText(mainNews.title)}/${mainNews._id}`}>
									<img className="responsive-img" src={mainNews.thumbnail} alt={mainNews.title} />
								</Link>
							</div>
							<div className="card-content white ugFrontContentCard">
								<p className="ugCardTitle black-text text-darken-4">
									<strong>
										<Link className="black-text text-darken-4" to={`/news/${cleanUrlText(mainNews.title)}/${mainNews._id}`}>
											{mainNews.title}
										</Link>
									</strong>
								</p>
								<br />
								<p className="">
									<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(mainNews.title)}/${mainNews._id}`}>
										{entities.decode(mainNews.description.substring(0, 250) + "...")}
									</Link>
								</p>
								<br />
								<table>
									<tbody>
										<tr>
											<td className="grey-text text-darken-2">></td>
											<td>
												<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(secondNews.title)}/${secondNews._id}`}>
													{secondNews.title}
												</Link>
											</td>
										</tr>
										<tr>
											<td className="grey-text text-darken-2">></td>
											<td>
												<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(thirdNews.title)}/${thirdNews._id}`}>
													{thirdNews.title}
												</Link>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="row">
							<div className="col s6">
								<div className="card white z-depth-0 ugFeaturedCard">
									<div className="card-image">
										<Link to={`/news/${cleanUrlText(fourthNews.title)}/${fourthNews._id}`}>
											<img className="responsive-img" src={fourthNews.thumbnail} alt={fourthNews.title} />
										</Link>
									</div>
									<div className="card-content">
										<span><ReactTimeAgo date={Date.parse(fourthNews.pubDate)}/></span>
										<h5>
											<Link className="black-text" to={`/news/${cleanUrlText(fourthNews.title)}/${fourthNews._id}`}>
												{fourthNews.title}
											</Link>
										</h5>
									</div>
								</div>
							</div>
							<div className="col s6">
								<div className="card white z-depth-0 ugFeaturedCard">
									<div className="card-image">
										<Link to={`/news/${cleanUrlText(fifthNews.title)}/${fifthNews._id}`}>
											<img className="responsive-img" src={fifthNews.thumbnail} alt={fifthNews.title} />
										</Link>
									</div>
									<div className="card-content">
										<span><ReactTimeAgo date={Date.parse(fifthNews.pubDate)}/></span>
										<h5>
											<Link className="black-text" to={`/news/${cleanUrlText(fifthNews.title)}/${fifthNews._id}`}>
												{fifthNews.title}
											</Link>
										</h5>
									</div>
								</div>
							</div>
						</div>
						<br />
						<Link to="/latest" className="white-text">
							<div className="card-content indigo darken-4 ugFrontContentCard">
								<span className="white-text">Latest</span> <span className="right white-text"> <i className="fas fa-angle-right"></i></span>
							</div>
						</Link>
						<br />
						<table className="ugLatestTable">
							<tbody>
								{
									theRest.map(obj => <tr key={obj._id}>
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

					<div className="hide-on-med-and-down container">
						<div className="row">
							<div className="col l8">
								<div className="card white z-depth-0 ugFrontMainCard">
									<div className="card-image">
										<Link className="black-text text-darken-4" to={`/news/${cleanUrlText(mainNews.title)}/${mainNews._id}`}>
											<img className="responsive-img" src={mainNews.thumbnail} alt={mainNews.title} />
										</Link>
									</div>
									<div className="card-content white ugFrontContentCard">
										<p className="ugCardTitle black-text text-darken-4">
											<strong>
												<Link className="black-text text-darken-4" to={`/news/${cleanUrlText(mainNews.title)}/${mainNews._id}`}>
													{mainNews.title}
												</Link>
											</strong>
										</p>
										<br />
										<p className="">
											<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(mainNews.title)}/${mainNews._id}`}>
												{entities.decode(mainNews.description.substring(0, 250) + "...")}
											</Link>
										</p>
									</div>
								</div>

								<div className="row">
									<div className="col s6">
										<div className="card white z-depth-0 ugFeaturedCard">
											<div className="card-image">
												<Link to={`/news/${cleanUrlText(fourthNews.title)}/${fourthNews._id}`}>
													<img className="responsive-img" src={fourthNews.thumbnail} alt={fourthNews.title} />
												</Link>
											</div>
											<div className="card-content">
												<span><ReactTimeAgo date={Date.parse(fourthNews.pubDate)}/></span>
												<h5>
													<Link className="black-text" to={`/news/${cleanUrlText(fourthNews.title)}/${fourthNews._id}`}>
														{fourthNews.title}
													</Link>
												</h5>
											</div>
										</div>
									</div>
									<div className="col s6">
										<div className="card white z-depth-0 ugFeaturedCard">
											<div className="card-image">
												<Link to={`/news/${cleanUrlText(fifthNews.title)}/${fifthNews._id}`}>
													<img className="responsive-img" src={fifthNews.thumbnail} alt={fifthNews.title} />
												</Link>
											</div>
											<div className="card-content">
												<span><ReactTimeAgo date={Date.parse(fifthNews.pubDate)}/></span>
												<h5>
													<Link className="black-text" to={`/news/${cleanUrlText(fifthNews.title)}/${fifthNews._id}`}>
														{fifthNews.title}
													</Link>
												</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col l4">
								<br />
								<table>
									<tbody>
										<tr>
											<td className="grey-text text-darken-2">></td>
											<td>
												<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(secondNews.title)}/${secondNews._id}`}>
													{secondNews.title}
												</Link>
											</td>
										</tr>
										<tr>
											<td className="grey-text text-darken-2">></td>
											<td>
												<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(thirdNews.title)}/${thirdNews._id}`}>
													{thirdNews.title}
												</Link>
											</td>
										</tr>
										{
											theRest.map(obj => <tr key={obj._id}>
												<td className="grey-text text-darken-2">></td>
												<td>
													<Link className="grey-text text-darken-2" to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
														<strong>{obj.title}</strong>
													</Link>
												</td>
											</tr>)
										}
									</tbody>
								</table>
							</div>
						</div>

					</div>
				</React.Fragment>
			}

			{
				!this.props.news && <div className="center">
					<br /><br />
					<Preloader />
					<br /><br />
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {
		(!this.props.news && this.props.loadData) && this.props.loadData(DataTypes.NEWS);

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

	componentDidUpdate() {
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