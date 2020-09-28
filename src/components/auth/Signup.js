import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { signUp } from '../../store/actions';

// Util
import { MATERIAL_RED } from '../../util/constants';

// UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom Components
import SocialMediaLogin from './SocialMediaLogin';

const Signup = ({ signUp, error, signUpPending, socialMediaSignUpPending }) => {
  const [signupForm, setSignupForm] = useState({ email: '', displayName: '', password: '' });
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        signUp(signupForm.email, signupForm.displayName, signupForm.password);
      }}>
        {error && <Paper style={{ padding: '10px', backgroundColor: MATERIAL_RED }}>{error}</Paper>}
        <Typography style={{ marginTop: '12px', marginLeft: '8px' }}>E-mail</Typography>
        <TextField style={{ marginTop: '2px' }} placeholder='elon.musk@gmail.com' fullWidth margin='dense' variant='outlined' type='email' autoComplete='new-email' onChange={e => setSignupForm({ ...signupForm, email: e.target.value })} value={signupForm.email} />
        <Typography style={{ marginTop: '12px', marginLeft: '8px' }}>Username</Typography>
        <TextField style={{ marginTop: '2px' }} placeholder='Turning Von Neumann' fullWidth margin='dense' variant='outlined' type='text' onChange={e => setSignupForm({ ...signupForm, displayName: e.target.value })} value={signupForm.displayName} />
        <Typography style={{ marginTop: '12px', marginLeft: '8px' }}>Password</Typography>
        <TextField style={{ marginTop: '2px' }} placeholder='At least 6 characters' fullWidth margin='dense' variant='outlined' type='password' autoComplete='new-password' onChange={e => setSignupForm({ ...signupForm, password: e.target.value })} value={signupForm.password} />
        <div style={{ marginTop: '20px', textAlign: 'center', height: '50px' }}>
          {signUpPending ? <CircularProgress /> : <Button disabled={!(signupForm.password && signupForm.email && signupForm.displayName && signupForm.password.length > 5)} fullWidth color='secondary' variant='contained' type='submit'>Signup!</Button>}
        </div>
      </form>
      <div className='or-container'>
        <span className='or'>OR</span>
      </div>
      <div style={{ marginTop: '25px', marginBottom: '10px' }}>
        <Typography align='center' color='primary'>Sign Up With:</Typography>
        <SocialMediaLogin pending={socialMediaSignUpPending} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ appReducer }) => {
  return {
    error: appReducer.signUpError,
    signUpPending: appReducer.signUpOrLoginPending,
    socialMediaSignUpPending: appReducer.socialMediaSignUpOrLoginPending
  }
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, displayName, password) => dispatch(signUp(email, displayName, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);