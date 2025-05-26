export type FilmType = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  video: boolean;
};

export type FilmsResponseType = {
  page: number;
  results: FilmType[];
  total_pages: number;
  total_results: number;
};
export type FilmDetailsPlotFull = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  original_language: string;
  video: boolean;
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  imdb_id: string | null;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  iso_639_1: string;
  name: string;
  english_name: string;
};
export type Rating = {
  Source: string;
  Value: string;
};

export type TMDbErrorResponse = {
  success: boolean;
  status_code: number;
  status_message: string;
};

export const isTMDbError = (response: any): response is TMDbErrorResponse => {
  return (
    response.success === false &&
    response.status_code &&
    response.status_message
  );
};

export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) return "/placeholder-movie.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

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
} as const;

export type GenreId = keyof typeof GENRE_MAP;
