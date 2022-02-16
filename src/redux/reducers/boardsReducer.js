import {
    GET_BOARDS,
    GET_BOARD,
    CREATE_BOARD,
    UPDATE_COLUMN_NAME,
} from "../types/users";

const initialState = {
    boards: [],
    columns: [],
    board: {},
    loading: false,
};

const boardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOARDS.REQUEST:
            return { ...state, loading: true };
        case GET_BOARDS.SUCCESS:
            return { ...state, loading: false, boards: action.boards };
        case GET_BOARDS.FAIL:
            return { ...state, loading: false };

        case GET_BOARD.REQUEST:
            return { ...state, isLoadingBoard: true, board: {}, columns: [] };
        case GET_BOARD.SUCCESS:
            return {
                ...state,
                isLoadingBoard: false,
                board: action.board,
                columns: action.columns,
            };
        case GET_BOARD.FAIL:
            return { ...state, isLoadingBoard: false };

        case CREATE_BOARD.REQUEST:
            return { ...state, isCreatingBoard: true };
        case CREATE_BOARD.SUCCESS:
            return {
                ...state,
                isCreatingBoard: false,
                boards: [...state.boards, action.board],
            };
        case CREATE_BOARD.FAIL:
            return { ...state, isCreatingBoard: false };

        case UPDATE_COLUMN_NAME.REQUEST:
            return { ...state, isUpdatingColumnName: true };
        case UPDATE_COLUMN_NAME.SUCCESS:
            return {
                ...state,
                isUpdatingColumnName: false,
            };
        case UPDATE_COLUMN_NAME.FAIL:
            return { ...state, isUpdatingColumnName: false };

        default:
            return { ...state };
    }
};

export default boardsReducer;
