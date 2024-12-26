import React from 'react';
import Home from './compenents/Home';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <h1 className="text-3xl font-bold flex justify-center text-white pt-8">
        Movies Library
      </h1>

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-800 to-purple-500 opacity-20 blur-3xl z-0"></div>

      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
};

export default App;
