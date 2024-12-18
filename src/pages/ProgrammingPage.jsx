import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useEffect } from "react";
import { fetchNews } from "../store/actions/actions.service";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service.jsx";
import TrendingCards from "../components/TrendingCard/index.home.jsx";
import HeaderProgramming from "../components/Banner/Banner.programming.jsx";

function ProgrammingPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({
      q: "Programming",
      fq: 'news_desk:("Technology")'
    }))
      .catch(error => console.error("Error fetching news:", error));
  }, [dispatch]);

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
          <h1>Programming News</h1>
        </section>
        <HeaderProgramming/>
        <TrendingCards
          newsData={newsReducer.news}
          onSave={handleSave}
          savedNews={newsReducer.savedNews}
          onRemove={handleRemove}
          isHomePage={true}
        />
        <h1 className="mb-4">All News programming</h1>
        <section className={styles.newsContainer}>
          {newsReducer.news.length > 0 ? (
            <NewsCard
              newsData={newsReducer.news}
              onSave={handleSave}
              savedNews={newsReducer.savedNews}
              onRemove={handleRemove}
              isHomePage={true}
            />
          ) : (
            <p>No news available</p>
          )}
        </section>
      </section>
    </main>
  );
}

export default ProgrammingPage;
