import React, { useEffect, useState } from 'react';

// Router
import { withRouter } from 'react-router-dom';

// Custom Components
import ArticleGetter from './ArticleGetter';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import CommentTile from './CommentTile';

// Redux
import { compose } from 'redux'; 
import { connect } from 'react-redux';
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase';
import { postComment, toggleDialog } from '../../store/actions';

// Util
import ArticleParser from 'yankee-article-parser';
import { COMMENT_ID } from '../../util/constants';

const ArticlePage = ({ content, meta, comments, match, auth, postComment, openDialog, commentCount }) => {
  const [articleId, setArticleId] = useState('');
  const [comment, setComment] = useState('');
  const [maxCount, setMaxCount] = useState(5);
  const setCommentFromEvent = e => {
    setComment(e.target.value);
  }
  const postNewComment = () => {
    postComment(articleId, comment.slice());
    setComment('');
  }
  useEffect(() => {
    const articleId = match.params.articleId;
    if (articleId) {
      setArticleId(articleId);
    }
  }, [match.params.articleId]);
  return (
    <div style={{ maxWidth: '1200px', margin: '15px auto 0 auto', padding: '8px' }}>
      <ScrollToTopOnMount />
      <ArticleParser
      openLogin={() => openDialog(<Login />, 'Login:', 'sm')}
      openSignup={() => openDialog(<Signup />, 'Create Your Account:', 'sm')} 
      comment={comment}
      commentCount={(commentCount && commentCount.count) || 0}
      maxCount={maxCount}
      setMaxCount={setMaxCount}
      comments={comments &&  comments.map(nextComment => <CommentTile key={nextComment[COMMENT_ID]} comment={nextComment} />)}
      setComment={setCommentFromEvent}
      postComment={postNewComment}
      isLoggedIn={isLoaded(auth) && !isEmpty(auth)} 
      content={content} meta={meta} auth={auth} />
      <ArticleGetter articleId={articleId} maxCount={maxCount} />
    </div>
  )
}

const mapStateToProps = ({ firestore, firebase }) => {
  return {
    auth: firebase.auth,
    content: firestore.data.viewingArticleContents,
    meta: firestore.data.viewingArticleMeta,
    comments: firestore.ordered.viewingArticleComments,
    commentCount: firestore.data.viewingArticleCommentsCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postComment: (articleId, comment) => dispatch(postComment(articleId, comment)),
    openDialog: (component, title, maxWidth) => dispatch(toggleDialog(true, component, title, maxWidth))
  }
};

export default compose(withRouter, withFirebase, connect(mapStateToProps, mapDispatchToProps))(ArticlePage);