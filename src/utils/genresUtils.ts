export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export type GenreId = keyof typeof GENRE_MAP;

export const getGenreNames = (genreIds: number[]): string[] => {
  return genreIds
    .filter((id) => id in GENRE_MAP)
    .map((id) => GENRE_MAP[id as GenreId]);
};

export const getGenreString = (genreIds: number[]): string => {
  return getGenreNames(genreIds).join(", ");
};

// Get first genre only
export const getPrimaryGenre = (genreIds: number[]): string => {
  const genres = getGenreNames(genreIds);
  return genres.length > 0 ? genres[0] : "Unknown";
};
