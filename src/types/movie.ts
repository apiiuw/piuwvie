export interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  release_date: string | null;
  overview: string;
  genre_ids: number[];
  isBookmarked?: boolean;
}