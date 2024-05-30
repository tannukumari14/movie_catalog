"use client"
import React, { useState } from 'react';
import Movie_catalog_data from '../movie_catalog_data.js';
import "../globals.css";

const Slider = () => {
    const [minLength, setMinLength] = useState(90);
    const [maxLength, setMaxLength] = useState(120);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleMinLengthChange = (event) => {
        setMinLength(Number(event.target.value));
    };

    const handleMaxLengthChange = (event) => {
        setMaxLength(Number(event.target.value));
    };

    const handleFilterChange = () => {
        const filtered = Movie_catalog_data.filter(movie =>
            movie.length_in_min >= minLength && movie.length_in_min <= maxLength
        );
        setFilteredMovies(filtered);
    };

    return (
        <>
            <div className="slidecontainer">
                <h1>Filter Movies by Length</h1>
                <div>
                    <label>
                        Min Length:
                        <input
                            type="range"
                            min="1"
                            max="300"
                            value={minLength}
                            onChange={handleMinLengthChange}
                        />
                        {minLength} min
                    </label>
                </div>
                <div>
                    <label>
                        Max Length:
                        <input
                            type="range"
                            min="1"
                            max="300"
                            value={maxLength}
                            onChange={handleMaxLengthChange}
                        />
                        {maxLength} min
                    </label>
                </div>
                <button onClick={handleFilterChange}>Apply Filters</button>

                <div>
                    <h2>Filtered Movies</h2>
                    {filteredMovies.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                            {filteredMovies.map((movie, index) => (
                                <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                    <h3>{movie.title}</h3>
                                    <p>Genre: {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}</p>
                                    <p>Year: {movie.release_year}</p>
                                    <p>Rating: {movie.imdb_rating}</p>
                                    <p>Length: {movie.length_in_min} min</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No movies found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Slider;
