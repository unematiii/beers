import { combineReducers } from "redux";

import { homeReducer } from "../home";

export const rootReducer = combineReducers({
    'home': homeReducer,
});
