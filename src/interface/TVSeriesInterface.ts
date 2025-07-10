export type TVSeriesType = {
  id: number;
  name: string;
  overview: string;
  original_name: string;
  original_language: string;
  origin_country: string[];
  first_air_date: string | null;
  last_air_date: string | null;
  status: string;
  type: string;
  poster_path: string | null;
  backdrop_path: string | null;
  // Episodes and Seasons
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  seasons: Season[];
  // Next/Last episodes
  next_episode_to_air: Episode | null;
  last_episode_to_air: Episode | null;
};
export type TVSeriesSearchResult = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string | null;
  origin_country: string[];
  original_language: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
};

export type TVSeriesResponse = {
  page: number;
  results: TVSeriesSearchResult[];
  total_pages: number;
  total_results: number;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
  credit_id: string;
  gender: number;
  profile_path: string | null;
  known_for_department: string;
};

export type Season = {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};
export type Episode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string | null;
  episode_number: number;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
};
