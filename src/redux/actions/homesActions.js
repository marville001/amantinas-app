import { get, post, put } from "../../utils/http";
import parseError from "../../utils/parseError";
import { CREATE_HOME, GET_HOMES, UPDATE_HOME } from "../types/users";

export const createProspectAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_HOME.REQUEST });
    try {
        const data = await post("homes/prospects", details);
        dispatch({
            type: CREATE_HOME.SUCCESS,
            home: data.prospect,
        });
        return { success: true, message: "Prospect Created Sucecssfully" };
    } catch (error) {
        dispatch({
            type: CREATE_HOME.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const updateProspectAction = (id, details) => async (dispatch) => {
    dispatch({ type: UPDATE_HOME.REQUEST });
    try {
        const data = await put(`homes/${id}`, details);
        dispatch({
            type: UPDATE_HOME.SUCCESS,
            home: data.home,
        });
        return { success: true, message: "Prospect Updated Sucecssfully" };
    } catch (error) {
        dispatch({
            type: UPDATE_HOME.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const getHomesAction =
    ({ investorId }) =>
    async (dispatch) => {
        dispatch({ type: GET_HOMES.REQUEST });
        try {
            const data = await get(`homes/${investorId}`);
            dispatch({
                type: GET_HOMES.SUCCESS,
                homes: data.homes,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: GET_HOMES.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };
