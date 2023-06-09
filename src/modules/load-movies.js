import { getMovies, getLikes, postLikes } from './api.js';
import popup from './commentPopup.js';

const object = [];
const commentPopup = document.querySelector('.comment-popup');

const buildDivElement = (ldMovies, resultOb) => {
  const moviesItem = document.createElement('div');
  moviesItem.classList.add('moviesItem');
  moviesItem.innerHTML = `
      <img class="image" src="${resultOb.image.medium}" alt="">
      <div class="likes-name">
          <p class="title">${resultOb.name}</p>
          <i class="lni lni-heart" id="${resultOb.id}"></i>
      </div>
      <p class="likes-count">${resultOb.likes} Likes</p>`;
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

const CreateMovieElement = async (lodMovies, resultObj) => {
  const flix = document.querySelector('.flix');
  lodMovies.innerHTML = '';
  const result = await getLikes();
  const likesData = result.data;
  const updatedMovies = resultObj.map((movie) => {
    const like = likesData.find((like) => parseInt(like.item_id, 9) === movie.id);
    // eslint-disable-next-line no-unused-expressions
    like ? movie.likes = like.likes : movie.likes = 0;
    object.push(movie);
    return movie;
  });
  for (let i = 0; i < updatedMovies.length; i += 1) {
    buildDivElement(lodMovies, updatedMovies[i]);
  }
  flix.textContent = `Flix (${resultObj.length})`;
};

const showMovies = async () => {
  const loadMovies = document.querySelector('.movie-container');
  const result = await getMovies();
  if (result.success) {
    await CreateMovieElement(loadMovies, result.movieData);
  }
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