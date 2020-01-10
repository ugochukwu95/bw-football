import {createStore} from "redux";
import {FootballReducer} from "./FootballReducer";

export const FootballDataStore = createStore(FootballReducer);