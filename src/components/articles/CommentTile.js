import React from 'react';

// UI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Util
import { ARTICLE_COMMENT_AVATAR_URL, ARTICLE_COMMENT_AUTHOR, ARTICLE_COMMENT_COMMENTS_COMMENT } from '../../util/constants';

const CommentTile = ({ comment }) => {
  return (
    <React.Fragment>
      <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
        <img src={comment[ARTICLE_COMMENT_AVATAR_URL]} style={{width: '100%', borderRadius: '50%'}} alt='user comment' />
      </Grid>
      <Grid item xs={10} sm={10} md={11} lg={11} xl={11}>
        <Typography variant='h6'>{comment[ARTICLE_COMMENT_AUTHOR]}</Typography>
        <Typography style={{marginBottom: '6px'}}>{comment[ARTICLE_COMMENT_COMMENTS_COMMENT]}</Typography>
      </Grid>
    </React.Fragment>
  )
}

export default CommentTile;