import Axios from "axios";
import { RestUrls } from "./Urls";

export class RestDataSource {

	GetAPIData = (dataType, params) => this.SendRequest("get", RestUrls[dataType], params);
	GetData = (dataType, id, params = {}) => this.SendRequest("get", `${'https://cors-anywhere.herokuapp.com/'}${RestUrls[dataType](id)}`, params, {"X-Auth-Token": "52f3f789f152405b968c75a3549beb3f"});
	SendRequest = (method, url, params, headers) => Axios.request({ method, url, params, headers});
}