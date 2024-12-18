export const NEWS_REDUCER_CASES = {
  INSERT_NEWS: "INSERT_NEWS",
  FETCHING_NEWS: "FETCHING_NEWS",
  DONE_FETCHING_NEWS: "DONE_FETCHING_NEWS",
  SAVE_NEWS: "SAVE_NEWS",
  REMOVE_NEWS: "REMOVE_NEWS", // Tambahkan REMOVE_NEWS
};

const newsState = {
  news: [],
  savedNews: [],
  loading: false,
};

const newsReducer = (state = newsState, action) => {
  switch (action.type) {
    case NEWS_REDUCER_CASES.INSERT_NEWS: {
      return {
        ...state,
        news: action.news,
        loading: false,
      };
    }
    case NEWS_REDUCER_CASES.FETCHING_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }
    case NEWS_REDUCER_CASES.DONE_FETCHING_NEWS: {
      return {
        ...state,
        loading: false,
      };
    }
    case NEWS_REDUCER_CASES.SAVE_NEWS: {
      const savedNews = [...state.savedNews, action.news];
      return {
        ...state,
        savedNews: savedNews,
      };
    }
    case NEWS_REDUCER_CASES.REMOVE_NEWS: {
      const updatedSavedNews = state.savedNews.filter(
        (newsItem) => newsItem.web_url !== action.news.web_url
      );
      return {
        ...state,
        savedNews: updatedSavedNews,
      };
    }
    default:
      return state;
  }
};

export { newsReducer };
