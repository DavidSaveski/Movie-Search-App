import { Link } from "react-router-dom";
import "../styles/NavStyle.css";
import { useFilmStore } from "../zustand/MovieStore";

export default function Navigation() {
  const { fetchPopularMovies, searchMovies } = useFilmStore();

  const handleQueryChange = (query: string) => {
    if (query.length >= 3) {
      searchMovies(query);
    } else if (query.length === 0) {
      fetchPopularMovies();
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-container wrap">
        <Link to={"/"}>
          <img src="/public/Images/logo.png" alt="Logo" />
        </Link>
        <ul>
          <li>Home</li>
          <li>Post</li>
          <li>About</li>
        </ul>
        <input
          id="search"
          type="text"
          placeholder="Search Movie"
          onChange={(e) => handleQueryChange(e.target.value)}
        />
      </div>
    </nav>
  );
}
