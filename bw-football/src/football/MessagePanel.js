import React from "react";

export function MessagePanel(props) {
	return <div className="row">
		<div className="col l6 offset-l3 m8 offset-m2 s12 center">
			<div className="card-panel grey lighten-4 center">
				<i className="material-icons center grey-text message-icon">{props.icon}</i>
				<br />
				<h5 className="grey-text text-darken-2 center">{props.message}</h5>
			</div>
		</div>
	</div>
}