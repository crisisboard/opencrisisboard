import React, { Component } from 'react';
import { connect } from 'redux';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

import {} from './actions';
import {createForum, deleteForum, getAdminDashboardInfo, getForums} from "../AdminDashboard/actions";

class Settings extends Component {
  componentDidMount() {

  }

  render () {
    return (
      <div>
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
)(Dashboard);