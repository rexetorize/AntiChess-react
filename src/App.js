// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import AntiChess from './Pages/AntiChess/AntiChess.jsx';

const App = () => {
  return (
    // A react router to navigate through the pages 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playyy" element={<AntiChess />} />
      </Routes>
    </Router>
  );
};

export default App;
