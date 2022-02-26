import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";
import { ADD_USER, LOAD_USERS } from "../types/users";

export const addUserAction = (details) => async (dispatch) => {
    dispatch({ type: ADD_USER.REQUEST });
    try {
        const data = await post("sub-user/add", details);
        dispatch({
            type: ADD_USER.SUCCESS,
            user: data.user,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: ADD_USER.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const loadUsersAction = ({investorId}) => async (dispatch) => {
    dispatch({ type: LOAD_USERS.REQUEST });
    try {
        const data = await get("sub-user/get/"+investorId);
        dispatch({
            type: LOAD_USERS.SUCCESS,
            users: data.users,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: LOAD_USERS.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};
