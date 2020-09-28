import React from 'react';

// UI Components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { socialMediaLogin } from '../../store/actions';

// Util
import { GOOGLE_ICON } from '../../util/constants';

const SocialMediaLogin = ({ login, pending }) => {
  return (
    <div style={{ height: '40px', marginTop: '8px', textAlign: 'center' }}>
      {pending ? (
        <CircularProgress />)
        : (
          <Button fullWidth style={{ backgroundColor: '#de5246' }} onClick={() => login('google')}>
            Google
        <span style={{ height: '24px', width: '24px', position: 'absolute', left: 'calc(50% + 45px)', backgroundColor: '#fff', borderRadius: '50%', textAlign: 'center' }}>
              <img src={GOOGLE_ICON} style={{ height: '75%', marginTop: '3px' }} alt='google icon' />
            </span>
          </Button>)}
    </div>
  )
}

const mapStateToProps = ({ appReducer }) => {
  return {
    error: appReducer.signUpError,
    signUpPending: appReducer.signUpOrLoginPending
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (provider) => dispatch(socialMediaLogin(provider))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialMediaLogin);