const commentPopup = document.querySelector('.comment-popup');

const popup = (resultOb) => {
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
    Comments (<span class="total-comments">0</span>)
    </h3>
    <ul class="comments">
      fetching comments...
    </ul>
    <form class="comment-form">
      <h2>Add a comment</h2>
      <input type="text" name="username" placeholder="Your name" required>
      <textarea placeholder="Your insights" name="comment" required minlength="1"></textarea>
      <button type="submit">Submit</button>
    </form>`;
};
commentPopup.addEventListener('click', (e) => {
  if (e.target.closest('.close-popup')) {
    commentPopup.style.display = 'none';
    commentPopup.innerHTML = '';
  }
});

export default popup;