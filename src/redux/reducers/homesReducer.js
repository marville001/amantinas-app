import {
    CREATE_HOME,
    GET_HOMES,
    GET_SCRAPED_HOMES,
    UPDATE_HOME,
} from "../types/users";

const initialState = {
    homes: [],
    scrapedHomes: [],
    loading: false,
};

const homesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOMES.REQUEST:
            return { ...state, loading: true };
        case GET_HOMES.SUCCESS:
            return {
                ...state,
                loading: false,
                homes: action.homes,
                total: action.total,
            };
        case GET_HOMES.FAIL:
            return { ...state, loading: false };

        case GET_SCRAPED_HOMES.REQUEST:
            return { ...state, loadingScrapedHomes: true };
        case GET_SCRAPED_HOMES.SUCCESS:
            return {
                ...state,
                loadingScrapedHomes: false,
                scrapedHomes: action.homes,
                total: action.total,
            };
        case GET_SCRAPED_HOMES.FAIL:
            return { ...state, loadingScrapedHomes: false };

        case CREATE_HOME.REQUEST:
            return { ...state, isCreatingProspect: true };
        case CREATE_HOME.SUCCESS:
            return {
                ...state,
                isCreatingProspect: false,
                homes: [action.home, ...state.homes],
            };
        case CREATE_HOME.FAIL:
            return { ...state, isCreatingProspect: false };

        case UPDATE_HOME.REQUEST:
            return { ...state, isUpdatingProspect: true };
        case UPDATE_HOME.SUCCESS:
            return {
                ...state,
                isUpdatingProspect: false,
            };
        case UPDATE_HOME.FAIL:
            return { ...state, isUpdatingProspect: false };

        default:
            return { ...state };
    }
};

export default homesReducer;
