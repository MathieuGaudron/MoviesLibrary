import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

interface Genre {
  id: number;
  name: string;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const Genres: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [category, setCategory] = useState<"movie" | "tv">("movie");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${category}/list?api_key=${API_KEY}&language=fr-FR`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [category]);

  const handleCategoryChange = (newCategory: "movie" | "tv") => {
    setCategory(newCategory);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Navbar />
      <div className="text-center mb-16 mt-24">
        {/* <h1 className="text-3xl font-bold mb-10">Explorez les genres</h1> */}
        <div className="flex justify-center gap-4">
        <button
  onClick={() => handleCategoryChange("movie")}
  className={`px-4 py-2 rounded font-bold transition ${
    category === "movie"
      ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
      : ""
  }`}
>
  Films
</button>
<button
  onClick={() => handleCategoryChange("tv")}
  className={`px-4 py-2 rounded font-bold transition ${
    category === "tv"
      ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
      : ""
  }`}
>
  Séries TV
</button>


        </div>
      </div>

      {loading ? (
        <div className="text-center">Chargement des genres...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-6 text-lg">
          {genres.map((genre) => (
            <Link
            to={`/genre/${genre.id}`}
            key={genre.id}
            className="p-4 rounded-lg shadow hover:bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 transition transform hover:scale-105"
          >
            <h2 className="text-center font-bold">{genre.name}</h2>
          </Link>
          
          ))}
        </div>
      )}
      </div>
  );
};

export default Genres;
