import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service.jsx";

function SavedNewsPage() {
  const savedNews = useSelector((state) => state.savedNews);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Saved News:", savedNews);
  }, [savedNews]);

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
      <Navbar />
      <section className={styles.pageContainer}>
        <section>
          <h1>Saved News</h1>
        </section>
        <section className={styles.newsContainer}>
          {savedNews.length > 0 ? (
            <NewsCard
              newsData={savedNews}
              onSave={handleSave}
              savedNews={savedNews}
              onRemove={handleRemove}
              isHomePage={false}
            />
          ) : (
            <p>No saved news available</p>
          )}
        </section>
      </section>
    </main>
  );
}

export default SavedNewsPage;
