import { get, post, put } from "../../utils/http";
import parseError from "../../utils/parseError";
import { CREATE_BOARD, GET_BOARD, GET_BOARDS, UPDATE_COLUMN_NAME } from "../types/users";

export const createBoardAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_BOARD.REQUEST });
    try {
        const data = await post("boards", details);
        dispatch({
            type: CREATE_BOARD.SUCCESS,
            board: data.board,
        });
        return { success: true, message: "Board Created Sucecssfully" };
    } catch (error) {
        dispatch({
            type: CREATE_BOARD.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const getBoardsAction = (details) => async (dispatch) => {
    dispatch({ type: GET_BOARDS.REQUEST });
    try {
        const data = await get(`boards`, details);
        dispatch({
            type: GET_BOARDS.SUCCESS,
            boards: data.boards,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: GET_BOARDS.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const getBoardAction = (id, details) => async (dispatch) => {
    dispatch({ type: GET_BOARD.REQUEST });
    try {
        const data = await get(`boards/${id}`, details);
        dispatch({
            type: GET_BOARD.SUCCESS,
            board: data.board,
            columns: data.columns,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: GET_BOARD.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const updateColumnNameAction = (id, details) => async (dispatch) => {
    dispatch({ type: UPDATE_COLUMN_NAME.REQUEST });
    try {
        const data = await put(`boards/column-name/${id}`, details);
        dispatch({
            type: UPDATE_COLUMN_NAME.SUCCESS,
            board: data.board,
            column: data.column,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: UPDATE_COLUMN_NAME.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};
