import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useEffect } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service.jsx";
import { fetchNews } from "../store/actions/actions.service";
import Header from "../components/Banner/banner.home.jsx";
import TrendingCards from "../components/TrendingCard/index.home.jsx";

function HomePage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("#1 useEffect()");
    const query = {
      fq: `glocations:("Indonesia")`,
    };
    dispatch(fetchNews(query));
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
        <section className={styles.pageTitleContainer}>
          <h1 className="fw-bold">Indonesia News</h1>
        </section>
        <Header />
        <TrendingCards
          newsData={newsReducer.news}
          onSave={handleSave}
          savedNews={newsReducer.savedNews}
          onRemove={handleRemove}
          isHomePage={true}
        />
        <section className={styles.newsContainer}>
          <div className="ms-4 mb-0">
            <h2 className="fw-bold">Latest News In Indonesia</h2>
          </div>
          <hr className="w-100" />
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

export default HomePage;
