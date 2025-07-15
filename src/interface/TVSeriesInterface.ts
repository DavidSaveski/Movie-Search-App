export type TVSeriesType = {
  id: number;
  name: string;
  overview: string;
  original_name: string;
  original_language: string;
  origin_country: string[];
  status: string;
  type: string;
  poster_path: string | null;
  backdrop_path: string | null;
};
export type TVSeriesDetails = TVSeriesType & {
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  seasons: Season[];
  next_episode_to_air: Episode | null;
  last_episode_to_air: Episode | null;
  first_air_date: string | null;
  last_air_date: string | null;
};

export type TVSeriesResponse = {
  page: number;
  results: TVSeriesDetails[];
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
