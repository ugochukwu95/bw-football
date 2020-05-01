import {ActionTypes} from "./Types";
// import { data as phData } from "./placeholderData";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType, params = {}) => ({
	type: ActionTypes.DATA_LOAD,
	payload: dataSource.GetAPIData(dataType, params).then(response => ({ 
		dataType, 
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']}
	}))
});

export const loadNewsDetails = (dataType, params = {}) => ({
	type: ActionTypes.NEWS_DETAILS_LOAD,
	payload: dataSource.GetAPIData(dataType, params).then(response => ({ 
		dataType, 
		data: response.data
	}))
});

export const loadNewsRelated = (dataType, params = {}) => ({
	type: ActionTypes.NEWS_RELATED_LOAD,
	payload: dataSource.GetAPIData(dataType, params).then(response => ({ 
		dataType, 
		data: response.data
	}))
});

export const loadNewsCategory = (dataType, params = {}) => ({
	type: ActionTypes.NEWS_CATEGORY_LOAD,
	payload: dataSource.GetAPIData(dataType, params).then(response => ({ 
		dataType, 
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']}
	}))
});

export const loadSearchResults = (dataType, params = {}) => ({
	type: ActionTypes.SEARCH_RESULTS_LOAD,
	payload: dataSource.GetAPIData(dataType, params).then(response => ({ 
		dataType, 
		data: {data: response.data['docs'], total: response.data['total'], page: response.data['page'], pages: response.data['pages']}
	})).catch(err => ({
		dataType,
		data: {error: "Somethhing went wrong. Please try again"}
	}))
});

export const loadCategories = (dataType, params = {}) => ({
	type: ActionTypes.CATEGORIES_LOAD,
	payload: dataSource.GetAPIData(dataType, params).then(response => ({ 
		dataType, 
		data: response.data
	}))
});

export const clearData = (dataType) => ({
	type: ActionTypes.CLEAR_DATA,
	payload: { 
		dataType, 
	}
});

export const sortDataByDate = (dataType) => ({
	type: ActionTypes.SORT_DATA_BY_DATE,
	payload: { 
		dataType, 
	}
});

export const loadCompetitionData = (dataType, id) => ({
	type: ActionTypes.COMP_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ 
		dataType, 
		data: response.data
	})).catch(err => ({
		dataType,
		data: {error: "Somethhing went wrong. Please try again"}
	}))
});

export const loadMatchesData = (dataType, id, params) => ({
	type: ActionTypes.MATCHES_DATA_LOAD,
	payload: dataSource.GetData(dataType, id, params).then(response => ({ 
		dataType, 
		data: response.data, 
	})).catch(err => ({
		dataType,
		data: {error: err.message}
	}))
});

export const loadTeamsData = (dataType, id) => ({
	type: ActionTypes.TEAMS_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ 
		dataType, 
		data: response.data, 
		TeamsCount: response.data.count
	})).catch(err => ({
		dataType,
		data: {error: "Somethhing went wrong. Please try again"}
	}))
});

export const loadTeamCrestData = (dataType, id) => ({
	type: ActionTypes.TEAMCREST_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ dataType, data: response.data}))
});

export const loadTopScorersData = (dataType, id) => ({
	type: ActionTypes.TOP_SCORERS_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ dataType, data: response.data}))
});

export const loadResultsData = (dataType, date) => ({
	type: ActionTypes.RESULTS_DATA_LOAD,
	payload: dataSource.GetData(dataType, date).then(response => ({ dataType, data: response.data}))
});

export const handleNextButtonClick = (dataType, startItem, itemsPerPage) => ({
	type: ActionTypes.NEXT_TABLE_CLICK,
	payload: {
		dataType: dataType,
		startItem: startItem,
		itemsPerPage: itemsPerPage
	}
})

export const handlePreviousButtonClick = (dataType, startItem, itemsPerPage) => ({
	type: ActionTypes.PREVIOUS_TABLE_CLICK,
	payload: {
		dataType: dataType,
		startItem: startItem,
		itemsPerPage: itemsPerPage
	}
})

export const resetTableState = (dataType) => ({
	type: ActionTypes.RESET_TABLE_STATE,
	payload: {
		dataType: dataType
	}
})

export const handleFixturePreviousButtonClick = (dataType, matchDay) => ({
	type: ActionTypes.PREVIOUS_FIXTURE_CLICK,
	payload: {
		dataType: dataType,
		data: matchDay
	}	
})