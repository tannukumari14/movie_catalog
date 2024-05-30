import React, { useState } from 'react';

const MovieCatalog = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(data);
  const pageSize = 12;

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredData = data.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    setFilteredMovies(filteredData);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setFilteredMovies(data);
      setCurrentPage(1);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const moviesToShow = filteredMovies.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getGenresString = (genres) => {
    if (Array.isArray(genres)) {
      return genres.join(', ');
    }
    return genres;
  };

  return (
    <div>
      <div className="search">
        <input 
          type="search" 
          placeholder="Search by title" 
          value={searchQuery}
          onChange={handleInputChange}
          className="search-bar" 
        />
        <button className="go_button" onClick={handleSearch}>Go</button>
      </div>

      <div className="movie-grid">
        {moviesToShow.map(movie => (
          <div key={movie.id} className="movie-item">
            <h2>{movie.title}</h2>
            <img src={movie.poster} alt={movie.title} />
            <p>Release Year: {movie.release_year}</p>
            <p>Genres: {getGenresString(movie.genres)}</p>
            <p>IMDB Rating: {movie.imdb_rating}</p>
            <p>Length: {movie.length_in_min} min</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button className="button" onClick={nextPage} disabled={endIndex >= filteredMovies.length}>Next</button>
      </div>
    </div>
  );
};

export default MovieCatalog;
