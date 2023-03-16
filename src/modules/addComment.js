import getcomments from './getComments.js';
import displayComments from './displayComments.js';

const invApiComment = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/6jTH3jOos7OpnHxCg6lz/comments/';

export default (button, username, text, bookId) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    bookId = bookId.toString();
    const uname = username.value.trim();
    const ucomment = text.value.trim();
    if (uname && ucomment) {
      await fetch(invApiComment, {
        method: 'POST',
        body: JSON.stringify({
          item_id: bookId,
          username: uname,
          comment: ucomment,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    }
    username.value = '';
    text.value = '';

    // rendercomments after update
    const getcoms = await getcomments(bookId);
    const usercoms = document.querySelector('.comments');
    displayComments(getcoms, usercoms);
  });
};