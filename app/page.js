"use client";
import Movie_catalog_data from "./movie_catalog_data.js";
import MovieCatalog from "./movie_catalog.js";
import Link from 'next/link';
import "./globals.css";
import Signup from './signup/page';
import Login from './login/page';
import React, { useState } from 'react';

const Page = () => {
  const [showSignup, setShowSignup] = useState(true);
  
  return (
    <>
      {/* <div className="filtermovies">
        <ul>
          <li>
            <Link className="link" href="/movie-filter">Filter Movies</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/movie-dropdown">MovieDropdown</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/slider">Slider</Link>
          </li>
        </ul>
      </div> */}

      <div className="button-container">
        <button onClick={() => setShowSignup(false)} className={!showSignup ? 'active' : ''}>
          Go to Login
          <MovieCatalog data={Movie_catalog_data} />
        </button>
        {/* <button onClick={() => setShowSignup(true)} className={showSignup ? 'active' : ''}>
          Go to Signup
        </button> */}
      </div>

      <div className="form-container">
        {showSignup ? <Signup /> : <Login />}
      </div>

      {/* <Link href="/signup">Signup</Link>
        <br></br>
      <Link href="/login">Login</Link> */}

      {/* <MovieCatalog data={Movie_catalog_data} /> */}
    </>
  );
};

export default Page;
