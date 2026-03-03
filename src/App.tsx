import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout";
import Home from "./pages/Home";
import Bookmark from "./pages/Bookmark";
import CreateMovie from "./pages/CreateMovie";
import MovieDetail from "./pages/MovieDetail";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <BrowserRouter>
      <Layout selectedGenre={selectedGenre} onGenreChange={setSelectedGenre}>
        <Routes>
          <Route path="/" element={<Home selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/create" element={<CreateMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;