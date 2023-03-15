import { getMovies, getLikes, postLikes } from './api.js';

const object = [];

const buildDivElement = (ldMovies, resultOb) => {
  const moviesItem = document.createElement('div');
  moviesItem.classList = 'moviesItem';
  moviesItem.innerHTML = `
      <img class="image" src="${resultOb.image.medium}" alt="">
      <div class="likes-name">
          <p class="title">${resultOb.name}</p>
          <i class="lni lni-heart" id="${resultOb.id}"></i>
      </div>
      <p class="likes-count">${resultOb.likes} Likes</p>
      <button class="comment-btn">Comments</button>
    `;
  ldMovies.appendChild(moviesItem);
};

const CreateMovieElement = (lodMovies, resultObj) => {
  const flix = document.querySelector('.flix');
  lodMovies.innerHTML = '';
  getLikes().then((result) => {
    const likesData = result.data;
    const updatedMovies = resultObj.map((movie) => {
      const like = likesData.find((like) => like.item_id === movie.id);
      // eslint-disable-next-line no-unused-expressions
      like ? movie.likes = like.likes : movie.likes = 0;
      object.push(movie);
      return movie;
    });
    for (let i = 0; i < updatedMovies.length; i += 1) {
      buildDivElement(lodMovies, updatedMovies[i]);
    }
    flix.textContent = `Flix (${resultObj.length})`;
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
    const flixId = e.target.id;
    postLikes(flixId).then((result) => {
      if (result.success) {
        getLikes().then((resultLike) => {
          const newLikes = resultLike.data.find((newlikes) => newlikes.item_id === flixId);
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