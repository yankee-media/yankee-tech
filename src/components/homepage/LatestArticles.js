import React from 'react';

// UI Components
import Grid from '@material-ui/core/Grid';

// Custom Components
import ArticleTile from '../articles/ArticleTile';

// Redux
import { connect } from 'react-redux';

// Util
import { ARTICLE_ID } from '../../util/constants';

const LatestArticles = ({ articles }) => {
  return (
    <Grid container spacing={2}>
      {(articles && Array.isArray(articles) && articles.length > 0) ?
        (articles.map(meta => (
          <Grid key={meta[ARTICLE_ID]} item xs={12} sm={6} md={4} lg={4} xl={4}>
            <ArticleTile meta={meta} />
          </Grid>))) : (
          [1, 2, 3].map(key => (
            <Grid key={key} item xs={12} sm={6} md={4} lg={4} xl={4}>
              <ArticleTile meta={{}} />
            </Grid>)))}
    </Grid>)
}

const mapStateToProps = ({ firestore }) => {
  return {
    articles: firestore.ordered.latestArticles
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LatestArticles)