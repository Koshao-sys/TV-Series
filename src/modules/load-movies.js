import { getMovies, getLikes } from './api.js';

const buildDivElement = (ldMovies, resultOb, cnt) => {
  const moviesItem = document.createElement('div');
  moviesItem.classList = 'moviesItem';
  moviesItem.innerHTML = `
      <img src="${resultOb.image.medium}" alt="">
      <div class="likes-name">
          <p>${resultOb.name}</p>
          <i class="lni lni-heart"></i>
      </div>
      <p class="likes-count">${cnt} Likes</p>
      <button class="comment-btn">Comments</button>
    `;
  ldMovies.appendChild(moviesItem);
};

const CreateMovieElement = (lodMovies, resultObj) => {
  const flix = document.querySelector('.flix');
  lodMovies.innerHTML = '';
  getLikes().then(() => {
    for (let i = 0; i < resultObj.length; i += 1) {
      buildDivElement(lodMovies, resultObj[i], 0);
    }
    flix.textContent = `Flix(${resultObj.length})`;
  });
};

const showMovies = () => {
  const loadMovies = document.querySelector('.movie-container');
  getMovies().then((result) => {
    if (result.success) {
      CreateMovieElement(loadMovies, result.movieData);
    }
  });
};

export default showMovies;