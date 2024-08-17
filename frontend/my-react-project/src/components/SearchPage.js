import React, { useState } from 'react';
import './SearchPage.css';
import VajraIcon from '../logo.svg'; // Import the vajra image

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert(`You searched for: ${searchQuery}`); // Placeholder action, replace with actual search functionality
  };

  return (
    <div className="search-page">
      <div className="icon-container" onClick={handleSearchClick}>
        <img src={VajraIcon} alt="Tibetan Vajra" className="vajra-icon" />
      </div>
      {showInput && (
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            className="search-input"
          />
        </form>
      )}
    </div>
  );
}

export default SearchPage;
