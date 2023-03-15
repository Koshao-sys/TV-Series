import { getMovies, getLikes } from './api.js';
import popup from './commentPopup.js';

const commentPopup = document.querySelector('.comment-popup');

const buildDivElement = (ldMovies, resultOb, cnt) => {
  const moviesItem = document.createElement('div');
  moviesItem.classList = 'moviesItem';
  moviesItem.innerHTML = `
      <img src="${resultOb.image.medium}" alt="">
      <div class="likes-name">
          <p>${resultOb.name}</p>
          <i class="lni lni-heart"></i>
      </div>
      <p class="likes-count">${cnt} Likes</p>`;
  const btn = document.createElement('button');
  btn.classList = 'comment-btn';
  btn.innerHTML = 'Comments';
  moviesItem.appendChild(btn);
  btn.addEventListener('click', () => {
    commentPopup.style.display = 'grid';
    popup(resultOb);
  });
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

const parentElement = document.querySelector('.movie-container');
parentElement.addEventListener('click', (e) => {
  if (e.target.matches('.lni.lni-heart')) {
    const flixsId = e.target.id;
    postLikes(flixsId).then((result) => {
      if (result.success) {
        getLikes().then((resultLike) => {
          const newLikes = resultLike.data.find((newlikes) => newlikes.item_id === flixsId);
          const newParent = e.target.parentElement.parentElement;
          const addLikes = newParent.querySelector('.likes-count');
          addLikes.classList.add('transition');
          addLikes.textContent = `${newLikes.likes} Likes`;
          setTimeout(() => {
            addLikes.classList.remove('transition');
          }, 500);
        });
      }
    });
  }
});

export default showMovies;