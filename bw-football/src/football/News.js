import React, {Component} from "react";
import {Link} from "react-router-dom";
import { DataTypes } from "../data/Types";
import {cleanUrlText} from "./cleanUrlText";
import {Preloader} from "./Preloader";
import ReactTimeAgo from 'react-time-ago';
import {Menu} from "./Menu";
import {DesktopMenu} from "./DesktopMenu";

const Entities = require('html-entities').XmlEntities;
 
const entities = new Entities();

export class News extends Component {

	handleClear = () => {
		this.props.clearData && this.props.clearData(DataTypes.NEWS_DETAILS);
		this.props.clearData && this.props.clearData(DataTypes.NEWS_RELATED);
	}
	render() {
		(this.props.news_details && !this.props.news_related && this.props.loadNewsRelated) && this.props.loadNewsRelated(DataTypes.NEWS_RELATED, {category: this.props.news_details['category']});
		return <React.Fragment> 
			{
				this.props.news_details && <React.Fragment>
					<div className="hide-on-large-only">
						<Link className="grey-text text-darken-2" to={`/category/${this.props.news_details.category}`}>
							<div className="card-panel white z-depth-0 ugHeader">
								<h5 className="grey-text text-darken-2">{this.props.news_details.category}</h5>
							</div>
						</Link>
						<Menu {...this.props} title="News" />
						<div className="white">
							<div className="card white z-depth-0">
								<div className="card-content white ugFrontContentCard">
									<h1 className="ugArticleTitle black-text text-darken-2">
										<strong>{this.props.news_details.title}</strong>
									</h1>
									<p className="grey-text text-darken-2">
										Last Updated: <ReactTimeAgo date={Date.parse(this.props.news_details.pubDate)}/>
									</p>
									<br />
									<img className="responsive-img" src={this.props.news_details.thumbnail} alt={this.props.news_details.title} />
									<br /><br />
									<p className="grey-text text-darken-2 flow-text">
										{entities.decode(this.props.news_details.description)}
									</p>
									<br /><br />
									<p className="grey-text text-darken-2">
										<a href={this.props.news_details.link} target="_blank" rel="noopener noreferrer" className="blue-text">Read more at {this.props.news_details.source}</a>
									</p>
									<br />
									<div className="divider"></div>
									<br />

									{
										(this.props.news_related && !(this.props.news_related.docs.length < 2)) && <div>
											<h6 className="grey-text text-darken-2">Also See</h6>
											<table>
												<tbody>
													{
														this.props.news_related.docs.filter(item => item._id !== this.props.news_details['_id']).slice(0,5).map(obj => <tr key={obj._id}>
																<td className="grey-text text-darken-2">></td>
																<td>
																	<Link onClick={this.handleClear} className="grey-text text-darken-2" to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
																		<strong>{obj.title}</strong>
																	</Link>
																</td>
															</tr>)
													}
												</tbody>
											</table>
										</div>
									}

									{
										!this.props.news_related && <div className="center">
											<br /><br />
											<Preloader />
											<br /><br />
										</div>
									}
								</div>
							</div>
						</div>
					</div>


					<div className="hide-on-med-and-down container">
						<br /><br />
						<Link className="grey-text text-darken-2" to={`/category/${this.props.news_details.category}`}>
							<div className="card-panel white z-depth-0 ugHeader">
								<h4 className="grey-text text-darken-2">{this.props.news_details.category}</h4>
							</div>
						</Link>
						<DesktopMenu {...this.props} title="Home" title="Category" />

						<div className="white">
							<div className="card white z-depth-0">
								<div className="card-content white ugFrontContentCard">
									<h1 className="ugArticleTitle black-text text-darken-2">
										<strong>{this.props.news_details.title}</strong>
									</h1>
									<p className="grey-text text-darken-2">
										Last Updated: <ReactTimeAgo date={Date.parse(this.props.news_details.pubDate)}/>
									</p>
									<br />
									<img className="responsive-img" src={this.props.news_details.thumbnail} alt={this.props.news_details.title} />
									<br /><br />
									<p className="grey-text text-darken-2 flow-text">
										{entities.decode(this.props.news_details.description)}
									</p>
									<br /><br />
									<p className="grey-text text-darken-2">
										<a href={this.props.news_details.link} target="_blank" rel="noopener noreferrer" className="blue-text">Read more at {this.props.news_details.source}</a>
									</p>
									<br />
									<div className="divider"></div>
									<br />

									{
										(this.props.news_related && !(this.props.news_related.docs.length < 2)) && <div>
											<h6 className="grey-text text-darken-2">Also See</h6>
											<table>
												<tbody>
													{
														this.props.news_related.docs.filter(item => item._id !== this.props.news_details['_id']).slice(0,5).map(obj => <tr key={obj._id}>
																<td className="grey-text text-darken-2">></td>
																<td>
																	<Link onClick={this.handleClear} className="grey-text text-darken-2" to={`/news/${cleanUrlText(obj.title)}/${obj._id}`}>
																		<strong>{obj.title}</strong>
																	</Link>
																</td>
															</tr>)
													}
												</tbody>
											</table>
										</div>
									}

									{
										!this.props.news_related && <div className="center">
											<br /><br />
											<Preloader />
											<br /><br />
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			}

			{
				(!this.props.news_details) && <div className="center">
					<br /><br />
					<Preloader />
					<br /><br />
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {
		// I prefer showing the loading spinner than an earlier document
		this.props.clearData && this.props.clearData(DataTypes.NEWS_DETAILS);
		(this.props.match && !this.props.news_details && this.props.loadNewsDetails) && this.props.loadNewsDetails(DataTypes.NEWS_DETAILS, {newsId: this.props.match.params['newsId']});

		// GET related articles
		this.props.clearData && this.props.clearData(DataTypes.NEWS_RELATED);
		(this.props.news_details && !this.props.news_related && this.props.loadNewsRelated) && this.props.loadNewsRelated(DataTypes.NEWS_RELATED, {category: this.props.news_details['category']});
		
	}

	componentDidUpdate(prevProps) {
		if ((prevProps.news_details !== undefined && prevProps.news_details !== null) && prevProps.news_details !== this.props.news_details) {
			(this.props.match && !this.props.news_details && this.props.loadNewsDetails) && this.props.loadNewsDetails(DataTypes.NEWS_DETAILS, {newsId: this.props.match.params['newsId']});
			(this.props.news_details && !this.props.news_related && this.props.loadNewsRelated) && this.props.loadNewsRelated(DataTypes.NEWS_RELATED, {category: this.props.news_details['category']});
		}

		if (prevProps.match.params.newsId !== this.props.match.params.newsId) {
			this.props.clearData && this.props.clearData(DataTypes.NEWS_RELATED);
			this.props.clearData && this.props.clearData(DataTypes.NEWS_DETAILS);
		}
	}
}