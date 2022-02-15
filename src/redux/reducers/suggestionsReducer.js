import { CREATE_SUGGESTION, GET_SUGGESTIONS, SUGGESTION_VOTE } from "../types";

const initialState = {
    suggestions: [],
    loading: false,
};

const suggestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUGGESTIONS.REQUEST:
            return { ...state, loading: true };
        case GET_SUGGESTIONS.SUCCESS:
            return {
                ...state,
                loading: false,
                suggestions: action.suggestions,
            };
        case GET_SUGGESTIONS.FAIL:
            return { ...state, loading: false };

        case CREATE_SUGGESTION.REQUEST:
            return { ...state, isCreatingSuggestion: true };
        case CREATE_SUGGESTION.SUCCESS:
            return {
                ...state,
                isCreatingSuggestion: false,
                suggestions: [action.suggestion, ...state.suggestions],
            };
        case CREATE_SUGGESTION.FAIL:
            return { ...state, isCreatingSuggestion: false };

        case SUGGESTION_VOTE.REQUEST:
            return { ...state, isVoting: true };
        case SUGGESTION_VOTE.SUCCESS:
            return {
                ...state,
                isVoting: false,
            };
        case SUGGESTION_VOTE.FAIL:
            return { ...state, isVoting: false };

        default:
            return { ...state };
    }
};

export default suggestionsReducer;