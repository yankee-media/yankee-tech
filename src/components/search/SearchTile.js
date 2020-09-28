import React from 'react';

// UI Components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import ArrowRight from '@material-ui/icons/ArrowRight';

// Router
import { Link } from 'react-router-dom';

// Date Time
import moment from 'moment';

// Util
import { COVER_IMAGE, ARTICLE_TITLE, ARTICLE_SUMMARY, CREATED_AT, ARTICLE_ID } from '../../util/constants';

const SearchTile = ({ article }) => {
  return (
    <Paper style={{ padding: '8px', marginBottom: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
          <div>
            <Link target='_blank' to={`/article/${article[ARTICLE_ID]}`}><img src={article[COVER_IMAGE]} style={{ width: '100%' }} alt='main' /></Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={9} xl={9}>
          <Typography color='primary' variant='h6' style={{ maxHeight: '64px', overflow: 'hidden', marginBottom: '4px' }}><Link target='_blank' to={`/article/${article[ARTICLE_ID]}`}>{article[ARTICLE_TITLE]}</Link></Typography>
          <Typography style={{ maxHeight: '96px', overflow: 'hidden' }}>{article[ARTICLE_SUMMARY]}</Typography>
        </Grid>
        <Grid style={{ paddingTop: '0' }} item xs={12} sm={4} md={3} lg={3} xl={3}>
          <Typography variant='subtitle2' align='center'>{moment(article[CREATED_AT]).format('MMMM DD YYYY')}</Typography>
        </Grid>
        <Grid style={{ paddingTop: '0', textAlign: 'right' }} item xs={12} sm={8} md={9} lg={9} xl={9}>
          <div style={{ display: 'flex' }}>
            <div></div>
            <span style={{ flex: 1 }}></span>
            <Link target='_blank' to={`/article/${article[ARTICLE_ID]}`}>
              <div className='link-like' style={{ display: 'flex' }}>
                <Typography style={{ display: 'inline-block' }} color='primary'>See More</Typography>
                <ArrowRight />
              </div>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper >
  )
}

export default SearchTile;