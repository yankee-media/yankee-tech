import { Route } from 'react-router-dom';

import Homepage from '../components/homepage/Homepage';
import ArticlePage from '../components/articles/ArticlePage';
import SearchPage from '../components/search/SearchPage';
import CategoryPage from '../components/category/CategoryPage';
import AccountSettings from '../components/AccountSettings';
import AllVideos from '../components/videos/AllVideos';
import ProtectedRoute from '../ProtectedRoute';
import { Tools, ComplexityVisualization } from '../loadable';


const HOMEPAGE_ROUTE = {props: {path: '/', component: Homepage, exact: true }, Route};
const TOOLS_ROUTE = {props: {path: '/tools-and-resources', component: Tools, exact: true }, Route};
const COMPLEXITY_VISUALIZATION = {props: {path: '/tools/complexity-visualization', component: ComplexityVisualization, exact: true }, Route};
const ARTICLE_ROUTE = {props: {path: '/article/:articleId', component: ArticlePage, exact: true }, Route};
const SEARCH_ROUTE = {props: {path: '/search', component: SearchPage, exact: true }, Route};
const ALL_VIDEOS_ROUTE = {props: {path: '/all-videos', component: AllVideos, exact: true }, Route};
const CATEGORY_ROUTE = {props: {path: '/:category', component: CategoryPage, exact: true }, Route};
const ACCOUNT_SETTINGS_ROUTE = {props: {path: '/account-settings', component: AccountSettings, exact: true }, Route: ProtectedRoute};

export const ROUTES = [
  HOMEPAGE_ROUTE,
  TOOLS_ROUTE,
  COMPLEXITY_VISUALIZATION,
  ARTICLE_ROUTE,
  SEARCH_ROUTE,
  ALL_VIDEOS_ROUTE,
  ACCOUNT_SETTINGS_ROUTE,
  CATEGORY_ROUTE
];