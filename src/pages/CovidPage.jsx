import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service.jsx";
import { fetchNews } from "../store/actions/actions.service";
import TrendingCards from "../components/TrendingCard/index.home.jsx";
import DateFilter from "../components/Filter/DateFilter"; 

function CovidPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSearchByDate = async (startDate, endDate) => {
    setLoading(true);
    const query = {
      q: "Covid-19",
      fq: 'news_desk:("Health")',
      begin_date: startDate.replace(/-/g, ""),
      end_date: endDate.replace(/-/g, ""),
    };
    dispatch(fetchNews(query))
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dispatch(fetchNews({
      q: "Covid-19",
      fq: 'news_desk:("Health")',
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

        <h2 className="fw-bold text-success text-center mb-4">All Covid-19 News</h2>
        <DateFilter onSearchByDate={handleSearchByDate} />
        <section className={styles.newsContainer}>
          {loading ? (
            <p>Loading news...</p>
          ) : newsReducer.news.length > 0 ? (
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
