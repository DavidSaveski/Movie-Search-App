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
export type FilmDetailsPlotFull = FilmType & {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
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
export const isTMDbError = (
  response: unknown
): response is TMDbErrorResponse => {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    "status_code" in response &&
    "status_message" in response &&
    (response as TMDbErrorResponse).success === false &&
    typeof (response as TMDbErrorResponse).status_code === "number" &&
    typeof (response as TMDbErrorResponse).status_message === "string"
  );
};
