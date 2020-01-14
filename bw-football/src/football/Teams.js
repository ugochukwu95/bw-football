import React, {Component} from "react";

export class Teams extends Component {
	render() {
		let teamsArray;
		
		if (this.props.teams) {
			teamsArray = this.props.teams.teams;
		}
		return <div className="row">
			<div className="col l10 offset-l1 s12">
			<br />
				<div className="card white">
					<div className="card-content grey-text text-darken-1">
						<ul className="collection">
							{teamsArray && teamsArray.map((obj) => {
								/*let checkCrest;
								if (obj.crestUrl === null) {
									checkCrest = 
								}*/
								return  <li className="collection-item avatar" key={obj.id}>
									{(obj.crestUrl === null) ? (<i className="material-icons circle">stars</i>) : (
										<img src={obj.crestUrl} alt="" className="circle" />)}
									<span className="title"><strong>{obj.name}</strong></span>
							        <p>{(obj.founded) ? `Founded: ${obj.founded}` : "Founded: Nothing to show"} <br />
							         {(obj.venue) ? `Stadium: ${obj.venue}` : "Stadium: Nothing to show"} <br />
							         {(obj.address) ? `Address: ${obj.address}` : "No Address to show"} <br />
							         {(obj.phone) ? `Phone: ${obj.phone}` : "No mobile contact info"} <br />
							         {(obj.email) ? `Email: ${obj.email}` : "No email contact info"}  <br />
							         {(obj.clubColors) ? `Club Colors: ${obj.clubColors}` : "Club Colors: Nothing to show"} <br />
							        </p>
								</li>
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	}
}