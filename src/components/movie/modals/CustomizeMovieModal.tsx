import { useEffect, useState } from "react";
import { useMovies } from "../../../context/MovieContext";
import { X, Film } from "lucide-react";

interface Props {
  open: boolean;
  movie: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EditMovieModal({ open, movie, onClose, onSave }: Props) {
  const { genres } = useMovies();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [render, setRender] = useState(false);
  const [closing, setClosing] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition";

  useEffect(() => {
    if (open) {
      setRender(true);
      setClosing(false);
    } else if (render) {
      setClosing(true);
      const t = setTimeout(() => setRender(false), 200);
      return () => clearTimeout(t);
    }
  }, [open, render]);

  useEffect(() => {
    if (!movie || !open) return;

    setTitle(movie.title ?? "");
    setDescription(movie.overview ?? "");
    setPosterUrl(
      movie.poster_path?.startsWith("http")
        ? movie.poster_path
        : movie.poster_path
        ? `${IMAGE_BASE}${movie.poster_path}`
        : ""
    );
    setReleaseDate(movie.release_date ?? "");
    setRating(movie.vote_average ?? 0);
    setSelectedGenreIds(movie.genre_ids ?? []);
  }, [movie, open]);

  if (!render) return null;

  const removeGenre = (id: number) =>
    setSelectedGenreIds((prev) => prev.filter((g) => g !== id));

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-md bg-black/40 transition-opacity ${
          closing ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`relative z-10 w-[95%] md:w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 transition-all duration-200 ${
          closing ? "opacity-0 scale-95 translate-y-6" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
              <Film size={18} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold">Customize Movie</h2>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="space-y-6">
          <input
            value={title}
            placeholder="Enter movie title..."
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <select
                value=""
                onChange={(e) => {
                  const id = Number(e.target.value);
                  if (!selectedGenreIds.includes(id))
                    setSelectedGenreIds((prev) => [...prev, id]);
                }}
                className={inputStyle}
              >
                <option value="">Select Genre</option>
                {genres
                  .filter((g) => !selectedGenreIds.includes(g.id))
                  .map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
              </select>

              {selectedGenreIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 md:hidden">
                  {selectedGenreIds.map((id) => {
                    const genre = genres.find((g) => g.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 text-sm"
                      >
                        {genre?.name}
                        <button onClick={() => removeGenre(id)}>✕</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <input
              type="date"
              min="1900-01-01"
              max={today}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className={inputStyle}
            />

            {selectedGenreIds.length > 0 && (
              <div className="hidden md:flex md:col-span-2 flex-wrap gap-2">
                {selectedGenreIds.map((id) => {
                  const genre = genres.find((g) => g.id === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 text-sm"
                    >
                      {genre?.name}
                      <button onClick={() => removeGenre(id)}>✕</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Movie Rating:
              <span className="ml-2 font-semibold text-red-600">
                ⭐ {rating.toFixed(1)}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <input
            value={posterUrl}
            placeholder="Enter poster image URL..."
            onChange={(e) => setPosterUrl(e.target.value)}
            className={inputStyle}
          />

          <textarea
            value={description}
            placeholder="Write movie description..."
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={inputStyle}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-300 dark:bg-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onSave({
                  title,
                  description,
                  posterUrl,
                  releaseDate,
                  rating,
                  genreIds: selectedGenreIds,
                });
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}