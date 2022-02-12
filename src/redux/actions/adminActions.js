import { ADMIN_LOGIN, CREATE_ADMIN } from "../types/admin";
import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";

export const getLoggedInAdmin = () => async (dispatch) => {
    const token = localStorage.adminToken;

    if (token) {
        console.log({ token });
        dispatch({ type: ADMIN_LOGIN.REQUEST });
        try {
            const data = await get("admin-auth/me", "admin");
            dispatch({
                type: ADMIN_LOGIN.SUCCESS,
                admin: data.user,
            });
        } catch (error) {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
        }
    }
};

export const adminLoginAction = (details) => async (dispatch) => {
    dispatch({ type: ADMIN_LOGIN.REQUEST });
    try {
        const data = await post("admin-auth/login", details, "admin");
        localStorage.setItem("adminToken", data.token);
        dispatch({
            type: ADMIN_LOGIN.SUCCESS,
            admin: data.admin,
        });
    } catch (error) {
        if (localStorage.adminToken) localStorage.removeItem("adminToken");
        dispatch({
            type: ADMIN_LOGIN.FAIL,
            error: parseError(error),
        });
    }
};

export const createAdminAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_ADMIN.REQUEST });
    try {
        const data = await post("admin-auth/register", details, "admin");

        dispatch({
            type: CREATE_ADMIN.SUCCESS,
            admin: data.admin,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ADMIN.FAIL,
            error: parseError(error),
        });
    }
};
