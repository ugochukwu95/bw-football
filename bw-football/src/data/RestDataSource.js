import Axios from "axios";
import { RestUrls } from "./Urls";

export class RestDataSource {
	headers = {
		"X-Auth-Token": "52f3f789f152405b968c75a3549beb3f", 
		"Access-Control-Allow-Origin": "http://localhost:3000",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
		'Access-Control-Allow-Headers': 'Content-Type, Authorization'
	}

	GetJsonServerData = (dataType) => this.SendRequest("get", RestUrls[dataType]);
	GetData = (dataType, id) => this.SendRequest("get", `${'https://cors-anywhere.herokuapp.com/'}${RestUrls[dataType](id)}`);
	SendRequest = (method, url) => Axios.request({ method, url, headers: this.headers });
}