import type { ReactNode } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface GenreType {
  id: number;
  name: string;
}

interface Props {
  children: ReactNode;
  selectedGenre: GenreType | null;
  onGenreChange: (genre: GenreType | null) => void;
}

export default function Layout({
  children,
  selectedGenre,
  onGenreChange,
}: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar
        selectedGenre={selectedGenre}
        onGenreChange={onGenreChange}
      />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}