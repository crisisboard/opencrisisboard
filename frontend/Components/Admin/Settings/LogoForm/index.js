import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

import Button from 'Components/Button';

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

    // TODO: Figure out the code before this line (to do with ImageUploader)
    this.props.updateBoardLogoAction(this.state.newBoardLogoImg);
  }

  render () {
    let {
      currentBoardName,
      currentBoardLogoImg
    } = this.props;

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
            placeholder={currentBoardName}
            onChange={(e) => {this.setState({newBoardName: e.target.value});}}
          />
        </div>

        <div className={styles.logoFormImgInputWrapper}>
          <div className={styles.logoImgPreviewWrapper}>
            <img
              src={'https://i.imgur.com/dE24m6H.png'}
              className={styles.logoImgPreview}
            />
          </div>
          <label className={styles.logoFormInputLabel}>
            Board logo image:
          </label>
          <input
            type={'text'}
            className={styles.logoFormInput}
            placeholder={currentBoardLogoImg}
            onChange={(e) => {this.setState({newBoardLogoImg: e.target.value});}}
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
  currentBoardName: 'OpenCrisisBoard',
  currentBoardLogoImg: 'https://i.imgur.com/dE24m6H.png',

  // TODO: Figure out if I need to add props to signify updating state
};

LogoForm.propTypes = {
  currentBoardName: React.PropTypes.string,
  currentBoardLogoImg: React.PropTypes.string,
  updateBoardNameAction: React.PropTypes.func,
  updateBoardLogoAction: React.PropTypes.func
};

export default LogoForm;

