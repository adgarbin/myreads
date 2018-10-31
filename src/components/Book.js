import React from "react";
import PropTypes from "prop-types";

const Book = ({ book, onBookAction }) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${
            book.imageLinks ? book.imageLinks.thumbnail : ""
          })`
        }}
      />

      <div className="book-shelf-changer">
        <select
          onChange={event => onBookAction(event.target.value)}
          value={book.shelf}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>

    <div className="book-title">{book.title}</div>
    {book.authors
      ? book.authors.map(author => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))
      : null}
  </div>
);

Book.propTypes = {
  book: PropTypes.object.isRequired,

  onBookAction: PropTypes.func.isRequired
};

export default Book;
