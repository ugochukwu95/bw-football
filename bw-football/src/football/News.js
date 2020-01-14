import React, {Component} from "react";
import { DataTypes } from "../data/Types";
import {Link} from "react-router-dom";

export class News extends Component {
	render() {
		let localDate, days, months, day, month, vdate, yyyy;

		let id = this.props.match && this.props.match.params.newsId;
		let newsDetails = this.props.news && this.props.news.find((obj) => obj.id === Number(id));
		let relatedNews = this.props.news && this.props.news.filter((obj) => obj.id !== Number(id) && obj.image !== null).slice(0, 4);
		if (newsDetails !== undefined) {
			localDate = new Date(Date.parse(newsDetails.datePosted));
			days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
				"October", "November", "December"];

			day = days[localDate.getDay()];
			month = months[localDate.getMonth()];
			vdate = localDate.getDate();
			yyyy = localDate.getFullYear();
		}

		return <div className=""> 
			<div className="row">
				<div className="col l10 offset-l1 s12">
					<div className="card white">
						<div className="card-content grey-text text-darken-1">
							<h5>
								<blockquote>
						        	<strong>{newsDetails.title}</strong>
						    	</blockquote>
						    </h5>
						    <p>
				        		{`Date published: ${day && day} ${vdate && vdate}th ${month && month} ${yyyy}`}
				        	</p>
				        	<br />
						    {newsDetails.image && <div className="center">
						    	<img className="responsive-img" 
						    	src={require(`../images/front-page-images/${newsDetails.image}`)} alt={newsDetails.title} />
						    	</div>}
						    <br />
						    <p className="flow-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id venenatis a condimentum vitae sapien pellentesque habitant. Massa enim nec dui nunc mattis enim ut tellus. In ornare quam viverra orci sagittis eu volutpat odio. Ultrices vitae auctor eu augue ut. Morbi blandit cursus risus at ultrices mi. Venenatis cras sed felis eget velit aliquet sagittis id. Faucibus pulvinar elementum integer enim neque volutpat. Diam vulputate ut pharetra sit amet aliquam id. Risus nec feugiat in fermentum. Neque viverra justo nec ultrices dui sapien eget. Diam volutpat commodo sed egestas egestas fringilla. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Curabitur vitae nunc sed velit. Facilisi cras fermentum odio eu. Tortor condimentum lacinia quis vel eros donec ac. Arcu non sodales neque sodales ut etiam sit amet nisl. In hendrerit gravida rutrum quisque non tellus. Porta non pulvinar neque laoreet suspendisse interdum.</p><br />
						    <p className="flow-text">Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Cursus mattis molestie a iaculis at erat pellentesque. Et tortor at risus viverra adipiscing at in tellus integer. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. In iaculis nunc sed augue lacus viverra vitae congue eu. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Senectus et netus et malesuada fames ac turpis egestas. A condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Pellentesque habitant morbi tristique senectus et netus et. Etiam non quam lacus suspendisse faucibus interdum posuere lorem. Placerat orci nulla pellentesque dignissim enim sit. A diam sollicitudin tempor id eu. Vel risus commodo viverra maecenas accumsan lacus vel. Quis lectus nulla at volutpat diam ut venenatis tellus in. Sodales neque sodales ut etiam sit amet nisl purus. Sed blandit libero volutpat sed cras ornare. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget.</p><br />
						    <p className="flow-text">Lectus urna duis convallis convallis tellus id. Morbi enim nunc faucibus a pellentesque. Ac tortor vitae purus faucibus ornare suspendisse. Turpis massa tincidunt dui ut ornare lectus. Purus in mollis nunc sed id semper risus in. Facilisis sed odio morbi quis commodo odio aenean sed. Ut ornare lectus sit amet est. Sed faucibus turpis in eu mi bibendum neque egestas congue. Molestie nunc non blandit massa enim nec dui nunc mattis. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Cras semper auctor neque vitae tempus quam pellentesque. Congue nisi vitae suscipit tellus.</p>
					    </div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col l10 offset-l1 s12">
					<h5 className="center grey-text text-darken-1"><strong>Related News</strong></h5>
					<br />
					<div className="container">
					<div className="flex-container">
					{relatedNews.map((obj) => {
						return <div className="flex-item" key={obj.id}>
							<Link to={`/news/${obj.title.replace(/\s+/g, '-').toLowerCase()}/${obj.id}`}>
								<div className="card white">
									<div className="card-image">
										<img className="responsive-img" src={require(`../images/front-page-images/${obj.image}`)} 
											alt={obj.id} />
											 
									</div>
									<div className="card-content black white-text">
										<p>{(obj.title).substring(0,100)}</p>
									</div>
								</div>
							</Link>
						</div>
					})}
					</div>
					</div>
				</div>
			</div>
		</div>
	}

	componentDidMount() {
		this.props.loadData(DataTypes.NEWS);
	}
}