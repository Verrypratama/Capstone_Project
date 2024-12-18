import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/actions/actions.service";
import NewsCard from "../components/NewsCard";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service";
import styles from "./CommonPageLayout.module.css";
import { Navbar } from "../components/Navbar";

function SearchPage() {
  const dispatch = useDispatch();
  const newsReducer = useSelector((state) => state);
  const [query, setQuery] = useState('');
  const {params} = useParams();
  useEffect(() => {
    setQuery(params);
    if (params) {
      const queryParams = { q: params };
      dispatch(fetchNews(queryParams));
    }
  }, [params, dispatch]);
  

  const handleSave = (news) => {
    dispatch({
      type: NEWS_REDUCER_CASES.SAVE_NEWS,
      news: news,
    });
  };

  const handleRemove = (news) => {
    dispatch({
      type: NEWS_REDUCER_CASES.REMOVE_NEWS,
      news: news,
    });
  };

  return (
    <main>
      <Navbar/>
      <h1 className={"fw-bold mt-3"} style={{ textAlign: "center"}}>Search Results for "{query}"</h1>
      <section className={styles.pageContainer}>
        {newsReducer.news.length > 0 ? (
          <NewsCard
            newsData={newsReducer.news}
            onSave={handleSave}
            savedNews={newsReducer.savedNews}
            onRemove={handleRemove}
            isHomePage={true}
          />
        ) : (
          <p>No results found</p>
        )}
      </section>
    </main>
  );
}

export default SearchPage;
