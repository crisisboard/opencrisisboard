import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import appLayout from 'SharedStyles/appLayout';
import styles from './styles';

// components for AdminHeader
import UserMenu from 'Components/Header/UserMenu';
import Logo from 'Components/Header/Logo';
import NavigationBar from 'Components/Header/NavigationBar';
import PlaceholderImage from 'SharedStyles/placeholder.jpg';

class AdminHeader extends Component {
  renderNavLinks() {
    return [
      { name: 'Dashboard', link: '/admin' },
      { name: 'Settings', link: '/admin/settings' },
    ];
  }

  render() {
    const {
      authenticated,
      name,
      username,
      avatarUrl,
    } = this.props.user;

    const {
      boardName,
      boardLogoImage
    } = this.props.adminSettings;

    return (
      <div className={classnames(appLayout.constraintWidth)}>
        <div className={styles.headerTop}>
          <Logo
            boardName={boardName}
            logoImage={boardLogoImage}
          />
          <UserMenu
            signedIn={authenticated}
            username={username}
            avatar={avatarUrl}
          />
        </div>
        <NavigationBar
          navigationLinks={this.renderNavLinks()}
        />
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
    forums: state.app.forums,
    adminSettings: state.adminSettings
  }; }
)(AdminHeader);
