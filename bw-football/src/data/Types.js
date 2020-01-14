export const DataTypes = {
	COMPETITIONS: "competitions",
	STANDINGS: "standings",
	TEAMS: "teams",
	MATCHES: "matches",
	TEAMCREST: "teamcrest",
	TABLESTATE: "tablestate",
	SCORERS: "scorers",
	RESULTS: "results",
	NEWS: "news"
}

export const ActionTypes = {
	DATA_LOAD: "data_load", 
	COMP_DATA_LOAD: "comp_data_load",
	MATCHES_DATA_LOAD: "matches_data_load",
	TEAMS_DATA_LOAD: "teams_data_load",
	TEAMCREST_DATA_LOAD: "teamcrest_data_load",
	TOP_SCORERS_DATA_LOAD: "top_scorers_data_load",
	RESULTS_DATA_LOAD: "results_data_load",
	NEXT_TABLE_CLICK: "next_table_click",
	PREVIOUS_TABLE_CLICK: "previous_table_click",
	RESET_TABLE_STATE: "reset_table_state",
	PREVIOUS_FIXTURE_CLICK: "previous_fixture_click",
	NEXT_FIXTURE_CLICK: "next_fixture_click"
}