import {ActionTypes} from "./Types";
// import { data as phData } from "./placeholderData";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType) => ({
	type: ActionTypes.DATA_LOAD,
	payload: dataSource.GetJsonServerData(dataType).then(response => ({ dataType, data: response.data}))
});

export const loadCompetitionData = (dataType, id) => ({
	type: ActionTypes.COMP_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ dataType, data: response.data}))
});

export const loadMatchesData = (dataType, id) => ({
	type: ActionTypes.MATCHES_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ dataType, data: response.data, 
		matchesCount: response.data.count, matchDay: response.data.matches[0].season.currentMatchday}))
});

export const loadTeamsData = (dataType, id) => ({
	type: ActionTypes.TEAMS_DATA_LOAD,
	payload: dataSource.GetData(dataType, id).then(response => ({ dataType, data: response.data, 
		TeamsCount: response.data.count}))
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