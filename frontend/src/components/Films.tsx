import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

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

    const delayDebounceFn = setTimeout(() => {
      searchMovies();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-8 min-h-screen font-sans">
      

      <h2 className="text-white font-bold text-3xl mt-20 mb-10">Populaires</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
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
                className="w-full h-96 object-fill"
              />
            )}
            <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900">
              <h2 className="text-lg truncate text-white font-bold">{movie.title}</h2>
              <p className="text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </Link>
        ))}
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