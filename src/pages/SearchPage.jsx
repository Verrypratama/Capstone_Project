import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/actions/actions.service";
import NewsCard from "../components/NewsCard";
import { NEWS_REDUCER_CASES } from "../store/reducers/redux.service";
import styles from "./CommonPageLayout.module.css";
import { Navbar } from "../components/Navbar";
import Pagination from "../components/pagination/Pagination.jsx"; // Import the Pagination component

function SearchPage() {
  const dispatch = useDispatch();
  const newsReducer = useSelector((state) => state);
  const [query, setQuery] = useState('');
  const { params } = useParams();
  const [currentPage, setCurrentPage] = useState(0); // State to manage the current page
  const [totalPages, setTotalPages] = useState(0); // State to manage the total number of pages
  const itemsPerPage = 10; // Set the number of items per page

  useEffect(() => {
    setQuery(params);
    if (params) {
      const queryParams = { q: params, page: currentPage }; // Add current page to the query
      dispatch(fetchNews(queryParams))
        .then((data) => {
          // Assuming data.meta contains the total hits or total pages
          const totalHits = data.meta.hits || 0; 
          setTotalPages(Math.ceil(totalHits / itemsPerPage)); // Calculate the total pages
        })
        .catch((error) => console.error("Error fetching news:", error));
    }
  }, [params, currentPage, dispatch]);

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

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <Navbar />
      <h1 className={"fw-bold mt-3"} style={{ textAlign: "center" }}>
        Search Results for "{query}"
      </h1>
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}

export default SearchPage;
