import React from 'react';

// Router
import { withRouter } from 'react-router-dom';

// UI Component
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const ToolTile = ({ path, image, title, alt, history, description }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <Paper className='link-like' onClick={() => history.push(path)} style={{ padding: '8px', maxHeight: '200px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant='h6'>{title}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={4} xl={4}>
            <div style={{ overflow: 'hidden', width: '200px', height: '135px' }}>
              <img style={{ width: '100%' }} src={image} alt={alt} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={8} xl={8}>
            <div style={{ overflow: 'hidden', paddingLeft: '15px' }}>
              <Typography>{description}</Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default withRouter(ToolTile);