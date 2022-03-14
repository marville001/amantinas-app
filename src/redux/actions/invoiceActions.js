import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";
import { CREATE_INVOICE, GET_INVOICES } from "../types/users";

export const createInvoiceAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_INVOICE.REQUEST });
    try {
        const data = await post("invoice", details);
        dispatch({
            type: CREATE_INVOICE.SUCCESS,
            invoice: data.invoice,
        });
        return { success: true, message: "Invoice Created Sucecssfully" };
    } catch (error) {
        dispatch({
            type: CREATE_INVOICE.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const getInvoicesAction =
    ({ investorId, activePage=1, pageSize=10 }) =>
    async (dispatch) => {
        dispatch({ type: GET_INVOICES.REQUEST });
        try {
            const data = await get(`invoice/${investorId}?activePage=${activePage}&pageSize=${pageSize}`);
            dispatch({
                type: GET_INVOICES.SUCCESS,
                invoices: data.invoices,
                total: data.total,
            });
            return { success: true };
        } catch (error) {
            dispatch({
                type: GET_INVOICES.FAIL,
                error: parseError(error),
            });
            return { success: false, message: parseError(error) };
        }
    };
