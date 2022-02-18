import { ADMIN_LOGIN, CREATE_ADMIN, GET_ADMINS } from "../types/admin";

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
        case "ADMIN_LOGOUT":
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

        case GET_ADMINS.REQUEST:
            return { ...state, admins: [], isLoadingAdmins: true };
        case GET_ADMINS.SUCCESS:
            return {
                ...state,
                isLoadingAdmins: false,
                admins: action.admins,
            };
        case GET_ADMINS.FAIL:
            return { ...state, isLoadingAdmins: false };

        default:
            return { ...state };
    }
};

export default adminReducer;
