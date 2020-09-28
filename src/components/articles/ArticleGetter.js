import { firestoreConnect } from 'react-redux-firebase';

// Util
import { 
  ARTICLE_CONTENTS, 
  ARTICLE_META, 
  ARTICLE_COMMENTS, 
  ARTICLE_COMMENT_COMMENTS, 
  UNIX_CREATED_AT } from '../../util/constants';

const ArticleGetter = () => null;

export default firestoreConnect(({ articleId, maxCount }) => {
  if (articleId) {
    return [
      { collection: ARTICLE_CONTENTS, doc: articleId, storeAs: 'viewingArticleContents' },
      { collection: ARTICLE_META, doc: articleId, storeAs: 'viewingArticleMeta' },
      { collection: ARTICLE_COMMENTS, doc: articleId,
         subcollections: [{collection: ARTICLE_COMMENT_COMMENTS,
           orderBy: [UNIX_CREATED_AT, 'desc'],
           limit: maxCount || 5 }], storeAs: 'viewingArticleComments' },
      { collection: ARTICLE_COMMENTS, doc: articleId, storeAs: 'viewingArticleCommentsCount'}
    ]
  }
  return [];
})(ArticleGetter);