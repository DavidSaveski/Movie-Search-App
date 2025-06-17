import { useState } from "react";
import { GENRE_MAP } from "../utils/genresUtils";
import "../styles/FilterSection.css";

type Props = {
  onApplyClick: () => void;
};

export default function Filters({ onApplyClick }: Props) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("popularity");

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSortBy("popularity");
  };

  const genreEntries = Object.entries(GENRE_MAP);

  return (
    <div className="filters-container filters-grid">
      <div className="filters-header">
        <h2 className="filters-title">Filters</h2>
        <button onClick={clearFilters} className="clear-button">
          Clear All
        </button>
      </div>

      {/* Genres Filter */}
      <div className="filter-section">
        <h3 className="section-title">Genres</h3>
        <div className="genres-grid">
          {genreEntries.map(([id, name]) => (
            <button
              key={id}
              onClick={() => handleGenreToggle(parseInt(id))}
              className={`genre-button ${
                selectedGenres.includes(parseInt(id)) ? "selected" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        {selectedGenres.length > 0 && (
          <div className="selected-genres-text">
            Selected: {selectedGenres.map((id) => GENRE_MAP[id]).join(", ")}
          </div>
        )}
      </div>

      {/* Sort By Filter */}
      <div className="filter-section">
        <h3 className="section-title">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select-input"
        >
          <option value="popularity">Popularity</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Rating</option>
          <option value="title">Title</option>
          <option value="revenue">Box Office</option>
        </select>
      </div>

      <button className="apply-button" onClick={onApplyClick}>
        Apply Filters
      </button>
    </div>
  );
}
