import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import BookShelf from './BookShelf';

const MyBooksPage = props => (
  <div className="list-books">
    <Header />

    <div className="list-books-content">
      <div>
        <BookShelf
          books={props.currentlyReading}
          onBookAction={props.onBookAction}
          title="Currently Reading"
        />

        <BookShelf
          books={props.wantToRead}
          onBookAction={props.onBookAction}
          title="Want to Read"
        />

        <BookShelf
          books={props.read}
          onBookAction={props.onBookAction}
          title="Read"
        />
      </div>
    </div>

    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

MyBooksPage.propTypes = {

  onBookAction: PropTypes.func.isRequired,

  currentlyReading: PropTypes.array.isRequired,

  wantToRead: PropTypes.array.isRequired,

  read: PropTypes.array.isRequired,
};

export default MyBooksPage;
