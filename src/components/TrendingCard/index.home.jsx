import React from "react";

function TrendingCards({ newsData, onSave, savedNews = [], onRemove, isHomePage }) {
  const truncateChar = (text) => {
    return text.length > 150 ? `${text.substring(0, 150)}...` : text;
  };

  const isSaved = (newsItem) => {
    if (Array.isArray(savedNews)) {
      return savedNews.some((saved) => saved.web_url === newsItem.web_url);
    }
    return false;
  };

  const getImageUrl = (newsItem) => {
    if (newsItem.multimedia && newsItem.multimedia.length > 0) {
      return `https://static01.nyt.com/${newsItem.multimedia[0].url}`;
    }
    return "images/Nopictureterbaru.png";
  };

  return (
    <div className="container my-5">
      <div className="row text-center mb-4 flex-column-reverse flex-md-row">
        <div className="col-md-7 mb-4 mb-md-0">
          <div className="card shadow-lg border-0">
            {newsData.length > 0 && (
              <>
                <img
                  src={getImageUrl(newsData[0])}
                  className="card-img-top rounded"
                  alt="Trending Content"
                />
                <div className="card-body text-start">
                  <h5 className="card-title fw-bold text-primary">
                    {newsData[0].headline.main || "Featured Content"}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {newsData[0].source || "Source Unknown"}
                  </h6>
                  <p className="card-text">
                    <small className="text-muted">
                      By {newsData[0].byline.original || "Author Unknown"}
                    </small>
                  </p>
                  <p className="card-text">
                    {truncateChar(newsData[0].abstract) ||
                      "Discover the latest trends and stories shaping the world."}
                  </p>
                  <div className="d-flex justify-content-between gap-3">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => window.open(newsData[0].web_url)}
                    >
                      News Page
                    </button>
                    {isHomePage ? (
                      isSaved(newsData[0]) ? (
                        <span className="text-success pe-3">Saved!!</span>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => onSave(newsData[0])}
                        >
                          Save
                        </button>
                      )
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemove(newsData[0])}
                      >
                        Unsaved
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col-md-5">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-primary text-white fw-bold">
              The most searched for
            </div>
            <ul className="list-group list-group-flush">
              {newsData.slice(1, 5).map((newsItem, index) => (
                <li key={index} className="list-group-item">
                  {newsItem.headline.main || `Trending Topic ${index + 1}`}
                </li>
              ))}
            </ul>
            <div className="card-footer text-end">
              <a href="#" className="text-primary">
                View All Topics
              </a>
            </div>
            <div className="mt-4">
              <img
                src="https://via.placeholder.com/400x200?text=Advertisement+1"
                className="img-fluid rounded shadow-sm mb-3"
                alt="Advertisement 1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-start pb-3">
        <h2 className="fw-bold text-secondary">Trending Now</h2>
      </div>
      <div className="row g-3">
        {newsData.slice(1, 5).map((newsItem, index) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card mb-3 shadow gap-sm-2 gap-lg-4">
              <img
                src={getImageUrl(newsItem)}
                className="card-img-top rounded-top"
                alt={newsItem.headline.main || `Card ${index + 1}`}
                style={{ height: "110px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ height: "50px", overflow: "hidden" }}>
                  {newsItem.headline.main || `Trending #{index + 1}`}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{newsItem.source || "Source Unknown"}</h6>
                <p className="card-text" style={{ height: "100px", overflow: "hidden" }}>
                  {truncateChar(newsItem.abstract)}
                </p>
                <div className="d-flex justify-content-between gap-3">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => window.open(newsItem.web_url)}
                  >
                    News Page
                  </button>
                  {isHomePage ? (
                    isSaved(newsItem) ? (
                      <span className="text-success pe-3">Saved!!</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => onSave(newsItem)}
                      >
                        Save
                      </button>
                    )
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onRemove(newsItem)}
                    >
                      Unsaved
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

export default TrendingCards;
