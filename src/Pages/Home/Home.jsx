// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gray-100">
      <Link to='/playyy' className=" text-2xl bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 cursor-pointer">
        Play Anti-Chess
      </Link>

      <div className='mt-2 text-2xl'>Made By Abhirup Das</div>
      <div className='mt-2 text-2xl'>Pice Assignment - Q2</div>

    </div>
  );
};

export default Home;
