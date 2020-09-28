import React from 'react';

// Router
import { withRouter } from 'react-router-dom';

// UI Components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Util
import { getHTML } from '../../util/helpers';

const VideoTile = ({ thumbnail, title, videoId }) => {
  return (
    <Paper style={{ padding: '8px', marginBottom: '16px' }}>
      <div style={{ overflow: 'hidden', position: 'relative', paddingTop: '56.25%', borderRadius: '4px', marginBottom: '6px' }}>
        <a href={`https://youtube.com/watch?v=${videoId}`} target='_blank' rel='noopener noreferrer'>
          <img style={{ width: '100%', position: 'absolute', top: '-16.5%', left: 0 }} src={thumbnail} alt={title} />
        </a>
      </div>
      <a href={`https://youtube.com/watch?v=${videoId}`} target='_blank' rel='noopener noreferrer'>
        <Typography variant='subtitle2' style={{ overflow: 'hidden', height: '42px' }} dangerouslySetInnerHTML={getHTML(title)} />
      </a>
    </Paper>
  )
}

export default withRouter(VideoTile);