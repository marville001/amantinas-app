import { get, post, put } from "../../utils/http";
import parseError from "../../utils/parseError";
import {
    CREATE_SUGGESTION,
    GET_SUGGESTIONS,
    SUGGESTION_DRAG,
    SUGGESTION_VOTE,
} from "../types";

export const createSuggestionAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_SUGGESTION.REQUEST });
    try {
        const data = await post("suggestions", details);
        dispatch({
            type: CREATE_SUGGESTION.SUCCESS,
            suggestion: data.suggestion,
        });
        return { success: true, message: data.message };
    } catch (error) {
        dispatch({
            type: CREATE_SUGGESTION.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const loadSuggestionsAction =
    (admin = false) =>
    async (dispatch) => {
        dispatch({ type: GET_SUGGESTIONS.REQUEST });
        try {
            const data = await get("suggestions", admin ? "admin" : "user");
            dispatch({
                type: GET_SUGGESTIONS.SUCCESS,
                suggestions: data.suggestions,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: GET_SUGGESTIONS.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };

export const suggestionVoteAction =
    (details, admin = false) =>
    async (dispatch) => {
        dispatch({ type: SUGGESTION_VOTE.REQUEST });
        try {
            const data = await put(
                "suggestions/vote",
                details,
                admin ? "admin" : "user"
            );
            dispatch({
                type: SUGGESTION_VOTE.SUCCESS,
                suggestion: data.suggestion,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: SUGGESTION_VOTE.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };

export const suggestionDragAction =
    (details, admin = false) =>
    async (dispatch) => {
        dispatch({ type: SUGGESTION_DRAG.REQUEST });
        try {
            const data = await put(
                "suggestions/column",
                details,
                admin ? "admin" : "user"
            );
            dispatch({
                type: SUGGESTION_DRAG.SUCCESS,
                suggestion: data.suggestion,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: SUGGESTION_DRAG.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };
