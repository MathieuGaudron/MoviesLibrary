import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Navbar from "./Navbar";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const Films: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    if (searchTerm.trim() === "") {
      fetchMovies();
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchTerm.trim() === "") {
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${searchTerm}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to search movies:", error);
      }
    };

    searchMovies();
  }, [searchTerm, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="relative h-screen overflow-y-auto">
      <Navbar />

      <div className="p-8 min-h-screen font-sans">

      <div className="flex justify-center items-center mt-10">
        <input
          type="text"
          placeholder="Rechercher un film . . ."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="w-1/2 px-4 py-2 my-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
        />
    </div>

        <h2 className="text-white font-bold font-inter text-3xl mt-20 mb-10">
          Tous vos films favoris
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="relative rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full  object-contain"
                />
              )}
              <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900">
                <h2 className="text-lg truncate text-white font-bold">
                  {movie.title}
                </h2>
                <p className="text-gray-300">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Films;
