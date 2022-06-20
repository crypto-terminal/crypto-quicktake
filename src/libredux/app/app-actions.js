import { createAction } from "@reduxjs/toolkit";

export const SET_API_PAIRS = "APP.SET_API_PAIRS";
export const setApiPairs = createAction(SET_API_PAIRS);

export const GET_API_PAIRS = "APP.GET_API_PAIRS";
export const getApiPairs = createAction(GET_API_PAIRS);

export const ADD_API_PAIR = "APP.ADD_API_PAIR";
export const addApiPair = createAction(ADD_API_PAIR);
