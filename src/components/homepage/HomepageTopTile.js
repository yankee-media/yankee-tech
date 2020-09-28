import React from 'react';

// UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Router
import { Link } from 'react-router-dom';

// Icons
import DoubleArrow from '@material-ui/icons/DoubleArrow';

// Custom Components
import ArticleTile from '../articles/ArticleTile';

// Util
import { ARTICLE_ID } from '../../util/constants';

const HomepageTopTile = ({ articles, buttonTitle, title, imgUrl, isClicked, updateClicked, color, link, alt }) => {
  return (
    <Grid className='homepage-top-wrapper' style={{ height: '100%' }} item xs={false} sm={false} md={4} lg={4} xl={4}>
    <div className='homepage-top-inner' style={{ marginLeft: '40px', width: 'calc(33.33% - 40px)', position: 'absolute', padding: '0 5px' }}>
      <div style={{ height: '286px', overflowY: 'scroll' }}>
        {Array.isArray(articles) ? (articles.map(meta => (
          <Grid key={meta[ARTICLE_ID]} item xs={12} sm={12} md={12} lg={6} xl={4}>
            <ArticleTile meta={meta} />
          </Grid>))) : (
            [1, 2, 3].map(key => (
              <Grid key={key} item xs={12} sm={12} md={12} lg={6} xl={4}>
                <ArticleTile meta={{}} />
              </Grid>)))}
      </div>
      <div>
            <Link to={link}><Button fullWidth variant='contained' color='primary'>{buttonTitle}</Button></Link>
      </div>
    </div>
    <div onClick={updateClicked} className={isClicked ? 'homepage-top-reduce' : 'homepage-top-open'} style={{ backgroundColor: color, height: '100%', position: 'relative', textAlign: 'center' }}>
      <img className='homepage-top-scale-img' style={{ position: 'absolute', transform: 'translate(-50%)', borderRadius: '5px' }} src={imgUrl} alt={alt} />
            <Typography className='homepage-top-scale' variant='h6' style={{ position: 'absolute', width: '100%' }}>{title}</Typography>
      <DoubleArrow className='homepage-top-arrow' style={{ position: 'absolute', right: '5px', transform: 'translate(0, -12px)' }} />
    </div>
  </Grid>
  )
}

export default HomepageTopTile;