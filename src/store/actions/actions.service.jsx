import axios from "axios";
import { NEWS_REDUCER_CASES } from "../reducers/redux.service.jsx";
import qs from "qs";

const BASE_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

export function fetchNews(query) {
  return async function (dispatch) {
    try {
      dispatch({
        type: NEWS_REDUCER_CASES.FETCHING_NEWS,
      });

      const queryString = qs.stringify(
        {
          ...query,
          "api-key": import.meta.env.VITE_API_KEY,
        },
        { encode: true }
      );

      
      const response = await axios.get(`${BASE_API_URL}${queryString}`);

     
      if (response.status !== 200) {
        throw new Error("Failed to fetch data from NYT API");
      }

      dispatch({
        type: NEWS_REDUCER_CASES.INSERT_NEWS,
        news: response.data.response.docs,
      });
    } catch (error) {
      console.error("[actions-fetchNews]:", error);
    } finally {
      dispatch({
        type: NEWS_REDUCER_CASES.DONE_FETCHING_NEWS,
      });
    }
  };
}
