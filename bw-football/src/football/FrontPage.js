import React, {Component} from "react";
import {Link} from "react-router-dom";

export class FrontPage extends Component {
	render() {
		let mainNews = this.props.news && this.props.news.find((obj) => obj.display === 0);
		let subMainNews = this.props.news && this.props.news.filter((obj) => obj.display === 1);
		let headlines = this.props.news && this.props.news.filter((obj) => obj.display === 2);
		return <React.Fragment>
			<div className="container">
				<div className="row">
					<div className="col l7 s12">
						<Link to={`/news/${mainNews.title.replace(/\s+/g, '-').toLowerCase()}/${mainNews.id}`}>
							<div className="card white">
								<div className="card-image">
									<img className="responsive-img" src={require(`../images/front-page-images/${mainNews.image}`)} 
										alt={mainNews.id} />
										 <div className="text-block">
										    <p>{mainNews.title}</p>
										</div>
								</div>
								<div className="card-content black front-content-card white-text hide-on-large-only">
									<p>{mainNews.title}</p>
								</div>
							</div>
						</Link>
						<div className="row">
						{subMainNews.map((obj) => {
							return <div className="col s6" key={obj.id}>
								<Link to={`/news/${obj.title.replace(/\s+/g, '-').toLowerCase()}/${obj.id}`}>
									<div className="card  white">
										<div className="card-image">
											<img className="responsive-img" src={require(`../images/front-page-images/${obj.image}`)} 
										alt={obj.id} />
											<div className="text-block">
											    <p><small>{obj.title}</small></p>
											</div>
										</div>
										<div className="card-content front-content-card black white-text hide-on-large-only">
											<p><small>{obj.title}</small></p>
										</div>
									</div>
								</Link>
							</div>
						})}
						</div>
					</div>
					<div className="col l5 s12">
						<div className="card-panel white headline-panel">
							<p className="grey-text text-darken-1 center"><strong>Top Headlines</strong></p>
							<div className="divider"></div>
							<ul className="headlines">
								{headlines.map((obj) => {
									return <li key={obj.id}><Link to={`/news/${obj.title.replace(/\s+/g, '-').toLowerCase()}/${obj.id}`} className="grey-text text-darken-2">- {obj.title}</Link></li>
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	}
}