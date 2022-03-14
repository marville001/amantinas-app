import { CREATE_INVOICE, GET_INVOICES } from "../types/users";

const initialState = {
    invoices: [],
    loading: false,
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INVOICES.REQUEST:
            return { ...state, loading: true };
        case GET_INVOICES.SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.invoices,
                total: action.total,
            };
        case GET_INVOICES.FAIL:
            return { ...state, loading: false };

        case CREATE_INVOICE.REQUEST:
            return { ...state, isCreatingInvoice: true };
        case CREATE_INVOICE.SUCCESS:
            return {
                ...state,
                isCreatingInvoice: false,
                invoices: [action.invoice, ...state.invoices],
            };
        case CREATE_INVOICE.FAIL:
            return { ...state, isCreatingInvoice: false };

        default:
            return { ...state };
    }
};

export default invoiceReducer;
