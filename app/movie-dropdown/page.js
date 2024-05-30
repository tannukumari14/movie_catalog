"use client"
import React, { useState } from 'react';
import Movie_catalog_data from '../movie_catalog_data';
import "../globals.css";

const MovieDropdown = () => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleFilterChange = () => {
        const filtered = Movie_catalog_data.filter(movie => 
            !selectedGenre || movie.genres.includes(selectedGenre)
        );
        setFilteredMovies(filtered);
    };

    return (
        <>
                <div>
                    <h1 id="filterMovies">FILTER MOVIES</h1>
                    <br />
                    <div>
                        <h3>Filter movies by Genre</h3>
                        <select
                            value={selectedGenre}
                            onChange={handleChange}
                        >
                            <option value="">Select genre</option>
                            {['Romance', 'Drama', 'History', 'Fantasy', 'Adventure', 'Horror', 'Biography', 'War', 'Thriller'].map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <button onClick={handleFilterChange}>Apply Filters</button>
                </div>

                <div>
                    <h2>Filtered Movies</h2>
                    {filteredMovies.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                            {filteredMovies.map((movie, index) => (
                                <div key={index} style={{ border: '4px solid red', padding: '10px' }}>
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

export default MovieDropdown;
