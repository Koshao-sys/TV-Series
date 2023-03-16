/**
 * @jest-environment jsdom
 */

import countItems from '../modules/countItems.js';

describe('Test the count of Movies on the Homepage', () => {
  test('Should count all movies displayed on the page and return the count', () => {
    document.body.innerHTML = `
      <div class="movie-container"></div>
    `;
    const ItemContainer = document.querySelector('.movie-container');
    const item2 = document.createElement('div');
    const item3 = document.createElement('div');
    [item2, item3].forEach((movie) => movie.classList.add('movieItem'));
    ItemContainer.append(item2, item3);
    const Count = countItems();
    expect(Count).toBe(2);
  });

  test('Should return the count as zero if there are no elements selected', () => {
    document.body.innerHTML = `
      <div class="movie-container"></div>
    `;
    const Count = countItems();
    expect(Count).toBe(0);
  });
});