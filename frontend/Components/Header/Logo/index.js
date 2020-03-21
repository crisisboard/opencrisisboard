import React, { Component } from 'react';
import { Link } from 'react-router'
import styles from './styles';
import LogoImage from 'SharedStyles/logo.png';

const Logo = (props) => {
  const boardName = props.boardName ? props.boardName : "OpenCrisisBoard";
  const logoImage = props.logoImage ? props.logoImage : LogoImage;
  return (
    <div className={styles.logoContainer}>
      <Link to='/' className={styles.logo}>
        <img className={styles.logoImage} src={logoImage} />
      </Link>
      <h1 className={styles.logoTitle}>
        <Link to="/">{boardName}</Link>
      </h1>
    </div>
  );
};

export default Logo;
