import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import styles from './styles.css';

class NewDiscussionButton extends React.Component {
  render() {
    const { authenticated } = this.props;

    const button = (
      <Button type='primary' fullWidth noUppercase disabled={!authenticated}>
        New Discussion
      </Button>
    );

    return authenticated
      ? (
        <Link to={`/${currentForum}/new_discussion`}>
          {button}
        </Link>
      )
      : (
        <div>
          <p className={styles.signInMsg}>Sign in to create a discussion</p>
          {button}
        </div>
      );
  }
}

const mapStateToProps = state => ({ authenticated: state.user.authenticated });

export default connect(mapStateToProps)(NewDiscussionButton);
