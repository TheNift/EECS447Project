import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className="search-page">
        <div className="search-title">
          <p>Search</p>
        </div>
        <div className="search-col-box">
          <div className="search-desc">
            <p>Select search parameters:</p>
          </div>
          <div className="search-button-box">
            <button variant="outlined" className="search-button-member">Upcoming</button>
            <button variant="outlined" className="search-button-member">Past</button>
            <button variant="outlined" className="search-button-member">All</button>
            <button variant="outlined" className="search-button-member">Specific Region</button>
          </div>
        </div>
    </div>
  );
}

export default Search;