import { useEffect, useState } from "react";
import { BookmarkCheck, BookmarkX, CheckCircle } from "lucide-react";

interface Props {
  show: boolean;
  type: "add" | "remove" | "success";
  onClose: () => void;
  duration?: number;
}

const config = {
  add: {
    icon: BookmarkCheck,
    title: "Added to Bookmark",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40",
    progress: "bg-red-600",
  },
  remove: {
    icon: BookmarkX,
    title: "Removed from Bookmark",
    color: "bg-gray-200 text-gray-600 dark:bg-gray-700",
    progress: "bg-gray-500",
  },
  success: {
    icon: CheckCircle,
    title: "Movie Successfully Created",
    color: "bg-green-100 text-green-600 dark:bg-green-900/40",
    progress: "bg-green-600",
  },
};

export default function Toast({
  show,
  type,
  onClose,
  duration = 2500,
}: Props) {
  const [visible, setVisible] = useState(false);
  const { icon: Icon, title, color, progress } = config[type];

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed z-[100] top-6 left-1/2 -translate-x-1/2 md:top-6 md:right-6 md:left-auto md:translate-x-0 w-[90%] max-w-[320px]">
      <div className={`transition-all duration-300 ${visible ? "animate-slideIn" : "animate-slideOut"}`}>
        <div className="relative flex items-center gap-4 p-4 rounded-xl shadow-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${color}`}>
            <Icon size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your list has been updated
            </p>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700">
            <div className={`h-full ${progress} animate-progress`} />
          </div>
        </div>
      </div>
    </div>
  );
}