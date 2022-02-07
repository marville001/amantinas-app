import { SIDEBAR, VIEW_TYPE } from "../types";

const initialState = {
  sidebarOpen: true,
  viewType: "cards",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR.OPEN:
      return { ...state, sidebarOpen: true };
    case SIDEBAR.CLOSE:
      return {
        ...state,
        sidebarOpen: false,
      };
    case VIEW_TYPE.CARDS:
      return { ...state, viewType: "cards" };
    case VIEW_TYPE.LIST:
      return {
        ...state,
        viewType: "list",
      };
    default:
      return { ...state };
  }
};

export default appReducer;
