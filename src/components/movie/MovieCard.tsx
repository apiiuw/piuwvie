import type { Movie } from "../../types/movie";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: Props) {
  const rating = movie.vote_average?.toFixed(1);

  const ratingColor =
    movie.vote_average >= 8
      ? "bg-green-500"
      : movie.vote_average >= 6
      ? "bg-yellow-500"
      : "bg-red-500";

  const getPosterUrl = (path: string | null) => {
    if (!path) return "/img/fallback.jpg";

    if (path.startsWith("http")) {
      return path;
    }

    return `${IMAGE_BASE_URL}${path}`;
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition duration-300"
    >
      <div
        className={`absolute top-3 left-3 ${ratingColor} text-white text-xs font-bold px-2 py-1 rounded-full shadow`}
      >
        ⭐ {rating}
      </div>

      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full h-72 object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/img/fallback.jpg";
        }}
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
          {movie.title}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          {movie.release_date}
        </p>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
}