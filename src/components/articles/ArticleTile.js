import React from 'react';

// UI Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

// Util
import { COVER_IMAGE, ARTICLE_TITLE, ARTICLE_CATEGORIES, ARTICLE_ID, ARTICLE_KEYWORDS } from '../../util/constants';
import { Link } from 'react-router-dom';

const ArticleTile = ({ meta }) => {
  return (
    <Paper style={{ padding: '8px', marginBottom: '16px' }}>
      <div className={meta[ARTICLE_ID] ? '' : 'gradient-layer'} style={{ overflow: 'hidden', position: 'relative', paddingTop: '56.25%', borderRadius: '4px', marginBottom: '6px' }}>
        <Link to={`/article/${meta[ARTICLE_ID]}`}>
          {meta[COVER_IMAGE] && <img style={{ width: '100%', position: 'absolute', top: 0, left: 0 }} src={meta[COVER_IMAGE]} alt='article cover' />}
        </Link>
      </div>
      <Typography style={{ height: '63px', overflow: 'hidden', marginBottom: '4px' }}><Link to={`/article/${meta[ARTICLE_ID]}`}>{meta[ARTICLE_TITLE]}</Link></Typography>
      <Typography component='div' style={{ height: '28px', overflow: 'hidden' }}>
        {(meta[ARTICLE_CATEGORIES] &&
          Array.isArray(meta[ARTICLE_KEYWORDS])) &&
          meta[ARTICLE_KEYWORDS].map(keyword => keyword && (
            <div key={keyword} style={{ display: 'inline-block', margin: '3px' }}>
              <Link to={`/search?q=${encodeURIComponent(keyword)}`}>
                <Chip color='primary' label={keyword} size='small' />
              </Link>
            </div>)
          )}
      </Typography>
    </Paper>
  )
}

export default ArticleTile;