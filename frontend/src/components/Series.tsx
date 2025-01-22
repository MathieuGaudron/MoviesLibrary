import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Navbar from "./Navbar";

interface Serie {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
}

const API_KEY = "49c4a00d23ea0f1e33aac25430e1195d";

const Series: React.FC = () => {
  const [serie, setSeries] = useState<Serie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr-FR&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSeries(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch TV serie:", error);
      }
    };

    if (searchTerm.trim() === "") {
      fetchSeries();
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    const searchSeries = async () => {
      if (searchTerm.trim() === "") {
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=fr-FR&query=${searchTerm}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSeries(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to search TV serie:", error);
      }
    };

    searchSeries();
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
            placeholder="Rechercher une série TV . . ."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="w-1/2 px-4 py-2 my-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  hover:ring-violet-600 focus:border-transparent"
          />
        </div>

        <h2 className="text-white font-bold font-inter text-3xl mt-20 mb-10">
          Toutes vos séries TV favorites
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {serie.map((serie) => (
            <Link
              to={`/serie/${serie.id}`}
              key={serie.id}
              className="relative rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              {serie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                  className="w-full  object-contain"
                />
              )}
              <div className="p-4 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900">
                <h2 className="text-lg truncate text-white font-bold">
                  {serie.name}
                </h2>
                <p className="text-gray-300">
                  {new Date(serie.first_air_date).getFullYear()}
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

export default Series;
