import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BooksGrid = ({ books, onBookAction }) => (
  <div className="search-books-results">
    <ol className="books-grid">
      {books.length ? (
        books.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              onBookAction={newShelf => onBookAction(book, newShelf)}
            />
          </li>
        ))
      ) : (
        <h1>No results found</h1>
      )}
    </ol>
  </div>
);

BooksGrid.propTypes = {

  books: PropTypes.array.isRequired,

  onBookAction: PropTypes.func.isRequired,
};

export default BooksGrid;
