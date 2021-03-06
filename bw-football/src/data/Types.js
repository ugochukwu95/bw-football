export const DataTypes = {
	COMPETITIONS: "competitions",
	STANDINGS: "standings",
	TEAMS: "teams",
	MATCHES: "matches",
	CATEGORIES: "categories",
	SEARCH_RESULTS: "search_results",
	TEAMCREST: "teamcrest",
	TABLESTATE: "tablestate",
	SCORERS: "scorers",
	RESULTS: "results",
	NEWS: "news",
	NEWS_DETAILS: "news_details",
	NEWS_RELATED: "news_related",
	NEWS_CATEGORY: "news_category",
}

export const ActionTypes = {
	DATA_LOAD: "data_load", 
	NEWS_DETAILS_LOAD: "news_details_load",
	NEWS_RELATED_LOAD: "news_related_load",
	NEWS_CATEGORY_LOAD: "news_category_load",
	SEARCH_RESULTS_LOAD: "search_results_load",
	CATEGORIES_LOAD: "categories_load",
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
	NEXT_FIXTURE_CLICK: "next_fixture_click",
	CLEAR_DATA: "clear_data",
	SORT_DATA_BY_DATE: "sort_data_by_date"
}