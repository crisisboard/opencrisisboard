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
      newBoardLogoSrc: '',
      errorMsg: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    this.props.updateBoardNameAction(this.state.newBoardName);

    // TODO: Figure out the code before this line (to do with ImageUploader)
    this.props.updateBoardLogoAction(this.state.newBoardLogoSrc);
  }

  render () {
    let {
      currentBoardName
    } = this.props;

    return (
      <div className={styles.adminSettingsLogoForm}>
        <input
          type={'text'}
          className={styles.newBoardNameInput}
          placeholder={currentBoardName}
          onChange={(e) => {this.setState({newBoardName: e.target.value});}}
        />
        {/* ImageUploader goes here */}
        <Button
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
  currentBoardLogoImageURL: '',

  // TODO: Figure out if I need to add props to signify updating state
};

LogoForm.propTypes = {
  currentBoardName: React.PropTypes.string,
  currentBoardLogoImageURL: React.PropTypes.string,
  updateBoardNameAction: React.PropTypes.func,
  updateBoardLogoAction: React.PropTypes.func
};

export default LogoForm;

