import {createStore, applyMiddleware} from "redux";
import {FootballReducer} from "./FootballReducer";
import { asyncActions } from "./AsyncMiddleware";

export const FootballDataStore = createStore(FootballReducer, applyMiddleware(asyncActions));