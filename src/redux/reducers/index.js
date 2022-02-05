import { combineReducers } from "redux";

import appReducer from "./appReducers";

const rootReducer = combineReducers({
  appState: appReducer,
});

export default rootReducer;
