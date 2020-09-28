// Icons
import Business from '@material-ui/icons/Business';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import FindInPage from '@material-ui/icons/FindInPage';
import Code from '@material-ui/icons/Code';
import Build from '@material-ui/icons/Build';

// Constants
import { MATERIAL_RED } from '../util/constants';

export const navButtons = [
  {
    title: 'Career',
    link: '/career',
    Icon: Business
  },
  {
    title: 'Job Searching',
    link: '/job-searching',
    Icon: FindInPage
  },
  {
    title: 'Tutorials',
    link: '/tutorials',
    Icon: SpeakerNotes
  },
  {
    title: 'Web Dev',
    link: '/web-dev',
    Icon: Code
  },
  {
    title: 'Tools & Resources',
    link: '/tools-and-resources',
    Icon: Build
  }
]

export const homepageTop = [
  {
    title: 'Get the Job',
    buttonTitle: 'More Job Searching Articles!',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yankee-tech.appspot.com/o/homepage_top%2F3661727.jpg?alt=media&token=9b79ba9d-df86-4ce4-b7d8-d365ce86b777',
    articles: 'jobSearchingArticles',
    color: MATERIAL_RED,
    link: '/job-searching',
    alt: 'job-searching'
  },
  {
    title: 'Learn To Code',
    buttonTitle: 'More Tutorials!',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yankee-tech.appspot.com/o/homepage_top%2F2842680.jpg?alt=media&token=11ee4b75-ed7b-40ff-8bd1-10fe218b6fd1',
    articles: 'tutorialArticles',
    color: '#ef5350',
    link: '/tutorials',
    alt: 'tutorials'
  },
  {
    title: 'Level Up Your Career',
    buttonTitle: 'More Career Articles!',
    imgUrl: 'https://firebasestorage.googleapis.com/v0/b/yankee-tech.appspot.com/o/homepage_top%2F76.jpg?alt=media&token=7cd38fcd-2d0e-453a-964c-30ff28432b4e',
    articles: 'careerArticles',
    color: '#e53935',
    link: '/career',
    alt: 'career'
  }
];