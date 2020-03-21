<<<<<<< HEAD
import React, { Component } from 'react';
import { Link } from 'react-router'
=======
import React from 'react';
>>>>>>> just realized that the App reducer will likely have to get involved for this change, shouldn't be too difficult though hopefully
import styles from './styles';
import LogoImage from 'SharedStyles/logo.png';

const Logo = (props) => {
  return (
    <div className={styles.logoContainer}>
      <Link to='/' className={styles.logo}>
        <img className={styles.logoImage} src={props.logoImage} />
      </Link>
      <h1 className={styles.logoTitle}>
        <Link to="/">{props.boardName}</Link>
      </h1>
    </div>
  );
};

Logo.defaultProps = {
  boardName: 'OpenCrisisBoard',
  logoImage: LogoImage
};

Logo.PropTypes = {
  boardName: React.PropTypes.string,
  logoImage: React.PropTypes.string
};

export default Logo;
