import { ADMIN_LOGIN, CREATE_ADMIN, GET_ADMINS, GET_INVESTORS } from "../types/admin";
import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";

export const getLoggedInAdmin = () => async (dispatch) => {
    const token = localStorage.adminToken;

    if (token) {
        dispatch({ type: ADMIN_LOGIN.REQUEST });
        try {
            const data = await get("admin-auth/me", {}, "admin");
            dispatch({
                type: ADMIN_LOGIN.SUCCESS,
                admin: data.admin,
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
        return { success: true };
    } catch (error) {
        if (localStorage.adminToken) localStorage.removeItem("adminToken");
        dispatch({
            type: ADMIN_LOGIN.FAIL,
            error: parseError(error),
        });

        return { success: false, message: parseError(error) };
    }
};
export const adminLogoutAction = () => async (dispatch) => {
    localStorage.removeItem("adminToken");
    dispatch({
        type: "ADMIN_LOGOUT",
    });
};

export const createAdminAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_ADMIN.REQUEST });
    try {
        const data = await post("admin-auth/register", details, "admin");

        dispatch({
            type: CREATE_ADMIN.SUCCESS,
            admin: data.admin,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_ADMIN.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const getAdminsAction = () => async (dispatch) => {
    dispatch({ type: GET_ADMINS.REQUEST });
    try {
        const data = await get("users/admins", {}, "admin");
        dispatch({
            type: GET_ADMINS.SUCCESS,
            admins: data.admins,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: GET_ADMINS.FAIL,
            error: parseError(error),
        });

        return { success: false, message: parseError(error) };
    }
};

export const getInvestorsAction = () => async (dispatch) => {
    dispatch({ type: GET_INVESTORS.REQUEST });
    try {
        const data = await get("users/investors", {}, "admin");
        dispatch({
            type: GET_INVESTORS.SUCCESS,
            investors: data.investors,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: GET_INVESTORS.FAIL,
            error: parseError(error),
        });

        return { success: false, message: parseError(error) };
    }
};
