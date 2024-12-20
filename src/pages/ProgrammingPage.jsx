import styles from "./CommonPageLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { useEffect, useState } from "react";
import { fetchNews } from "../store/actions/actions.service";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service.jsx";
import TrendingCards from "../components/TrendingCard/index.home.jsx";
import HeaderProgramming from "../components/Banner/Banner.programming.jsx";
import DateFilter from "../components/Filter/DateFilter";
import Pagination from "../components/pagination/Pagination.jsx";

function ProgrammingPage() {
  const newsReducer = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(0); 
  const itemsPerPage = 10;

  
  const handleSearchByDate = async (startDate, endDate) => {
    setLoading(true);
    const query = {
      q: "Programming",
      fq: 'news_desk:("Technology")',
      begin_date: startDate.replace(/-/g, ""),
      end_date: endDate.replace(/-/g, ""),
      page: currentPage, 
    };
    dispatch(fetchNews(query))
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
    setCurrentPage(0);
  };

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  useEffect(() => {
    setLoading(true);
    const query = {
      q: "Programming",
      fq: 'news_desk:("Technology")',
      page: currentPage, 
    };
    dispatch(fetchNews(query))
      .then((data) => {
       
        const totalHits = data.meta.hits || 0; 
        setTotalPages(Math.ceil(totalHits / itemsPerPage));
      })
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
  }, [dispatch, currentPage]);

 
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
        <HeaderProgramming />

        <TrendingCards
          newsData={newsReducer.news}
          onSave={handleSave}
          savedNews={newsReducer.savedNews}
          onRemove={handleRemove}
          isHomePage={true}
        />

        <h1 className="mb-4">All News Programming</h1>
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
            <p>No news available</p>
          )}
        </section>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}

export default ProgrammingPage;
