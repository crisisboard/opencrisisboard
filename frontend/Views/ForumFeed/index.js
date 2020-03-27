import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import {
  getDiscussions,
  getPinnedDiscussions,
  updateSortingMethod,
} from './actions';

import NewDiscussionButton from 'Components/NewDiscussionButton';
import FeedBox from 'Components/FeedBox';
import SideBar from 'Components/SideBar';
import SearchBar from 'Components/SearchBar';
import MapView from 'Components/MapView';

import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

class ForumFeed extends Component {
  componentDidMount() {
    const {
      currentForumId,
      getDiscussions,
      getPinnedDiscussions,
    } = this.props;

    // get the discussions and pinned discussions
    getDiscussions(currentForumId());
    getPinnedDiscussions(currentForumId());
  }

  componentDidUpdate(prevProps) {
    const {
      currentForum,
      currentForumId,
      getDiscussions,
      getPinnedDiscussions,
    } = this.props;

    // get the discussions again
    // if the forum didn't matched
    if (prevProps.currentForum !== currentForum) {
      const feedChanged = true;
      getDiscussions(currentForumId(), feedChanged);
      getPinnedDiscussions(currentForumId(), feedChanged);
    }
  }

  handleSortingChange(newSortingMethod) {
    const {
      currentForumId,
      getDiscussions,
      updateSortingMethod,
      sortingMethod,
    } = this.props;

    if (sortingMethod !== newSortingMethod) {
      updateSortingMethod(newSortingMethod);
      getDiscussions(currentForumId(), false, true);
    }
  }

  render() {
    const {
      currentForum,
      discussions,
      fetchingDiscussions,
      pinnedDiscussions,
      fetchingPinnedDiscussions,
      sortingMethod,
      error,
      searchInput,
      filteredDiscussions,
      authenticated
    } = this.props;

    if (error) {
      return (
        <div className={classnames(styles.errorMsg)}>
          {error}
        </div>
      );
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
        <Helmet><title>{`OpenCrisisBoard | ${currentForum}`}</title></Helmet>

        <div className={classnames(appLayout.primaryContent, styles.forumFeedContainer)}>
          <div className={styles.feedBoxContainer}>
            <FeedBox
              type='pinned'
              loading={fetchingPinnedDiscussions}
              discussions={searchInput ? filteredDiscussions : discussions}
              currentForum={currentForum}
            />

            <FeedBox
              type='general'
              loading={fetchingDiscussions}
              discussions={discussions}
              currentForum={currentForum}
              onChangeSortingMethod={this.handleSortingChange.bind(this)}
              activeSortingMethod={sortingMethod}
            />

            <div className={styles.newDiscussionBtn}>
              <NewDiscussionButton currentForum={currentForum} authenticated={authenticated}/>
            </div>
          </div>

          {/* TODO: Implement mobile behaviour (don't show) for MapView */}
          <MapView
            loading={fetchingDiscussions}
            pinnedDiscussions={pinnedDiscussions}
            discussions={discussions}
            currentForum={currentForum}
            // TODO: Use getBrowserLocation utility to set the center of the map, have a default center just in case user denies access
            center={{lat: 49.2, lng: -123.1}}
            zoom={12}
          />

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    currentForum: state.app.currentForum,
    currentForumId: () => {
      const currentForumObj = _.find(state.app.forums, { forum_slug: state.app.currentForum });
      if (currentForumObj) return currentForumObj._id;
      else return null;
    },
    fetchingDiscussions: state.feed.fetchingDiscussions,
    discussions: state.feed.discussions,
    fetchingPinnedDiscussions: state.feed.fetchingPinnedDiscussions,
    sortingMethod: state.feed.sortingMethod,
    pinnedDiscussions: state.feed.pinnedDiscussions,
    error: state.feed.error,
    searchInput: state.feed.searchInput,
    filteredDiscussions:state.feed.filteredDiscussions,
    authenticated: state.app.authenticated
  }; },
  (dispatch) => { return {
    getDiscussions: (currentForumId, feedChanged, sortingMethod, sortingChanged) => { dispatch(getDiscussions(currentForumId, feedChanged, sortingMethod, sortingChanged)); },
    getPinnedDiscussions: (currentForumId, feedChanged) => { dispatch(getPinnedDiscussions(currentForumId, feedChanged)); },
    updateSortingMethod: (method) => { dispatch(updateSortingMethod(method)); },
  }; }
)(ForumFeed);
