import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const links = [
    { title: "Indonesia", path: "/" },
    { title: "Programming", path: "/programming" },
    { title: "Covid-19", path: "/covid-19" },
    { title: "Saved", path: "/saved" },
  ];

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="d-flex gap-2 align-items-center">
          <img src="../images/Logo.png" alt="Logo" style={{ height: "39px" }} />
          <NavLink to="/" className="navbar-brand fw-bold text-black">HeadlineID</NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex justify-content-center gap-lg-3 flex-lg-row flex-column">
            {links.map((link) => (
              <li className="nav-item" key={link.title}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold nav-link-active" : "nav-link fw-bold text-black"
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
