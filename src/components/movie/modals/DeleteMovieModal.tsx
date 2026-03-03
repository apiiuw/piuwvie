import { useEffect, useState } from "react";
import { X, AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  movieTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteMovieModal({
  open,
  movieTitle,
  onClose,
  onConfirm,
}: Props) {
  const [render, setRender] = useState(false);
  const [closing, setClosing] = useState(false);

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

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-md bg-black/40 transition-opacity ${
          closing ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`relative z-10 w-[90%] md:w-[450px] rounded-2xl p-6 shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 transition-all duration-200 ${
          closing ? "opacity-0 scale-95 translate-y-4" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            <h2 className="text-lg font-bold">Confirm Delete</h2>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 transition" />
          </button>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-600">
            {movieTitle}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}