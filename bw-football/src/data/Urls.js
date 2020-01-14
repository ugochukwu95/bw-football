import { DataTypes } from "./Types";

/*const protocol = "http";
const hostname = "localhost";
const port = 3500;*/

export const RestUrls = {
	[DataTypes.STANDINGS]: (id) => `https://api.football-data.org/v2/competitions/${id}/standings`,
	[DataTypes.TEAMS]: (id) => `https://api.football-data.org/v2/competitions/${id}/teams`,
	[DataTypes.MATCHES]: (id) => `https://api.football-data.org/v2/competitions/${id}/matches`,
	[DataTypes.TEAMCREST]: (id) => `https://api.football-data.org/v2/teams/${id}`,
	[DataTypes.SCORERS]: (id) => `https://api.football-data.org/v2/competitions/${id}/scorers`,
	[DataTypes.RESULTS]: (date) => `https://api.football-data.org/v2/matches?competitions=2014,2021,2019,2002,2015,2017&dateFrom=${date}&dateTo=${date}`,
	[DataTypes.NEWS]: `/api/news`,
	[DataTypes.TABLESTATE]: `/api/tablestate`,
	[DataTypes.COMPETITIONS]: `/api/competitions`
}