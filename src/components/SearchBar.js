import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchBar = props => (
  <div className="search-books-bar">
    <Link to="/" className="close-search">Close</Link>

    <div className="search-books-input-wrapper">
      <input
        onChange={props.onQuery}
        placeholder="Search by title or author"
        type="text"
      />
    </div>
  </div>
);

SearchBar.propTypes = {

  onQuery: PropTypes.func.isRequired,
};

export default SearchBar;
