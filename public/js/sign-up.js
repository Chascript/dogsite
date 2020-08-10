/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
// check if username exists
const usernameExists = async () => {
  const message = document.getElementById('error-username');
  const username = document.getElementById('username').value;
  if (username.value === '') {
    message.innerText = 'Username is required!';
    message.style.color = '#ff0000';
    return;
  }
  // send the username value
  try {
    const response = await axios.get(`dogs/${username}/exist`);

    // retrieve the result (true or false)
    if (response.data) {
      message.innerText = `${username} is already in use`;
      message.style.color = '#ff0000';
      result = true;
    } else {
      message.innerText = `${username} availible`;
      message.style.color = '#119100';
      result = false;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return result;
};

const validateEmail = async () => {
  const message = document.getElementById('error-email');
  const email = document.getElementById('email').value;
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(pattern)) {
    message.innerText = 'Email Address Is Valid';
    message.classList.remove('error');
    message.classList.add('valid');
    result = true;
  } else {
    message.innerText = 'Email not valid';
    message.classList.add('error');
    message.classList.remove('valid');
    result = false;
  }
  if (email === '') {
    message.classList.remove('error');
    message.classList.remove('valid');
    message.innerText = '';
  }
  return result;
};

const signup = async (ev) => {
  ev.preventDefault();
  // fields that require inputs
  const messages = [];
  // error elements
  const errorMessage = document.getElementById('error-message');
  const errorImage = document.getElementById('error-image');
  const errorUsername = document.getElementById('error-username');
  const errorName = document.getElementById('error-name');
  const errorBreed = document.getElementById('error-breed');
  const errorDob = document.getElementById('error-dob');
  const errorColour = document.getElementById('error-colour');
  // Values
  const file = document.getElementById('photo');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const name = document.getElementById('name');
  const breed = document.getElementById('breed');
  const dob = document.getElementById('dob');
  const colour = document.getElementById('colour');

  const form = new FormData();
  // image
  if (file.files.length > 0) { // is there an image?
    errorImage.innerText = ''; // true - show no error
    form.append('photo', file.files[0], file.files[0].name); // assign key pair image with the file name to photo
  } else {
    errorImage.innerText = 'Image is required'; // display error
    messages.push('image'); // push image into array messages (to prevent form submitting)
  }
  // username
  if (username.value === '' || username.value == null) {
    errorUsername.style.color = '#ff0000';
    errorUsername.innerText = 'Username is required';
    messages.push('username');
  } else if (await usernameExists()) {
    messages.push('usernameexists');
  } else {
    form.set('username', username.value);
  }
  // email
  if (email.value === '' || email.value == null) {
    form.set('email', 'User left blank');
  } else if (await validateEmail()) {
    form.set('email', email.value);
  } else {
    messages.push('emailinvalid');
  }
  // name
  if (name.value === '' || name.value == null) {
    errorName.innerText = 'Name is required';
    messages.push('name');
  } else {
    errorName.innerText = '';
    form.set('name', name.value);
  }
  // breed
  if (breed.value === '' || breed.value == null) {
    errorBreed.innerText = 'Breed is required';
    messages.push('breed');
  } else {
    errorBreed.innerText = '';
    form.set('breed', breed.value);
  }
  // dob
  if (dob.value === '' || dob.value == null) {
    errorDob.innerText = 'Date Of Birth is required';
    messages.push('dob');
  } else {
    errorDob.innerText = '';
    form.set('dob', dob.value);
  }
  // colour
  if (colour.value === '' || colour.value == null) {
    errorColour.innerText = 'Colour is required';
    messages.push('colour');
  } else {
    errorColour.innerText = '';
    form.set('colour', colour.value);
  }

  console.log(messages);
  // error message
  if (messages.length > 0) {
    errorMessage.innerText = 'Please correct fields';
    return;
  }
  errorMessage.innerText = '';

  // add a try/catch here - then check response status code is 200, and then display message/redirect to the homepage
  await axios.post('/dog', form, {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    },
  });
  window.location.assign('index.html');
  document.getElementById('form').reset();
};
// wait for the document to load)
window.onload = () => {
  document.getElementById('saveDog').addEventListener('click', signup);
};

const showPreview = (event) => {
  if (event.target.files.length > 0) { // has user select image file?
    const src = URL.createObjectURL(event.target.files[0]); // to target the selected image
    const preview = document.getElementById('image-preview-image'); // to target where the image will be preview
    preview.src = src; // preview the image with styles below
    preview.style.display = 'block';
  }
};
