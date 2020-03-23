import React, { Component } from "react";

import styles from "./styles";

import Button from "Components/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../../Views/ForumFeed/actions";

class SearchBar extends Component {
  render() {
      const { search, searchInput } = this.props;

      return (
          <div>
              <label for="search"> Search Discussions: 
      <input className={styles.search} type="text" placeholder="Search..."
                      onChange={(e) => search(e.target.value)}
                      value={searchInput}
                  />
    </label>
             
        
      </div>
    );
  }
}
function mapStateToProps({ searchInput }) { 
 return {searchInput}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
