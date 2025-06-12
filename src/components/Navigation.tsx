import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/NavStyle.css";

export default function Navigation() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
          </Link>
          <li>Post</li>
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
