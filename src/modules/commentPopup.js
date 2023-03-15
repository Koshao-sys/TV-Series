import addComment from './addComment.js';
import displayComments from './displayComments';
import getcomments from './getComments.js';

const commentPopup = document.querySelector('.comment-popup');

const popup = async (resultOb) => {
  const closeSign = document.createElement('span');
  closeSign.innerHTML = 'X';
  closeSign.classList = 'close-popup';
  commentPopup.appendChild(closeSign);
  commentPopup.innerHTML += `
<img src="${resultOb.image.medium}" class="popup-img">
<h3 class="tv-title">${resultOb.name}</h3>
<table>
  <tr>
    <td>
      <b>Premiered:</b> ${resultOb.premiered}
    </td>
    <td>
      <b>Ended:</b> ${resultOb.ended}
    </td>
  </tr>
  <tr>
    <td>
      <b>Language:</b> ${resultOb.language}
    </td>
    <td>
      <b>Type:</b> ${resultOb.type}
    </td>
  </tr>
</table>
<h3 class="comment-title">
    Comments <span class="total-comments">(0)</span>
    </h3>
    <ul class="comments">

    </ul>
    <h2 class="form-title">Add a comment</h2>
    <form class="comment-form">
      <input id="name" type="text" name="username" placeholder="Your name" required>
      <textarea id="areatext" placeholder="Your insights" name="comment" required minlength="1"></textarea>
      <button id="submit" type="submit">Submit</button>
    </form>`;
  // display Comments
  const getcoms = await getcomments(resultOb.id);
  const usercoms = document.querySelector('.comments');
  displayComments(getcoms, usercoms);
  // add comment
  const comBtn = document.querySelector('#submit');
  const name = document.querySelector('#name');
  const text = document.querySelector('#areatext');
  addComment(comBtn, name, text, resultOb.id);
};
commentPopup.addEventListener('click', (event) => {
  if (event.target.closest('.close-popup')) {
    commentPopup.style.display = 'none';
    commentPopup.innerHTML = '';
  }
});

export default popup;