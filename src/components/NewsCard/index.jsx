import React, { useState } from "react";

function NewsCard(props) {
  const { newsData, onSave, savedNews = [], onRemove, isHomePage } = props;

  const [localSavedNews, setLocalSavedNews] = useState([]);

  const truncateChar = (text) => {
    return text.length > 150 ? `${text.substring(0, 150)}...` : text;
  };

  const isSaved = (newsItem) => {
    return (
      localSavedNews.some((saved) => saved.web_url === newsItem.web_url) ||
      savedNews.some((saved) => saved.web_url === newsItem.web_url)
    );
  };

  const handleSaveClick = (newsItem) => {
    if (!isSaved(newsItem)) {
      setLocalSavedNews((prevState) => [...prevState, newsItem]);
      onSave(newsItem);
    }
  };

  const handleRemoveClick = (newsItem) => {
    setLocalSavedNews((prevState) =>
      prevState.filter((saved) => saved.web_url !== newsItem.web_url)
    );
    onRemove(newsItem);
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {newsData.map((data, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow">
              <img
                src={
                  data.multimedia && data.multimedia.length > 0
                    ? `https://static01.nyt.com/${data.multimedia[0].url}`
                    : "images/Nopictureterbaru.png"
                }
                className="card-img-top"
                alt={data.headline.main}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title" style={{ minHeight: "50px" }}>
                  {data.headline.main || "No Title"}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {data.source || "Unknown Source"}
                </h6>
                <p className="card-text text-muted">
                  By {data.byline?.original || "Unknown Author"}
                </p>
                <p className="card-text flex-grow-1">
                  {truncateChar(data.abstract) || "No description available"}
                </p>
                <div className="mt-auto d-flex justify-content-between gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => window.open(data.web_url, "_blank")}
                  >
                    News Page
                  </button>
                  {isHomePage ? (
                    isSaved(data) ? (
                      <span className="text-success fw-bold">Saved!!</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleSaveClick(data)}
                      >
                        Save
                      </button>
                    )
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveClick(data)}
                    >
                      Unsave
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsCard;
