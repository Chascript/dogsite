/* eslint-disable no-undef */
const redirect = (html) => {
  const newPage = `${html}.html`;
  window.location.assign(newPage);
};

window.onload = () => {
  const signup = document.getElementById('signup-page').addEventListener('click', () => { redirect('signup'); }, false);
  const index = document.getElementById('voting-gallery-page').addEventListener('click', () => { redirect('index'); }, false);
};
