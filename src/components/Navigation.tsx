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
      borderBottom: "2px solid #fb923c",
      display: "list-item",
      paddingLeft: "10px",
      width: "100%",
      marginLeft: "-5px",
    },
  };

  return (
    <nav className="navbar">
      <div className="navbar-container wrap">
        <Link to={"/"}>
          <img src="/public/Images/logo.png" alt="Logo" />
        </Link>
        <ul>
          <Link to={"/"} className="nav-buttons">
            Home
            <span style={currentPath === "/" ? style.active : {}}></span>
          </Link>
          <Link to={"/search"} className="nav-buttons">
            Search
            <span style={currentPath === "/search" ? style.active : {}}></span>
          </Link>
          <li>About</li>
        </ul>
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
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}
