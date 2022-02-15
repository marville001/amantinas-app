import { ADMIN_LOGIN, CREATE_ADMIN } from "../types/admin";

const initialState = {
    admin: {},
    admins: [],
    investors: [],
    loading: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN.REQUEST:
            return { ...state, loading: true, admin: {} };
        case ADMIN_LOGIN.SUCCESS:
            return { ...state, loading: false, admin: action.admin };
        case ADMIN_LOGIN.FAIL:
            return { ...state, loading: false, admin: {} };

        case CREATE_ADMIN.REQUEST:
            return { ...state, isCreatingAdmin: true };
        case CREATE_ADMIN.SUCCESS:
            return {
                ...state,
                isCreatingAdmin: false,
                admins: [action.admin, ...state.admins],
            };
        case CREATE_ADMIN.FAIL:
            return { ...state, isCreatingAdmin: false };

        default:
            return { ...state };
    }
};

export default adminReducer;
