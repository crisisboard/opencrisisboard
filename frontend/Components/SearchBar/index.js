import React, { Component } from "react";

import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../../Views/ForumFeed/actions";

class SearchBar extends Component {
  render() {
    const { search, searchInput } = this.props;

    return (
      <div className={styles.search}>
        <label className={styles.searchLabel} htmlFor="search">
          Search Discussions:
        </label>
        <input
          className={styles.searchBox}
          type="text"
          placeholder="Search..."
          onChange={e => search(e.target.value)}
          value={searchInput}
        />
      </div>
    );
  }
}
function mapStateToProps({ searchInput }) {
  return { searchInput };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
