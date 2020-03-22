import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

import {
  updateAdminBoardName,
  updateAdminBoardLogo
} from './actions';
import LogoForm from 'Components/Admin/Settings/LogoForm';

const Settings = (props) => {
  return (
    <div className={classnames(appLayout.constraintWidth, styles.container)}>
      <LogoForm
        updateBoardNameAction={(newBoardName) => {props.updateAdminBoardName(newBoardName)}}
        updateBoardLogoAction={(newBoardLogoURL) => {props.updateAdminBoardLogo(newBoardLogoURL)}}
      />
    </div>
  );
};

Settings.defaultProps = {
};

Settings.PropTypes = {
};

export default connect(
  (state) => { return {
    settings: state.app.settings,
    fetchingSettings: state.fetchingSettings,
    updatingBoardName: state.updatingBoardName,
    updatingBoardNameError: state.updatingBoardNameError,
    updatingBoardLogo: state.updatingBoardLogo,
    updatingBoardLogoError: state.updatingBoardLogoError
  }; },
  (dispatch) => { return {
    updateAdminBoardName: (newBoardName) => dispatch(updateAdminBoardName((newBoardName))),
    updateAdminBoardLogo: (newBoardLogoURL) => dispatch(updateAdminBoardLogo((newBoardLogoURL)))
  }; }
)(Settings);