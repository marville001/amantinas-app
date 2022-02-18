import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from "../types/users";
import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";

export const getLoggedInUser = () => async (dispatch) => {
    const token = localStorage.token;

    if (token) {
        dispatch({ type: USER_LOGIN.REQUEST });
        try {
            const data = await get("auth/me");
            dispatch({
                type: USER_LOGIN.SUCCESS,
                user: data.user,
            });
        } catch (error) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }
};

export const userLoginAction =
    (details, type = "email") =>
    async (dispatch) => {
        dispatch({ type: USER_LOGIN.REQUEST });
        try {
            const data = await post(
                `${
                    type === "google"
                        ? "auth/login/google"
                        : type === "facebook"
                        ? "auth/login/facebook"
                        : "auth/login"
                }`,
                details
            );
            localStorage.setItem("token", data.token);
            dispatch({
                type: USER_LOGIN.SUCCESS,
                user: data.user,
            });
            return { success: true };
        } catch (error) {
            if (localStorage.token) localStorage.removeItem("token");
            dispatch({
                type: USER_LOGIN.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };

export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: USER_LOGOUT,
    });
};

export const userRegisterAction =
    (details, type = "email") =>
    async (dispatch) => {
        dispatch({ type: USER_REGISTER.REQUEST });
        try {
            const data = await post(
                `${
                    type === "google"
                        ? "auth/register/google"
                        : type === "facebook"
                        ? "auth/register/facebook"
                        : "auth/register"
                }`,
                details
            );
            localStorage.setItem("token", data.token);
            dispatch({
                type: USER_REGISTER.SUCCESS,
                user: data.user,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: USER_REGISTER.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };
