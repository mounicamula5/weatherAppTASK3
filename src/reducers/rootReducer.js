import { combineReducers } from 'redux';

import weatherReducer from "./weatherReducer";

let rootReducer = combineReducers({
    weatherReducer
});

export default rootReducer;