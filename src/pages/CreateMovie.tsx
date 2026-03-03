import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../utils/setPageTitle";
import { useMovies } from "../context/MovieContext";
import { Film } from "lucide-react";

export default function CreateMovie() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const { addMovie, genres } = useMovies();

  const [title, setTitle] = useState("");
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [rating, setRating] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setPageTitle("Create Film");
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMovie = {
    id: Date.now(),
    title,
    backdrop_path: posterUrl || null,
    poster_path: posterUrl || null,
    vote_average: rating,
    release_date: releaseDate || null,
    overview: description,
    genre_ids: selectedGenreIds,
    isBookmarked: false,
    };

    addMovie(newMovie);

    navigate("/", { state: { created: true } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

      {/* HERO */}
      <div className="relative h-[35vh] flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-600">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Create New Film 🎬
          </h1>
          <p className="text-white/80">
            Add your movie and expand the PiuwVie universe
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <Film size={22} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Movie Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-500"
            />

            <div className="grid md:grid-cols-2 gap-6">

            <div className="flex flex-col">
                <select
                value=""
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!selectedGenreIds.includes(value)) {
                    setSelectedGenreIds([...selectedGenreIds, value]);
                    }
                }}
                className="w-full px-4 py-3 rounded-xl border text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-500"
                >
                <option value="">Select Genre</option>
                {genres
                    .filter((genre) => !selectedGenreIds.includes(genre.id))
                    .map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
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
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 text-sm font-medium"
                        >
                        {genre?.name}
                        <button
                            type="button"
                            onClick={() =>
                            setSelectedGenreIds(
                                selectedGenreIds.filter((gId) => gId !== id)
                            )
                            }
                            className="ml-1 text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                        </div>
                    );
                    })}
                </div>
                )}
            </div>

            <input
                type="date"
                required
                min="1900-01-01"
                max={today}
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-500"
            />

            {selectedGenreIds.length > 0 && (
                <div className="hidden md:flex md:col-span-2 flex-wrap gap-2">
                {selectedGenreIds.map((id) => {
                    const genre = genres.find((g) => g.id === id);
                    return (
                    <div
                        key={id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 text-sm font-medium"
                    >
                        {genre?.name}
                        <button
                        type="button"
                        onClick={() =>
                            setSelectedGenreIds(
                            selectedGenreIds.filter((gId) => gId !== id)
                            )
                        }
                        className="ml-1 text-red-500 hover:text-red-700"
                        >
                        ✕
                        </button>
                    </div>
                    );
                })}
                </div>
            )}

            </div>

            <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              type="text"
              required
              placeholder="Poster Image URL"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-500"
            />

            <textarea
              rows={4}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-gray-700 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              Save Movie
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}