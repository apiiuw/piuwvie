import { useEffect, useState } from "react";
import { fetchGenres } from "../../api/tmdb";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  selectedGenre: number | null;
  onSelect: (id: number | null) => void;
}

export default function GenreFilter({
  selectedGenre,
  onSelect,
}: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };

    loadGenres();
  }, [fetchGenres]);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
          selectedGenre === null
            ? "bg-red-500 text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
            selectedGenre === genre.id
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}