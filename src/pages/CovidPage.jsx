import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service.jsx";
import { fetchNews } from "../store/actions/actions.service";
import TrendingCards from "../components/TrendingCard/index.home.jsx";

function CovidPage() {
  const newsReducer = useSelector(function (state) {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({
      q: "Covid-19",
      fq: 'news_desk:("Health")'
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
          <h1 className="fw-bold text-center">Covid-19</h1>
        </section>

        <section className="w-95">
          <h2 className="fw-bold text-primary ms-3 mb-0">Populer Covid-19 News</h2>
          <TrendingCards
            newsData={newsReducer.news}
            onSave={handleSave}
            savedNews={newsReducer.savedNews}
            onRemove={handleRemove}
            isHomePage={true}
          />
        </section>

        <h2 className="fw-bold text-success text-center mb-0">All Covid-19 News</h2>
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
            <p>No Covid-19 news available</p>
          )}
        </section>
      </section>
    </main>

  );
}

export default CovidPage;
