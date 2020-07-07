// wait for the document to load)
window.onload = () => {
  document.getElementById('saveDog').addEventListener('click', signup)
};

const signup = async (ev) => {

  ev.preventDefault();

  let form = new FormData();
  const file = document.getElementById('photo')
  console.log('file', file)
  // check that files.files contains something - i imagine it will need to check the .length of that to be greater than 0
  // if they haven't added a file, tell them they need to, and return from the function
  console.log('file.files[0]', file.files[0])
  form.append('photo', file.files[0], file.files[0].name);
  // add in other form fields here...

  // also check name is valid string...

  form.set('name', document.getElementById('name').value);
  // don't need to set votes, as it's always zero, so we set in the server
  form.set('votes', 0);
  // add a try/catch here - then check response status code is 200, and then display message/redirect to the homepage
  const response = await axios.post('/dog', form, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    }
  });
  console.log('response', response)

}
