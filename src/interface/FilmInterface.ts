export type FilmType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type FilmsResponseType = {
  Search: FilmType[];
  totalResults: string;
  Response: string;
  Error: string;
};
export type FilmDetailsPlotFull = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type Rating = {
  Source: string;
  Value: string;
};

export const OMDBResponse = {
  True: "True",
  False: "False",
} as const;

export type OMDBResponse = keyof typeof OMDBResponse;
