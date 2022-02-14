import { CREATE_SCRAPE, LOAD_SCRAPES } from "../types/users";


const initialState = {
    scrapes: [],
    loading: false,
};

const scrapesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SCRAPES.REQUEST:
            return { ...state, loading: true, };
        case LOAD_SCRAPES.SUCCESS:
            return { ...state, loading: false, scrapes: action.scrapes };
        case LOAD_SCRAPES.FAIL:
            return { ...state, loading: false, };

        case CREATE_SCRAPE.REQUEST:
            return { ...state, isCreatingScrape: true };
        case CREATE_SCRAPE.SUCCESS:
            return {
                ...state,
                isCreatingScrape: false,
                scrapes: [action.scrape, ...state.scrapes],
            };
        case CREATE_SCRAPE.FAIL:
            return { ...state, isCreatingScrape: false };

        default:
            return { ...state };
    }
};

export default scrapesReducer;
