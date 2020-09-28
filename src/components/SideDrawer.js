import React from 'react';

// Router
import { withRouter } from 'react-router-dom';

// Icons
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

// Util
import { navButtons } from '../util/elements';
import { AUTHENTICATED, AUTH_INIT, NOT_AUTHENTICATED } from '../util/constants';
import { getAuthState } from '../util/helpers';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';

// Custom Components
import Login from './auth/Login';
import Signup from './auth/Signup';

// UI Components
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const SideDrawer = ({ closeDrawer, drawerOpen, history, openDialog, auth, firebase }) => {
  const authMap = new Map([
    [AUTHENTICATED, (
      <React.Fragment>
         <ListItem style={{ marginTop: '25px' }} button>
         <ListItemIcon><Settings color='primary' /></ListItemIcon>
          <ListItemText onClick={() => history.push('/account-settings')} align='center' primary={<Typography style={{display: 'flex'}} variant='button' color='primary'>Account Settings</Typography>} />
        </ListItem>
        <ListItem button>
        <ListItemIcon><ExitToApp color='primary' /></ListItemIcon>
          <ListItemText onClick={() => firebase.logout()} align='center' primary={<Typography style={{display: 'flex'}} variant='button' color='primary'>Logout</Typography>} />
        </ListItem>
      </React.Fragment>
    )],
    [NOT_AUTHENTICATED, (
      <React.Fragment>
        <ListItem style={{ marginTop: '25px' }} button>
          <ListItemText onClick={() => openDialog(<Login />, 'Login:', 'sm')} align='center' primary={<Typography variant='button' color='primary'>Login</Typography>} />
        </ListItem>
        <ListItem button>
          <ListItemText onClick={() => openDialog(<Signup />, 'Create Your Account:', 'sm')} align='center' primary={<Typography variant='button' color='primary'>Signup</Typography>} />
        </ListItem>
      </React.Fragment>)],
    [AUTH_INIT, <CircularProgress />]
  ]);
  return (
    <Drawer anchor='right' open={drawerOpen} onClose={closeDrawer}>
      <div
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
        >
        <List>
          {navButtons.map(({ link, title, Icon }) => (
            <ListItem key={title} button onClick={() => history.push(link)}>
              <ListItemIcon><Icon color='primary' /></ListItemIcon>
              <ListItemText primary={<Typography variant='button'>{title}</Typography>} />
            </ListItem>
          ))}
          {authMap.get(getAuthState(auth))}
        </List>
      </div>
    </Drawer>
  )
}

export default compose(withRouter, withFirebase)(SideDrawer);