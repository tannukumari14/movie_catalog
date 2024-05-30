"use client";
import React, { useState } from 'react';
import Movie_catalog_data from '../movie_catalog_data';
import "../globals.css";

const MovieFilter = () => {
    const [filters, setFilters] = useState({
        genres: [],
        years: [],
        ratings: []
    });

    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleChange = (category, value) => {
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (prevFilters[category].includes(value)) {
                updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
            } else {
                updatedFilters[category] = [...updatedFilters[category], value];
            }
            return updatedFilters;
        });
    };

    const filterMovies = (genres, ratings, years) => {
        return Movie_catalog_data.filter(movie => {
            const matchesGenres = genres.length === 0 || genres.some(genre => movie.genres.includes(genre));
            const matchesRatings = ratings.length === 0 || ratings.some(rating => movie.imdb_rating >= rating);
            const matchesYears = years.length === 0 || years.some(year => movie.release_year === year);
            return matchesGenres && matchesRatings && matchesYears;
        });
    };

    const handleFilterChange = () => {
        const { genres, ratings, years } = filters;
        const filteredMovies = filterMovies(genres, ratings, years);
        setFilteredMovies(filteredMovies);
    };

    const renderCheckboxes = (category, options) => (
        <div className="checkbox-container">
            {options.map((option, index) => (
                <div key={index} className="checkbox-item">
                    <input
                        type="checkbox"
                        id={`${category}${index}`}
                        value={option}
                        onChange={() => handleChange(category, option)}
                    />
                    <label htmlFor={`${category}${index}`}>{option}</label>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div className="filter-section">
                <h1 id="filterMovies">FILTER MOVIES</h1>
                <br />
                <div className="filter-group">
                    <h3>Filter movies by genres</h3>
                    {renderCheckboxes('genres', ['Romance', 'Drama', 'History', 'Fantasy', 'Adventure', 'Horror', 'Biography', 'War', 'Thriller'])}
                </div>
                <br />
                <div className="filter-group">
                    <h3>Filter movies by Release Year</h3>
                    {renderCheckboxes('years', [1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919])}
                </div>
                <br />
                <div className="filter-group">
                    <h3>Filter movies by IMDb Rating</h3>
                    {renderCheckboxes('ratings', [5.8, 5.9, 5.1, 7, 6.4, 6.6, 6.1, 5.7, 6.5, 6.9, 5.5])}
                </div>
                <br />
                <button onClick={handleFilterChange} className="filter-button">Apply Filters</button>
            </div>

            <div className="results-section">
                <h2>Filtered Movies</h2>
                {filteredMovies.length > 0 ? (
                    <div className="movies-grid">
                        {filteredMovies.map((movie, index) => (
                            <div key={index} className="movie-card">
                                <h3>{movie.title}</h3>
                                <p>Genre: {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}</p>
                                <p>Year: {movie.release_year}</p>
                                <p>Rating: {movie.imdb_rating}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </>
    );
};

export default MovieFilter;

