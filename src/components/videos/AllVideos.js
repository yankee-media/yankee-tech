import React, { useEffect } from 'react';

// UI Components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Custom Components
import VideoTile from './VideoTile';

// Redux
import { connect } from 'react-redux';
import { getAllVideos } from '../../store/actions';

// Util
import { MATERIAL_RED } from '../../util/constants';

const AllVideos = ({ videos, getAllVideos }) => {
  useEffect(() => {
    getAllVideos();
  }, [getAllVideos]);
  return (
    <div style={{ maxWidth: '1230px', margin: '30px auto 0 auto', padding: '0 15px' }}>
      <Typography variant='h5' align='center' style={{ marginBottom: '20px', textDecoration: 'underline', textDecorationColor: MATERIAL_RED }}>All Yankee Tech Videos</Typography>
      <Grid container spacing={2}>
        {(videos && Array.isArray(videos) && videos.length > 0) ?
          (videos.map(video => (
            <Grid key={video.etag} item xs={12} sm={6} md={4} lg={4} xl={4}>
              <VideoTile title={video.snippet.title} thumbnail={video.snippet.thumbnails.high.url} videoId={video.id.videoId} />
            </Grid>))) : (
            <div style={{ textAlign: 'center', height: '50px', width: '100%', marginTop: '15px' }}>
              <CircularProgress />
            </div>
          )}
      </Grid>
    </div>
  )
}

const mapStateToProps = ({ appReducer }) => {
  return {
    videos: appReducer.allVideos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllVideos: () => dispatch(getAllVideos())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllVideos);