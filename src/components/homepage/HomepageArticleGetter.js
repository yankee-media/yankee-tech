import { firestoreConnect } from 'react-redux-firebase';

// Util
import { 
  ARTICLE_META, 
  UNIX_CREATED_AT, 
  ARTICLE_ACTIVE, 
  ARTICLE_CATEGORIES,
  CATEGORY_CAREER,
  CATEGORY_JOB_SEARCHING,
  CATEGORY_TUTORIALS
 } from '../../util/constants';

const HomepageArticleGetter = () => null;

export default firestoreConnect([
  {
    collection: ARTICLE_META,
    where: [ARTICLE_ACTIVE, '==', true],
    orderBy: [UNIX_CREATED_AT, 'desc'],
    limit: 3,
    storeAs: 'latestArticles'
  },
  {
    collection: ARTICLE_META,
    where: [[ARTICLE_ACTIVE, '==', true], [ARTICLE_CATEGORIES, 'array-contains', CATEGORY_CAREER]],
    orderBy: [UNIX_CREATED_AT, 'desc'],
    limit: 3,
    storeAs: 'latestCareerArticles'
  },
  {
    collection: ARTICLE_META,
    where: [[ARTICLE_ACTIVE, '==', true], [ARTICLE_CATEGORIES, 'array-contains', CATEGORY_JOB_SEARCHING]],
    orderBy: [UNIX_CREATED_AT, 'desc'],
    limit: 3,
    storeAs: 'latestJobSearchingArticles'
  },
  {
    collection: ARTICLE_META,
    where: [[ARTICLE_ACTIVE, '==', true], [ARTICLE_CATEGORIES, 'array-contains', CATEGORY_TUTORIALS]],
    orderBy: [UNIX_CREATED_AT, 'desc'],
    limit: 3,
    storeAs: 'latestTutorialArticles'
  }
])(HomepageArticleGetter);