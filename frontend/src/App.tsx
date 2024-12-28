import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import DetailsMovie from "./components/DetailsMovie";
import Genres from "./components/Genres";

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-black overflow-hidden">
        <h1 className="text-4xl font-rye font-bold flex justify-center bg-gradient-to-r from-indigo-800 via-purple-300 to-indigo-800 bg-clip-text text-transparent py-8 animate-shimmer relative z-10">
          <Link to="/" className="cursor-pointer">
            MOVIES LIBRARY
          </Link>
        </h1>

        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-800 to-purple-500 opacity-20 blur-3xl z-0"></div>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<DetailsMovie />} />
            <Route path="/genre/:id" element={<Genres />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
