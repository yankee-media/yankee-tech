import React from 'react';

// UI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';

const AccountSettings = ({ profile }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '8px' }}>
      <Typography align='center' variant='h4' style={{ marginBottom: '40px' }}>Account Settings</Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              <img style={{ width: '160px', borderRadius: '50%' }} src={profile.avatarUrl} alt='profile' />
            </div>
            <div style={{ display: 'inline-block', marginLeft: '20px', position: 'relative', top: '-40px' }}>
              <Typography align='left' variant='subtitle2' color='primary'>Display Name:</Typography>
              <Typography style={{marginBottom: '15px'}} align='left' variant='h6'>{profile.displayName}</Typography>
              <Typography align='left' variant='subtitle2' color='primary'>Email:</Typography>
              <Typography align='left' variant='h6'>{profile.email}</Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default connect(({ firebase }) => {
  return {
    profile: firebase.profile
  }
}, () => ({}))(AccountSettings);