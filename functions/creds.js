require('dotenv').config()

// Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin
    .credential
    .cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB
});
const firestore = admin.firestore();

// Algolia
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const ARTICLES_INDEX = 'articles';
const articlesIndex = client.initIndex(ARTICLES_INDEX);

exports.db = firestore;
exports.articlesIndex = articlesIndex;
exports.FieldValue = admin.firestore.FieldValue;