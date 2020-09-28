import React from 'react';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// UI Components
import Grid from '@material-ui/core/Grid';

// Custom Components
import ArticleTile from '../articles/ArticleTile';
import Loading from '../../Loading';

// Util
import { ARTICLE_META, ARTICLE_CATEGORIES, UNIX_CREATED_AT, ARTICLE_ACTIVE, ARTICLE_ID, ARTICLE_CATEGORIES_MAP } from '../../util/constants';
import { Typography } from '@material-ui/core';


const CategoryPageInner = ({ articles, category }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '8px' }}>
      {Array.isArray(articles) ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography align='center' variant='h5' color='primary' style={{ marginBottom: '15px', textDecoration: 'underline', textDecorationColor: '#fff' }}>{ARTICLE_CATEGORIES_MAP.get(category)}</Typography>
          </Grid>
          {articles.map(meta => <Grid key={meta[ARTICLE_ID]} item xs={12} sm={6} md={4} lg={4} xl={4}><ArticleTile meta={meta} /></Grid>)}
        </Grid>
      ) : (
          <Loading absolute />
        )}
    </div>
  )
}

const mapStateToProps = ({ firestore }) => {
  return {
    articles: firestore.ordered.currentCategories
  }
}

const mapDispatchToProps = () => ({});

export default compose(firestoreConnect(({ category }) => {
  if (!!category) {
    return [{ collection: ARTICLE_META, where: [[ARTICLE_CATEGORIES, 'array-contains', category], [ARTICLE_ACTIVE, '==', true]], orderBy: [UNIX_CREATED_AT, 'desc'], storeAs: 'currentCategories' }]
  }
  return []
}), connect(mapStateToProps, mapDispatchToProps))(CategoryPageInner);