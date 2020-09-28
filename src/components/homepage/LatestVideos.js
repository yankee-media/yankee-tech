import React from 'react';

// Redux
import { connect } from 'react-redux';

// UI Components
import Grid from '@material-ui/core/Grid';
import VideoTile from '../videos/VideoTile';
import CircularProgress from '@material-ui/core/CircularProgress';

const LatestVideos = ({ videos }) => {
  return (
    <Grid container spacing={2}>
      {(videos && Array.isArray(videos) && videos.length > 0) ?
        (videos.map(video => (
          <Grid key={video.etag} item xs={12} sm={6} md={4} lg={4} xl={4}>
            <VideoTile title={video.snippet.title} thumbnail={video.snippet.thumbnails.high.url} videoId={video.id.videoId} />
          </Grid>))) : (
          <div style={{ textAlign: 'center', height: '50px', width: '100%', marginTop: '15px' }}>
            <CircularProgress />
          </div>)}
    </Grid>)
}

const mapStateToProps = ({ appReducer }) => {
  return {
    videos: appReducer.latestVideos
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LatestVideos);