function countItems() {
  const countMovies = document.querySelectorAll('.movie-container > *');
  return countMovies.length;
}

export default countItems;
