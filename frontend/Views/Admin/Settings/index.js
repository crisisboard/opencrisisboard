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
import LogoForm from 'Components/Admin/Settings/LogoForm';

class Settings extends Component {
  componentDidMount() {
    this.props.getAdminSettingsInfo();
  }

  render () {
    return (
      <div className={classnames(appLayout.constraintWidth, styles.container)}>
        <LogoForm
          updateBoardNameAction={(newBoardName) => {this.props.updateAdminBoardName(newBoardName)}}
          updateBoardLogoAction={(newBoardLogoURL) => {this.props.updateAdminBoardLogo(newBoardLogoURL)}}
        />
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    settings: state.settings,
    fetchingSettings: state.fetchingSettings,
    updatingBoardName: state.updatingBoardName,
    updatingBoardNameError: state.updatingBoardNameError,
    updatingBoardLogo: state.updatingBoardLogo,
    updatingBoardLogoError: state.updatingBoardLogoError
  }; },
  (dispatch) => { return {
    getAdminSettingsInfo: () => dispatch(getAdminSettingsInfo()),
    updateAdminBoardName: (newBoardName) => dispatch(updateAdminBoardName((newBoardName))),
    updateAdminBoardLogo: (newBoardLogoURL) => dispatch(updateAdminBoardLogo((newBoardLogoURL)))
  }; }
)(Settings);