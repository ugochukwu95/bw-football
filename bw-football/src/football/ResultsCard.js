import React from "react";

export function ResultsCard(props) {
	return (<div className="row">
			<div className="col s12">
				<br />
				<h6 className="center grey-text text-darken-2"><strong>{props.name}</strong></h6><br />
				<div className="card white">
					<div className="card-content grey-text text-darken-1">
						<table className="fixture-table">
							<tbody>
								{props.matchesArray && props.matchesArray.map((obj) => {
									let localDate = new Date(obj.utcDate);
									let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
									var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

									let day = days[localDate.getDay()];
									let month = months[localDate.getMonth()];
									let vdate = localDate.getDate();
									let hour = localDate.getHours();
									let minute = localDate.getMinutes();
									if (minute === 0) {
										minute = "00";
									}

									return <tr key={obj.id}>
										<td className={`truncate ${((obj.status === "FINISHED") && (obj.score.winner === "HOME_TEAM")) ? "winner_bold" : ""}`}>
											{obj.homeTeam.name}
										</td>
										{(obj.status === "FINISHED") ? (<td colSpan="3" className="center center-column">{`${obj.score.fullTime.homeTeam} : ${obj.score.fullTime.awayTeam}`}</td>) : 
											<td className="center center-column" colSpan="3">{`${day}, ${vdate}/${month} ${hour}:${minute}`}</td>}
										<td className={`${((obj.status === "FINISHED") && (obj.score.winner === "AWAY_TEAM")) ? "winner_bold" : ""} truncate alnright`}>
											{obj.awayTeam.name}
										</td>
									</tr>
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>)
}