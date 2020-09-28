import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Loading = ({ absolute }) => {
  const styles = {
    zIndex: 99999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  };
  if (absolute) {
    styles.position = 'absolute';
  } else {
    styles.position = 'fixed';
  }
  return (
    <div style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={styles}>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '25%' }}>
          <CircularProgress size={100} color='primary' />
          <Typography variant='h2' style={{ marginTop: '20px' }} color='primary'>Yankee Tech</Typography>
        </div>
      </div>
    </div>
  );
}

export default Loading;