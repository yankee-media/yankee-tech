const functions = require('firebase-functions');
const { handleNewArticle, handleArticleDelete, handleArticleMetaUpdate, handleNewArticleComment } = require('./src/article_management');
const { handleNewUserCreation, handleUserUpdate } = require('./src/user_management');

const ARTICLE_CONTENTS_PATH = '/article_contents/{articleId}';
const ARTICLE_META_PATH = '/article_meta/{articleId}';
const ARTICLE_COMMENTS_PATH = '/article_comments/{articleId}/comments/{commentId}';

const USERS_PATH = '/users/{uid}';

const articleDeleteRuntimeOptions = {
  timeoutSeconds: 540,
  memory: '2GB'
}

exports.onArticleAdded = functions.firestore.document(ARTICLE_CONTENTS_PATH).onCreate(handleNewArticle);
exports.onArticleDelete = functions.runWith(articleDeleteRuntimeOptions).firestore.document(ARTICLE_CONTENTS_PATH).onDelete(handleArticleDelete);
exports.onArticleUpdate = functions.firestore.document(ARTICLE_META_PATH).onUpdate(handleArticleMetaUpdate);
exports.onArticleCommentAdded = functions.firestore.document(ARTICLE_COMMENTS_PATH).onCreate(handleNewArticleComment);

exports.onNewUser = functions.firestore.document(USERS_PATH).onCreate(handleNewUserCreation);
exports.onUserUpdate = functions.firestore.document(USERS_PATH).onUpdate(handleUserUpdate);
