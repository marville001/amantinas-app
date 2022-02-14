import { get, post } from "../../utils/http";
import parseError from "../../utils/parseError";
import { CREATE_SCRAPE, LOAD_SCRAPES } from "../types/users";

export const createScrapeAction = (details) => async (dispatch) => {
    dispatch({ type: CREATE_SCRAPE.REQUEST });
    try {
        const data = await post("scrape", details);
        dispatch({
            type: CREATE_SCRAPE.SUCCESS,
            scrape: data.scrape,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: CREATE_SCRAPE.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};

export const loadScrapesAction = () => async (dispatch) => {
    dispatch({ type: LOAD_SCRAPES.REQUEST });
    try {
        const data = await get("scrape");
        dispatch({
            type: LOAD_SCRAPES.SUCCESS,
            scrapes: data.scrapes,
        });
        return { success: true };
    } catch (error) {
        dispatch({
            type: LOAD_SCRAPES.FAIL,
            error: parseError(error),
        });
        return { success: false, message: parseError(error) };
    }
};
