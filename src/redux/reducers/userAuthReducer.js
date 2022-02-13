import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../types/users";

const initialState = {
    user: {},
    loading: false,
};

const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN.REQUEST:
            return { ...state, loading: true, user: {} };
        case USER_LOGIN.SUCCESS:
            return { ...state, loading: false, user: action.user };
        case USER_LOGIN.FAIL:
        case USER_LOGOUT:
            return { ...state, loading: false, user: {} };

        case USER_REGISTER.REQUEST:
            return { ...state, isCreatingUser: true };
        case USER_REGISTER.SUCCESS:
            return {
                ...state,
                isCreatingUser: false,
                user: action.user,
            };
        case USER_REGISTER.FAIL:
            return { ...state, isCreatingUser: false, user: {} };

        default:
            return { ...state };
    }
};

export default userAuthReducer;
