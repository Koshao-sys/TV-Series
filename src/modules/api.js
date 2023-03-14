const movies = [1, 2, 3, 4, 5, 6, 7, 8];
const baseUrl = 'https://api.tvmaze.com';
const showsUrl = '/shows/';
const invApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const appId = '6jTH3jOos7OpnHxCg6lz';
const addLike = `/apps/${appId}/likes/`;

const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
  });
  return response.json();
};

const getlikesCount = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const getMovies = async () => {
  try {
    const movieObj = [];
    for (let x = 0; x < movies.length; x += 1) {
      // const moviesId = baseUrl + showsUrl + movies[x];
      // const data = await getData(moviesId);
      // movieObj.push(getData(moviesId));
      const moviesId = baseUrl + showsUrl + movies[x];
      const promise = getData(moviesId);
      movieObj.push(promise);
    }
    const movieData = await Promise.all(movieObj);
    return { success: true, movieData };
  } catch (error) {
    return { success: false, error };
  }
};

const getLikes = async () => {
  try {
    const postLikeUrl = invApi + addLike;
    const data = await getlikesCount(postLikeUrl);
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

/* const postLikes = async (id) => {
  try {
    const postLikeUrl = invApi + addLike;
    const data = await getlikesCount(postLikeUrl, id);
  } catch (error) {
    return { success: false, error };
  }
}; */

export { getMovies, getLikes };