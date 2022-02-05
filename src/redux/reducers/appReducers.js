import { SIDEBAR } from "../types";

const initialState = {
  sidebarOpen: true,
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
    default:
      return { ...state };
  }
};

export default appReducer;
