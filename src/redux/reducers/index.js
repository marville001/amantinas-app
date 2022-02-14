import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import appReducer from "./appReducers";
import userAuthReducer from "./userAuthReducer";
import usersReducer from "./usersReducer";
import scrapesReducer from "./scrapesReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    adminState: adminReducer,
    userAuthState: userAuthReducer,
    usersState: usersReducer,
    scrapeState: scrapesReducer
});

export default rootReducer;
