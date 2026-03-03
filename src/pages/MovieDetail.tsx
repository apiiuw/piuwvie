import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPageTitle } from "../utils/setPageTitle";
import { useMovies } from "../context/MovieContext";
import { ArrowLeft, Settings, Trash2, Bookmark } from "lucide-react";

import CustomizeMovieModal from "../components/movie/modals/CustomizeMovieModal";
import DeleteMovieModal from "../components/movie/modals/DeleteMovieModal";
import Toast from "../components/feedback/Toast";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, genres, updateMovie, deleteMovie, toggleBookmark } = useMovies();
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [toastType, setToastType] = useState<"add" | "remove" | null>(null);

  const movie = useMemo(() => {
    return movies.find((m) => m.id === Number(id));
  }, [id, movies]);

  useEffect(() => {
    if (movie) {
      setPageTitle(`${movie.title}`);
    }
  }, [movie]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const similarMovies = useMemo(() => {
    if (!movie) return [];

    return movies
      .filter(
        (m) =>
          m.id !== movie.id &&
          m.genre_ids?.some((g) =>
            movie.genre_ids?.includes(g)
          )
      )
      .slice(0, 8);
  }, [movie, movies]);

  if (!movie) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 text-white">
        <h2 className="text-2xl font-bold">
          Movie not found
        </h2>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-600 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-white">

      <div
        className="relative min-h-screen md:min-h-0 md:h-[70vh]
                  bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-16 left-14 
                    z-30 hidden md:flex items-center gap-2
                    bg-[#fe717a]/70 hover:bg-[#fe717a]/90
                    px-4 py-2 rounded-full text-sm transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="relative z-20 w-full max-w-8xl mx-auto pt-0 md:pt-20
                        px-6 md:px-14
                        flex flex-col md:flex-row
                        items-center md:items-center
                        gap-8 md:gap-14">

          <img
            src={`${POSTER_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-44 md:w-64 rounded-xl shadow-2xl"
          />

          <div className="text-center md:text-left max-w-xl space-y-4">

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                {movie.title}
              </h1>

              <div className="relative group flex items-center">

                <button
                  onClick={() => {
                    toggleBookmark(movie.id);

                    if (movie.isBookmarked) {
                      setToastType("remove");
                    } else {
                      setToastType("add");
                    }
                  }}
                  className="
                    transition-transform active:scale-90
                  "
                  aria-label={
                    movie.isBookmarked
                      ? "Remove from bookmark"
                      : "Add to bookmark"
                  }
                >
                  <Bookmark
                    size={26}
                    className={`transition-all duration-200 ${
                      movie.isBookmarked
                        ? "fill-red-600 text-red-600 scale-110"
                        : "text-gray-300 hover:text-red-500"
                    }`}
                  />
                </button>

                {/* Tooltip */}
                <div
                  className="
                    absolute -top-12 left-1/2 -translate-x-1/2
                    flex flex-col items-center
                    opacity-0 scale-95 translate-y-2
                    group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                    group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0
                    transition-all duration-200 delay-150
                    pointer-events-none
                  "
                >
                  {/* Tooltip Box */}
                  <div
                    className="
                      px-3 py-1.5
                      text-xs font-medium
                      rounded-lg
                      shadow-lg
                      whitespace-nowrap
                      dark:bg-gray-900 dark:text-white
                      bg-white text-gray-900
                    "
                  >
                    {movie.isBookmarked
                      ? "Remove Bookmark"
                      : "Add to Bookmark"}
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      w-2 h-2
                      rotate-45
                      -mt-1
                      dark:bg-gray-900
                      bg-white
                    "
                  />
                </div>

              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm">
              <span className="bg-red-600 px-3 py-1 rounded-full">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              <span>{movie.release_date}</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {movie.genre_ids?.map((genreId) => {
                const genre = genres.find(g => g.id === genreId);
                return genre ? (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                  >
                    {genre.name}
                  </span>
                ) : null;
              })}
            </div>

            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex justify-center md:justify-start gap-4 pt-2">

              <button
                onClick={() => setOpenModal(true)}
                className="
                  flex items-center gap-2
                  px-5 py-2
                  bg-gradient-to-r from-red-600 to-pink-600
                  hover:scale-[1.03]
                  active:scale-[0.97]
                  rounded-lg transition
                "
              >
                <Settings size={16} />
                Customize
              </button>

              <button
                onClick={() => setOpenDelete(true)}
                className="
                  flex items-center gap-2
                  px-5 py-2
                  bg-red-600
                  hover:scale-[1.03]
                  active:scale-[0.97]
                  rounded-lg transition
                "
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="p-10 bg-gray-100 dark:bg-gray-900 transition">
          <h2 className="text-2xl font-bold mb-6 dark:text-white text-gray-900 transition">
            Similar Movies 🎬
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarMovies.map((m) => (
              <div
                key={m.id}
                onClick={() => navigate(`/movie/${m.id}`)}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={`${POSTER_BASE}${m.poster_path}`}
                  alt={m.title}
                  className="
                    w-full h-72 object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute inset-0
                    bg-black/10
                    group-hover:bg-black/60
                    transition-all duration-500
                  "
                ></div>

                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <h3
                    className="
                      text-white font-bold text-lg
                      opacity-90 group-hover:opacity-100
                      transition duration-300
                      drop-shadow-lg
                    "
                  >
                    {m.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toastType && (
        <Toast
          show={!!toastType}
          type={toastType}
          onClose={() => setToastType(null)}
        />
      )}

      <CustomizeMovieModal
        open={openModal}
        movie={movie}
        onClose={() => setOpenModal(false)}
        onSave={(data) =>
          updateMovie(movie.id, {
            title: data.title,
            overview: data.description,
            poster_path: data.posterUrl,
            backdrop_path: data.posterUrl,
            release_date: data.releaseDate,
            vote_average: data.rating,
            genre_ids: data.genreIds,
          })
        }
      />

      <DeleteMovieModal
        open={openDelete}
        movieTitle={movie.title}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          deleteMovie(movie.id);
          navigate("/");
        }}
      />

    </div>
  );
}