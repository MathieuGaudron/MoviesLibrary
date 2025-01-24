import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const GenreDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<"movie" | "tv">("movie");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMediaByGenre = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}&language=fr-FR&with_genres=${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMedia(data.results || []);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch media by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaByGenre();
  }, [id, category]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto">
      <Navbar />
      <div className="relative min-h-screen bg-black text-white">
        <div className="p-8">
          <div className="text-center mb-16 mt-20">
            <h1 className="text-3xl font-bold mb-8">
              {category === "movie" ? "Films" : "Séries TV"} - Genre ID {id}
            </h1>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCategory("movie")}
                className={`px-4 py-2 rounded font-bold transition ${
                  category === "movie"
                    ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
                    : "bg-gray-700"
                } hover:bg-purple-800`}
              >
                Films
              </button>
              <button
                onClick={() => setCategory("tv")}
                className={`px-4 py-2 rounded font-bold transition ${
                  category === "tv"
                    ? "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
                    : "bg-gray-700"
                } hover:bg-purple-800`}
              >
                Séries TV
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center">Chargement des contenus...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/${category === "movie" ? "movie" : "serie"}/${item.id}`
                    )
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full  object-contain"
                  />
                  <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900">
                    <h2 className="text-center font-bold">
                      {item.title || item.name}
                    </h2>
                    <p className="text-center text-gray-400">
                      {item.release_date || item.first_air_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="my-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GenreDetails;
