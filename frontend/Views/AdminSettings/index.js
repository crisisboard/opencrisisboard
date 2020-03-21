import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

import {
  getAdminSettingsInfo,
  updateAdminBoardName,
  updateAdminBoardLogo
} from './actions';

class Settings extends Component {
  componentDidMount() {

  }

  render () {
    return (
      <div className={classnames(appLayout.constraintWidth, styles.container)}>
        <h1>
          This is the settings tab for the Admin panel.
        </h1>
      </div>
    );
  }
}

export default connect(
  (state) => { return {

  }; },
  (dispatch) => { return {

  }; }
)(Settings);