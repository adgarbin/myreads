import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import SearchBar from '../components/SearchBar';
import BooksGrid from '../components/BooksGrid';
import { search } from '../services/BooksAPI';

class SearchPage extends Component {
  state = {
    searchQuery: '',
    searchResults: [],
    hasQueried: false,
  };

  static propTypes = {
    onBookAction: PropTypes.func.isRequired,
    bookshelf: PropTypes.array.isRequired,
  };

  getSearchResults = _.debounce(async () => {
    try {
      if (!this.state.searchQuery.length) {
        await this.setState({
          searchResults: [],
        });
        return;
      }

      let results = await search(this.state.searchQuery, 10);
      if (results.constructor !== Array) results = [];

      await this.setState({
        searchResults: results,
      });

      this.setShelf();
    } catch (error) {
      throw new Error(error);
    }
  }, 1000);

  setShelf() {
    this.state.searchResults.map((resultBook) => {
      const matchedSearchBook = this.props.bookshelf.find(
        bookshelfBook => resultBook.id === bookshelfBook.id,
      );
      if (matchedSearchBook) resultBook.shelf = matchedSearchBook.shelf;

      if (!resultBook.shelf) {
        resultBook.shelf = 'none';
      }

      return resultBook;
    });

    this.setState({ hasQueried: true });
  }

  updateSearchQuery = async (event) => {
    await this.setState({
      searchQuery: event.target.value.trim(),
      hasQueried: false,
    });

    await this.getSearchResults();
  };

  render() {
    return (
      <div className="search-books">
        <SearchBar onQuery={this.updateSearchQuery} />

        {this.state.hasQueried ? (
          <BooksGrid
            books={this.state.searchResults}
            onBookAction={this.props.onBookAction}
          />
        ) : null}
      </div>
    );
  }
}

export default SearchPage;
