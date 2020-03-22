import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import NewDiscussionButton from '../NewDiscussionButton';
import styles from './styles';

class SideBar extends Component {
  render() {
    const {
      currentForum
    } = this.props;

    return (
      <div className={styles.sidebarContainer}>
        <NewDiscussionButton />
      </div>
    );
  }
}


SideBar.defaultProps = {
  currentForum: 'general',
};

SideBar.propTypes = {
  currentForum: React.PropTypes.string,
};

export default SideBar;
