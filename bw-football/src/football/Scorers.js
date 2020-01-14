import React, {Component} from "react";

export class Scorers extends Component {
	render() {
		let scorersArray;
		
		if (this.props.scorers) {
			scorersArray = this.props.scorers.scorers;
		}

		return <div className="row">
			<div className="col l10 offset-l1 s12">
			<br />
				<div className="card white">
					<div className="card-content">
						<p><strong>Goals</strong></p><br />
						<table className="standings">
							<thead>
								<tr>
									<th className="grey-text">Player</th>
									<th className="grey-text alnright">Goals</th>
								</tr>
							</thead>
							<tbody>
								{scorersArray && scorersArray.map((obj, index) => {
									return <tr key={obj.player.id}>
										<td>{obj.player.name} <br /><small>{obj.team.name}</small></td>
										<td className="alnright">{obj.numberOfGoals}</td>
									</tr>
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	}
}