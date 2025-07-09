import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFilmStore } from "../zustand/FilmStore";
import "../styles/SearchFilmStyle.css";
import { getImageUrl } from "../utils/imageUrlUtils";
import Filters from "../components/Filters";
import type { FilmType, FilterData } from "../interface/FilmInterface";
import { formatReleaseDate } from "../utils/formatDate";
import { getMovieGenres } from "../utils/genresUtils";

const MOVIES_PER_PAGE = 15;

const style = {
  active: {
    borderBottom: "2px solid #fb923c",
    display: "list-item",
    paddingLeft: "10px",
    width: "100%",
    marginLeft: "-5px",
  },
};

export default function SearchFilm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { popularFilms, topRatedFilms, searchFilms, loading, error } =
    useFilmStore();
  const [currentQuery, setCurrentQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterData>({
    genres: [],
    sortBy: "popularity",
  });
  const [displayCount, setDisplayCount] = useState(MOVIES_PER_PAGE);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const queryFromUrl = searchParams.get("q") || "";

  useEffect(() => {
    if (queryFromUrl.trim() !== "") {
      setCurrentQuery(queryFromUrl);
      searchFilms(queryFromUrl);
    } else {
      setCurrentQuery("");
    }
    setDisplayCount(MOVIES_PER_PAGE);
  }, [queryFromUrl, searchFilms, activeFilters]);

  const handleNewSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      setSearchParams({ q: currentQuery.trim() });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentQuery(value);

    if (value.trim() === "") {
      setSearchParams({});
    }
  };

  const handleApplyFilters = (filterData: FilterData) => {
    setActiveFilters(filterData);
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + MOVIES_PER_PAGE);
  };

  const filteredAndSortedMovies = useMemo(() => {
    let source: FilmType[] = [];

    if (queryFromUrl && queryFromUrl.trim().length > 0) {
      source = [...popularFilms, ...topRatedFilms].filter((film) =>
        film.title.toLowerCase().includes(queryFromUrl.toLowerCase())
      );
    } else {
      source = [...popularFilms, ...topRatedFilms];
    }
    // Filter by Genres
    let filtered = [...source];
    if (activeFilters.genres.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.some((genreId) =>
          activeFilters.genres.includes(genreId)
        )
      );
    }

    // Sort films
    filtered.sort((a, b) => {
      switch (activeFilters.sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "release_date":
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        case "vote_average":
          return b.vote_average - a.vote_average;
        case "title":
          return a.title.localeCompare(b.title);
        case "revenue":
          console.warn("Revenue sorting not available for basic film data");
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

    return filtered;
  }, [popularFilms, topRatedFilms, activeFilters, queryFromUrl]);

  const moviesToDisplay = filteredAndSortedMovies.slice(0, displayCount);
  const hasMoreMovies = displayCount < filteredAndSortedMovies.length;

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
              className="form-input"
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

      {/* View Toggle */}
      <div className="view-style">
        <button
          className={`viewButton ${viewMode === "grid" ? style.active : ""}`}
          onClick={() => setViewMode("grid")}
        >
          Detailed View
        </button>
        <button
          className={`viewButton ${viewMode === "list" ? style.active : ""}`}
          onClick={() => setViewMode("list")}
        >
          List View
        </button>
      </div>
      <div className="search-results">
        <Filters onApplyClick={handleApplyFilters} />

        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && popularFilms.length === 0 && queryFromUrl && (
          <p>No movies found for "{queryFromUrl}"</p>
        )}
        {/* Movies Container */}
        {!loading && !error && moviesToDisplay.length > 0 && (
          <section
            className={viewMode === "grid" ? "moviesDetails" : "moviesList"}
          >
            {moviesToDisplay.map((film, index) => (
              <div key={`${film.id}-${index}`} className="movie-card">
                <div className="poster">
                  <Link to={`/details/${film.id}`}>
                    <img
                      src={getImageUrl(film.poster_path, "original")}
                      alt={film.title}
                      onError={(e) => {
                        e.currentTarget.alt = `${film.title.slice(0, 21)}...`;
                      }}
                    />
                  </Link>
                </div>
                <div className="film-info">
                  <h3 style={{ marginTop: "10px" }}>{film.title}</h3>
                  <div>
                    {getMovieGenres(film.genre_ids).map((genre) => (
                      <span key={genre} className="genres-style">
                        {genre}
                      </span>
                    ))}
                  </div>
                  {viewMode === "list" ? (
                    <>
                      <p>{formatReleaseDate(film.release_date)}</p>
                      <p>Rating: {film.vote_average}/10</p>
                      <p>{film.popularity.toFixed(2)}</p>
                      <p>{film.overview.slice(0, 300)}...</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
            {!loading && !error && hasMoreMovies && (
              <div className="show-more-container">
                <button
                  onClick={handleShowMore}
                  className="show-more-button"
                  style={{}}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007bff")
                  }
                >
                  Show More
                </button>
              </div>
            )}
          </section>
        )}

        {!loading &&
          !error &&
          filteredAndSortedMovies.length === 0 &&
          popularFilms.length > 0 && (
            <p>No movies match the selected filters.</p>
          )}
      </div>
    </div>
  );
}
