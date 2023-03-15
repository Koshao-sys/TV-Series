const getcomments = async (bookId) => {
  bookId = bookId.toString();
  const coms = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/6jTH3jOos7OpnHxCg6lz/comments?item_id=${bookId}`);
  const res = coms.json();
  return res;
};
export default getcomments;