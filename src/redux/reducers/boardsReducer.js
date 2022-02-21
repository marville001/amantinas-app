import {
    GET_BOARDS,
    GET_BOARD,
    CREATE_BOARD,
    UPDATE_COLUMN_NAME,
    CLEAR_BOARD_COLUMN,
    ADD_COLUMN_ITEM,
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
            return { ...state, isLoadingBoard: true };
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

        case ADD_COLUMN_ITEM.REQUEST:
            return {
                ...state,
                isAddingColumnItem: true,
            };
        case ADD_COLUMN_ITEM.SUCCESS:
            return {
                ...state,
                isAddingColumnItem: false,
                columns: state.columns.map((col) => {
                    if (col._id === action.column._id) {
                        return action.column;
                    } else {
                        return col;
                    }
                }),
            };
        case ADD_COLUMN_ITEM.FAIL:
            return { ...state, isAddingColumnItem: false };

        case CLEAR_BOARD_COLUMN:
            return {
                ...state,
                isUpdatingColumnName: false,
                board: {},
                columns: [],
            };

        default:
            return { ...state };
    }
};

export default boardsReducer;
