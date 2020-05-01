import {ActionTypes} from "./Types";
import {DataTypes} from "./Types";
export const FootballReducer = (storeData, action) => {
	switch (action.type) {
		case ActionTypes.DATA_LOAD:
			if (action.payload.data && !action.payload.data.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}

		case ActionTypes.SEARCH_RESULTS_LOAD:
			if (action.payload.data && !action.payload.data.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.data.error}
				}
			}

		case ActionTypes.NEWS_DETAILS_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data	
			}

		case ActionTypes.NEWS_RELATED_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data	
			}

		case ActionTypes.CATEGORIES_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data	
			}

		case ActionTypes.NEWS_CATEGORY_LOAD:
			if (action.payload.data && !action.payload.data.error) {
				let newData = ((storeData[action.payload.dataType] === undefined || storeData[action.payload.dataType] === null) ? [] : storeData[action.payload.dataType]['data']);
				newData.push(...action.payload.data.data);
				let store = {
					...storeData,
					[action.payload.dataType]: {data: newData, total: action.payload.data.total, page: action.payload.data.page, pages: action.payload.data.pages},
				};
				return store; 
			}
			else {
				return {
					...storeData,
					[action.payload.dataType]: {error: action.payload.error}
				}
			}

		case ActionTypes.CLEAR_DATA:
			return {
				...storeData,
				[action.payload.dataType]: null	
			}

		case ActionTypes.SORT_DATA_BY_DATE:
			let dataToSort = storeData[action.payload.dataType]['data'];
			let sortedData = dataToSort.sort(function(a,b){
				  return new Date(b.pubDate) - new Date(a.pubDate);
			});

			return {
				...storeData,
				[action.payload.dataType]: {...storeData[action.payload.dataType], data: sortedData}	
			}

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