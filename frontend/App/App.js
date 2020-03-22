import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

import { getForums, updateCurrentForum, getUser, getSettings } from './actions';

class AppContainer extends Component {
  componentDidMount() {
    const {
      params,
      updateCurrentForum,
      getForums,
      getUser,
      getSettings
    } = this.props;

    // get all forum list
    getForums();

    // check for authenticated user
    getUser();

    // get current settings
    getSettings();

    // set current forum based on route
    const currentForum = params.forum || '';
    updateCurrentForum(currentForum);
  }

  componentDidUpdate() {
    const {
      forums,
      params,
      currentForum,
      updateCurrentForum,
    } = this.props;


    let newCurrentForum = '';
    if (params.forum) newCurrentForum = params.forum;
    else if (forums) newCurrentForum = forums[0].forum_slug;

    // update current forum if necessary
    if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum);
  }

  render() {
    const { forums, settings } = this.props;

    // render only if we get the forum lists
    if (forums) {
      return (
        <div>
          <Helmet><title>{settings.boardName}</title></Helmet>

          <div className={styles.gitForkTag}>
            <a className={styles.gitLink} href="https://github.com/crisisboard/opencrisisboard" target="_blank">Fork on Github</a>
          </div>

          <Header settings={settings}/>
          {this.props.children}
          <Footer />
        </div>
      );
    }

    return (
      <div className={styles.loadingWrapper}>Loading...</div>
    );
  }
}

export default connect(
  (state) => { return {
    forums: state.app.forums,
    currentForum: state.app.currentForum,
    settings: state.app.settings
  }; },
  (dispatch) => { return {
    getForums: () => { dispatch(getForums()); },
    updateCurrentForum: (currentForum) => { dispatch(updateCurrentForum(currentForum)); },
    getUser: () => { dispatch(getUser()); },
    getSettings: () => { dispatch(getSettings()); }
  }; }
)(AppContainer);
