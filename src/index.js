import './style.css';
import showMovies from './modules/load-movies.js';
import countItems from './modules/countItems.js';

const initialize = async () => {
  await showMovies();
  countItems();
};

initialize();
