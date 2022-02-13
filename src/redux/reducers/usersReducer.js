import { ADD_USER, LOAD_USERS } from "../types/users";

const initialState = {
    users: {},
    loading: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS.REQUEST:
            return { ...state, loading: true, users: {} };
        case LOAD_USERS.SUCCESS:
            return { ...state, loading: false, users: action.users };
        case LOAD_USERS.FAIL:
            return { ...state, loading: false, users: {} };

        case ADD_USER.REQUEST:
            return { ...state, isCreatingUser: true };
        case ADD_USER.SUCCESS:
            return {
                ...state,
                isCreatingUser: false,
                users: [action.user, ...state.users],
            };
        case ADD_USER.FAIL:
            return { ...state, isCreatingUser: false };

        default:
            return { ...state };
    }
};

export default usersReducer;
