import React from "react";
import "./Banner.css"; 

function HeaderProgramming() {
  return (
    <header>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade coursel-Handle border border-primary"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/BannerProgramer1.jpg" className="d-block coursel-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/BannerProgramer2.jpg" className="d-block coursel-img" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="images/BannerProgramer1.jpg" className="d-block coursel-img" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </header>
  );
}

export default HeaderProgramming;
