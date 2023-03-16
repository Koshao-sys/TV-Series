import countComments from './countComments.js';

const displayComments = (getcoms, usercoms) => {
  usercoms.innerHTML = '';
  if (getcoms.length > 0) {
    getcoms.forEach((com) => {
      const link = document.createElement('li');
      link.classList.add('commment-item');
      link.innerHTML = `${com.creation_date} ${com.username} : ${com.comment}`;
      usercoms.appendChild(link);
    });
    const checkCount = document.querySelector('.total-comments');
    const commentCount = countComments(getcoms);
    checkCount.innerHTML = `(${commentCount})`;
  }
};

export default displayComments;