import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';
import _ from 'lodash';

import Button from 'Components/Button';
import LogoImage from 'SharedStyles/logo.png';

class LogoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoardName: '',
      // TODO: For now, just a string. Look into ImageUploader components
      newBoardLogoImg: '',
      errorMsg: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    this.props.updateBoardNameAction(this.state.newBoardName);
    this.props.updateBoardLogoAction(this.state.newBoardLogoImg);
    // TODO: Fix this race condition. It means that sometimes the data will refresh before the update actions are completed
    this.props.getSettingsAction();
  }

  render () {
    let {
      boardName,
      boardLogoImage
    } = this.props.settings;

    return (
      <div className={styles.logoFormWrapper}>
        <div className={styles.logoFormHeader}>
          Change Admin Settings
        </div>
        <div className={styles.logoFormNameInputWrapper}>
          <label className={styles.logoFormInputLabel}>
            Board name:
          </label>
          <input
            type={'text'}
            className={styles.logoFormInput}
            placeholder={boardName}
            onChange={(e) => {this.setState({ newBoardName: e.target.value });}}
          />
        </div>

        <div className={styles.logoFormImgInputWrapper}>
          <div className={styles.logoImgPreviewWrapper}>
            <img
              src={boardLogoImage}
              className={styles.logoImgPreview}
            />
          </div>
          <label className={styles.logoFormInputLabel}>
            Board logo image:
          </label>
          <input
            type={'text'}
            className={styles.logoFormInput}
            placeholder={boardLogoImage}
            onChange={(e) => {this.setState({ newBoardLogoImg: e.target.value });}}
          />
        </div>
        <Button
          className={styles.logoFormSubmitButton}
          onClick={this.handleSubmit}
        >
          Submit Changes
        </Button>
      </div>
    );
  }
}

LogoForm.defaultProps = {
  boardName: 'OpenCrisisBoard',
  boardLogoImage: LogoImage,
};

LogoForm.propTypes = {
  boardName: React.PropTypes.string,
  boardLogoImage: React.PropTypes.string,
  updateBoardNameAction: React.PropTypes.func,
  updateBoardLogoAction: React.PropTypes.func,
  getSettingsAction: React.PropTypes.func
};

export default LogoForm;

