import {ActionTypes} from "./Types";
export const FootballReducer = (storeData, action) => {
	switch (action.type) {
		case ActionTypes.DATA_LOAD:
			return {
				...storeData,
				[action.payload.dataType]: action.payload.data
			};
		default: 
			return storeData || {};
	}
}