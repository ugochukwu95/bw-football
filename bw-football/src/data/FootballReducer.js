import {ActionTypes} from "./Types";
import {DataTypes} from "./Types";
export const FootballReducer = (storeData, action) => {
	switch (action.type) {
		case ActionTypes.DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			};
		case ActionTypes.COMP_DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}
		case ActionTypes.MATCHES_DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: {...action.payload.data, matchesCount: action.payload.matchesCount, 
					matchDay: action.payload.matchDay}
			}
		case ActionTypes.TEAMS_DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: {...action.payload.data, TeamsCount: action.payload.TeamsCount}
			}
		case ActionTypes.TEAMCREST_DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}
		case ActionTypes.TOP_SCORERS_DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}
		case ActionTypes.RESULTS_DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			}
		case ActionTypes.NEXT_TABLE_CLICK:
			return {
				...storeData,
				[action.payload.dataType]: {...storeData[(DataTypes.TABLESTATE)], startItem: action.payload.startItem, 
				    itemsPerPage: action.payload.itemsPerPage}
			}
		case ActionTypes.PREVIOUS_TABLE_CLICK:
			return {
				...storeData,
				[action.payload.dataType]: {...storeData[(DataTypes.TABLESTATE)], startItem: action.payload.startItem, 
				    itemsPerPage: action.payload.itemsPerPage}
			}
		case ActionTypes.RESET_TABLE_STATE:
			return {
				...storeData,
				[action.payload.dataType]: {isLoading: true, totalPages: 1, startItem: 0, itemsPerPage: 10}
			}
		case ActionTypes.PREVIOUS_FIXTURE_CLICK:
			return {
				...storeData,
				[action.payload.dataType]: {...storeData[(DataTypes.MATCHES)], matchDay: action.payload.data}
			}
		default: 
			return storeData || {};
	}
}