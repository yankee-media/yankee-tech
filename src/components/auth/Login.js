import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { login } from '../../store/actions';

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


const Login = ({ login, error, loginPending, socialMediaLoginPending }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        login(loginForm.email, loginForm.password);
      }}>
        {error && <Paper style={{ padding: '10px', backgroundColor: MATERIAL_RED }}>{error}</Paper>}
        <Typography style={{ marginTop: '12px', marginLeft: '8px' }}>E-mail</Typography>
        <TextField style={{ marginTop: '2px' }} placeholder='elon.musk@gmail.com' fullWidth margin='dense' variant='outlined' type='email' autoComplete='current-email' onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} value={loginForm.email} />
        <Typography style={{ marginTop: '12px', marginLeft: '8px' }}>Password</Typography>
        <TextField style={{ marginTop: '2px' }} placeholder='password123' fullWidth margin='dense' variant='outlined' type='password' autoComplete='current-password' onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} value={loginForm.password} />
        <div style={{ marginTop: '20px', textAlign: 'center', height: '50px' }}>
          {loginPending ? <CircularProgress /> : <Button disabled={!(loginForm.password && loginForm.email)} fullWidth color='secondary' variant='contained' type='submit'>Login!</Button>}
        </div>
      </form>
      <div className='or-container'>
        <span className='or'>OR</span>
      </div>
      <div style={{ marginTop: '25px', marginBottom: '10px' }}>
        <Typography align='center' color='primary'>Login With:</Typography>
        <SocialMediaLogin pending={socialMediaLoginPending} />
      </div>
    </div>
  )
}

const mapStateToProps = ({ appReducer }) => {
  return {
    error: appReducer.loginError,
    loginPending: appReducer.signUpOrLoginPending,
    socialMediaLoginPending: appReducer.socialMediaSignUpOrLoginPending
  }
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);