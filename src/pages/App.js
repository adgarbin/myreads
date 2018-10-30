import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import MyBooksPage from '../components/MyBooksPage';
import SearchPage from './SearchPage';
import { getAll, update } from '../services/BooksAPI';

import '../assets/styles/App.css';

class App extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const allBooks = await getAll();

    const allBooksDistilled = [];
    allBooks.map((book) => {
      const {
        id, shelf, title, authors, imageLinks,
      } = book;

      allBooksDistilled.push({
        id,
        shelf,
        title,
        authors,
        imageLinks,
      });
      return allBooksDistilled;
    });

    this.setState({
      books: allBooksDistilled,
    });
  }

  getAllBooksFromShelf(shelf) {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  moveBookToShelf = async (bookToMove, shelfToMoveTo) => {
    if (bookToMove.shelf === shelfToMoveTo) return;

    await this.setState((currentState) => {
      if (shelfToMoveTo === 'none') {
        const bookToRemove = currentState.books.find(
          ownedBook => ownedBook.id === bookToMove.id,
        );
        const index = currentState.books.indexOf(bookToRemove);
        if (bookToRemove) currentState.books.splice(index, 1);
      } else if (bookToMove.shelf === 'none') {
        bookToMove.shelf = shelfToMoveTo;
        currentState.books.push(bookToMove);
      } else {
        currentState.books.find(
          ownedBook => ownedBook.id === bookToMove.id,
        ).shelf = shelfToMoveTo;
      }

      return { books: currentState.books };
    });

    await update(bookToMove, shelfToMoveTo);
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={() => (
            <MyBooksPage
              currentlyReading={this.getAllBooksFromShelf('currentlyReading')}
              wantToRead={this.getAllBooksFromShelf('wantToRead')}
              read={this.getAllBooksFromShelf('read')}
              onBookAction={this.moveBookToShelf}
            />
          )}
          exact
        />

        <Route
          path="/search"
          render={() => (
            <SearchPage
              bookshelf={this.state.books}
              onBookAction={this.moveBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
