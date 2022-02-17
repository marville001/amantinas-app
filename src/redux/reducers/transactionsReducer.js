import { CREATE_TRANSACTION, GET_TRANSACTIONS } from "../types/users";

const initialState = {
    transactions: [],
    loading: false,
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTIONS.REQUEST:
            return { ...state, loading: true };
        case GET_TRANSACTIONS.SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.transactions,
            };
        case GET_TRANSACTIONS.FAIL:
            return { ...state, loading: false };

        case CREATE_TRANSACTION.REQUEST:
            return { ...state, isCreatingTransaction: true };
        case CREATE_TRANSACTION.SUCCESS:
            return {
                ...state,
                isCreatingTransaction: false,
                transactions: [action.transaction, ...state.transactions],
            };
        case CREATE_TRANSACTION.FAIL:
            return { ...state, isCreatingTransaction: false };

        default:
            return { ...state };
    }
};

export default transactionsReducer;
