import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from "./components/Home";
import Films from "./components/Films";
import DetailsMovie from "./components/DetailsMovie";
import Series from "./components/Series";
import DetailsSerie from "./components/DetailsSerie";
import Genres from "./components/Genres";
import GenreDetails from "./components/GenreDetails";
import Signup from "./components/form/Signup";
import Login from "./components/form/Login";


const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-800 opacity-20 blur-3xl z-0"></div> */}

        {/* <div className="relative z-10"> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Films />} />  
            <Route path="/movie/:id" element={<DetailsMovie />} />
            <Route path="/series" element={<Series />} />
            <Route path="/serie/:id" element={<DetailsSerie />} />
            <Route path="/genres" element={<Genres />} />
            {/* <Route path="/genre/:id" element={<Genres />} /> */}
            <Route path="/genre/:id" element={<GenreDetails />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        {/* </div> */}
      </div>
    </Router>
  );
};

export default App;
