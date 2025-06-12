import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilmStore } from "../zustand/MovieStore";

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

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Movies</h1>
        <form onSubmit={handleNewSearch} className="search-form">
          <input
            type="text"
            value={currentQuery}
            onChange={handleInputChange}
            placeholder="Search for movies..."
            className="search-input"
          />
          <button type="submit" className="search-submit">
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
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && popularFilms.length === 0 && queryFromUrl && (
          <p>No movies found for "{queryFromUrl}"</p>
        )}

        {!loading && !error && popularFilms.length > 0 && (
          <div className="movies-grid">
            {popularFilms.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date?.split("-")[0]}</p>
                  <p>Rating: {movie.vote_average}/10</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
