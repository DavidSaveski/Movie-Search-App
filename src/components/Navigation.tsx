import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/NavStyle.css";

export default function Navigation() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const style = {
    active: {
      color: "blue",
    },
  };

  return (
    <nav className="navbar">
      <div className="navbar-container wrap">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="logo">
            <i
              className="fa-solid fa-star fa-lg"
              style={{ marginRight: "5px" }}
            ></i>
            <p>
              <strong>Movie Search App</strong>
            </p>
          </div>
        </Link>
        <div className="navButtons">
          <Link
            to={"/"}
            className="nav-buttons"
            style={currentPath === "/" ? style.active : {}}
          >
            <p>Home</p>
          </Link>
          <Link
            to={"/search"}
            className="nav-buttons"
            style={currentPath === "/search" ? style.active : {}}
          >
            Search
          </Link>
          <Link to={"/"} className="nav-buttons">
            About
          </Link>
        </div>
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              id="search"
              type="text"
              placeholder="Search Movie"
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
            <button
              className="search-icon"
              style={{ border: "none", backgroundColor: "inherit" }}
            >
              <i className="fa-solid fa-magnifying-glass  "></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
