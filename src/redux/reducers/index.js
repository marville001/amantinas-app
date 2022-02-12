import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import appReducer from "./appReducers";
import userAuthReducer from "./userAuthReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    adminState: adminReducer,
    userAuthState: userAuthReducer,
});

export default rootReducer;
