import { combineEpics } from "redux-observable";
import { appEpics } from "./app/app-epics";

export const rootEpic = combineEpics(appEpics);
