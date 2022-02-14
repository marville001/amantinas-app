import { CREATE_HOME, GET_HOMES } from "../types/users";

const initialState = {
    homes: [],
    loading: false,
};

const homesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOMES.REQUEST:
            return { ...state, loading: true, };
        case GET_HOMES.SUCCESS:
            return { ...state, loading: false, homes: action.homes };
        case GET_HOMES.FAIL:
            return { ...state, loading: false, };

        case CREATE_HOME.REQUEST:
            return { ...state, isCreatingProspect: true };
        case CREATE_HOME.SUCCESS:
            return {
                ...state,
                isCreatingProspect: false,
                homes: [action.home, ...state.homes],
            };
        case CREATE_HOME.FAIL:
            return { ...state, isCreatingProspect: false };

        default:
            return { ...state };
    }
};

export default homesReducer;
