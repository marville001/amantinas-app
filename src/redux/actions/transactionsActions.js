import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";
import { CREATE_TRANSACTION, GET_TRANSACTIONS } from "../types/users";

export const createTransactionAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_TRANSACTION.REQUEST });
    try {
        const data = await post("transactions", details);
        dispatch({
            type: CREATE_TRANSACTION.SUCCESS,
            transaction: data.transaction,
        });
        return { success: true, message: "Transaction Created Sucecssfully" };
    } catch (error) {
        dispatch({
            type: CREATE_TRANSACTION.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const getTransactionsAction =
    ({ investorId }) =>
    async (dispatch) => {
        dispatch({ type: GET_TRANSACTIONS.REQUEST });
        try {
            const data = await get(`transactions/${investorId}`);
            dispatch({
                type: GET_TRANSACTIONS.SUCCESS,
                transactions: data.transactions,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: GET_TRANSACTIONS.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };
