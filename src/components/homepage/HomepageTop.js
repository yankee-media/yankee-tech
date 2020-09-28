import React, { useState } from 'react';

// UI Components
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';

// Elements
import { homepageTop } from '../../util/elements';

// Custom Components
import HomepageTopTile from './HomepageTopTile';

const DEFAULT_IS_CLICKED_STATE = { 0: false, 1: false, 2: false };

const HomepageTop = props => {
  const [isClicked, updateClicked] = useState(DEFAULT_IS_CLICKED_STATE);
  return (
    <Grid id='adaptable-homepage-top' container spacing={0}>
      {homepageTop.map(({articles, ...tile}, index) => <HomepageTopTile key={tile.title}  articles={props[articles]} index={index} isClicked={isClicked[index]} updateClicked={() => updateClicked({...DEFAULT_IS_CLICKED_STATE, [index]: !isClicked[index]})} {...tile} />)}
    </Grid>
  )
}

export default connect(({ firestore }) => ({
  careerArticles: firestore.ordered.latestCareerArticles,
  jobSearchingArticles: firestore.ordered.latestJobSearchingArticles,
  tutorialArticles: firestore.ordered.latestTutorialArticles
}), () => ({}))(HomepageTop);