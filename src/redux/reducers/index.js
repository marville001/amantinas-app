import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import appReducer from "./appReducers";
import userAuthReducer from "./userAuthReducer";
import usersReducer from "./usersReducer";
import scrapesReducer from "./scrapesReducer";
import homesReducer from "./homesReducer";
import suggestionsReducer from "./suggestionsReducer";
import boardsReducer from "./boardsReducer";

const rootReducer = combineReducers({
    appState: appReducer,
    adminState: adminReducer,
    userAuthState: userAuthReducer,
    usersState: usersReducer,
    scrapeState: scrapesReducer,
    homesState: homesReducer,
    suggestionsState: suggestionsReducer,
    boardsState: boardsReducer,
});

export default rootReducer;
