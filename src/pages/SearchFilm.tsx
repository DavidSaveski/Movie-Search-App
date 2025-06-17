import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilmStore } from "../zustand/MovieStore";
import "../styles/SearchFilmStyle.css";
import { getImageUrl } from "../utils/imageUrlUtils";
import Filters from "../components/Filters";

export default function SearchFilm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { popularFilms, searchMovies, loading, error } = useFilmStore();
  const [currentQuery, setCurrentQuery] = useState("");

  const queryFromUrl = searchParams.get("q") || "";

  useEffect(() => {
    if (queryFromUrl) {
      setCurrentQuery(queryFromUrl);
      searchMovies(queryFromUrl);
    }
  }, [queryFromUrl, searchMovies]);

  const handleNewSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      setSearchParams({ q: currentQuery.trim() });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(e.target.value);
  };
  const applyFilterButton = () => {
    console.log("clicked on the button");
  };
  return (
    <div className="search-page wrap">
      <div className="search-header">
        <h1>Search Movies</h1>
        <form onSubmit={handleNewSearch} className="search-form">
          <span className="form-span">
            <input
              id="search"
              type="text"
              value={currentQuery}
              onChange={handleInputChange}
              placeholder="Search for movies..."
              style={{ border: "none", marginLeft: "16px", width: "95%" }}
            />
          </span>
          <button type="submit" className="form-search-button">
            Search
          </button>
        </form>
        {queryFromUrl && (
          <p className="search-info">
            Showing results for: <strong>"{queryFromUrl}"</strong>
          </p>
        )}
      </div>

      <div className="search-results">
        <Filters onApplyClick={applyFilterButton} />
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && popularFilms.length === 0 && queryFromUrl && (
          <p>No movies found for "{queryFromUrl}"</p>
        )}

        {!loading && !error && popularFilms.length > 0 && (
          <section className="movie-grid">
            {popularFilms.map((film) => (
              <div key={film.id} className="movie-card">
                <img
                  src={getImageUrl(film.poster_path, "w200")}
                  alt={film.title}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />

                <div className="film-info">
                  <h3>{film.title}</h3>
                  <p>{film.release_date?.split("-")[0]}</p>
                  <p>Rating: {film.vote_average}/10</p>
                  {film.overview}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
