import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <h1>
          Upload your logo image here
        </h1>
      </div>
    )
  }
}

ImageUpload.defaultProps = {

};

ImageUpload.propTypes = {

};

export default ImageUpload;