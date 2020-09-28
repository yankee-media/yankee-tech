import React from 'react';

// Custom Components
import HomepageTop from './HomepageTop';
import LatestArticles from './LatestArticles';
import LatestVideos from './LatestVideos';
import Search from './Search';
import HomepageArticleGetter from './HomepageArticleGetter';

// UI Components
import Typography from '@material-ui/core/Typography';

// Icons
import ArrowRight from '@material-ui/icons/ArrowRight';

// Router
import { Link } from 'react-router-dom';

// Util
import { MATERIAL_RED } from '../../util/constants';


const Homepage = () => {
  return (
    <div>
      <HomepageTop />
      <div style={{ maxWidth: '1230px', margin: '30px auto 0 auto', padding: '0 15px' }}>
        <Search />
        <Typography variant='h5' style={{ textAlign: 'center', textDecoration: 'underline', textDecorationColor: MATERIAL_RED, margin: '25px 0 8px 0' }}>Latest Posts</Typography>
        <LatestArticles />
        <div style={{position: 'relative', left: 0, top: 0}}>
          <Typography style={{ position: 'absolute', right: '10px', top: '20px' }}><Link to='/all-videos'>See All Yankee Tech Videos <ArrowRight color='primary' style={{position: 'relative', top: '7px'}} /></Link></Typography>
        </div>
        <Typography variant='h5' style={{ textAlign: 'center', textDecoration: 'underline', textDecorationColor: MATERIAL_RED, margin: '25px 0 8px 0' }}>Latest Videos</Typography>
        <LatestVideos />
      </div>
      <HomepageArticleGetter />
    </div>
  )
}

export default Homepage;