// wait for the document to load)
window.onload = () => {
  document.getElementById('saveDog').addEventListener('click', signup)
};


const signup = async (ev) => {
  ev.preventDefault();
  //fields that need inputs
  let messages = []
  //error elements
  const errorMessage = document.getElementById('error-message')
  const errorImage = document.getElementById('error-image')
  const errorUsername = document.getElementById('error-username')
  const errorName = document.getElementById('error-name')
  const errorBreed = document.getElementById('error-breed')
  const errorDob = document.getElementById('error-dob')
  const errorColour = document.getElementById('error-colour')

  //Values
  const file = document.getElementById('photo')
  const username = document.getElementById('username')
  const name = document.getElementById('name');
  const breed = document.getElementById('breed');
  const dob = document.getElementById('dob');
  const colour = document.getElementById('colour');

  let form = new FormData();

  //image
  if(file.files.length > 0){
    errorImage.innerText = ''
    form.append('photo', file.files[0], file.files[0].name);
  } else{
    errorImage.innerText = 'Image is required'
    messages.push('image')
  }
   //username
   if(username.value === '' || username.value == null){
    errorUsername.style.color = '#ff0000'
    errorUsername.innerText= 'Username is required'
    messages.push('username')
  } else {   
      if ( await usernameExists()) {
        console.log('username already exists')
        messages.push('usernameexists')
      }else{
        console.log('username is added to form data SUBMIT')
        form.set('username', username.value)
    }}
  //name
  if(name.value === '' || name.value == null){
    errorName.innerText= 'Name is required'
    messages.push('name')
  } else{
    errorName.innerText = ''
    form.set('name', name.value);
  }
  //breed
  if(breed.value === '' || breed.value == null){
    errorBreed.innerText = 'Breed is required'
    messages.push('breed')
  } else{
    errorBreed.innerText = ''
    form.set('breed', breed.value);
  }  
  //dob
  if(dob.value === '' || dob.value == null){
    errorDob.innerText = 'Date Of Birth is required'
    messages.push('dob')
  } else{
    errorDob.innerText = ''
    form.set('dob', dob.value);
  }  
  //colour
  if(colour.value === '' || colour.value == null){
    errorColour.innerText= 'Colour is required'
    messages.push('colour')
  } else{
    errorColour.innerText = ''
    form.set('colour', colour.value);
  }
  //error message
  console.log(messages)
  if(messages.length > 0){
    errorMessage.innerText = 'Please correct fields'
    return
  } else{
    errorMessage.innerText = ''
  }

  // add a try/catch here - then check response status code is 200, and then display message/redirect to the homepage
  const response = await axios.post('/dog', form, {
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
    }
  });
  console.log('response', response)

  window.location.assign('index.html');
  document.getElementById('form').reset();
}

const showPreview = (event) => {
  if(event.target.files.length > 0){
    const src = URL.createObjectURL(event.target.files[0]);
    const preview = document.getElementById("image-preview-image");
    preview.src = src;
    preview.style.display = "block";
    preview.style.maxHeight = "250px";
    preview.style.maxWidth = "250px";
    preview.style.borderRadius = "50%";
  }
}

//check if username exists
const usernameExists = async (ev) => {
  console.log('checking if username is used.....')
  const message = document.getElementById('error-username')
  const username = document.getElementById('username').value
  if(username.length === 0){ 
    message.innerText = ''
    return
  }
  //send the username value
  try {
    const response = await axios.get(`dogs/${username}/exist`)
    
    //retrieve the result (true or false)
    if(response.data) {
      message.innerText = `${username} is already in use`
      message.style.color = '#ff0000'
      console.log('taken')
      console.log('username in messages')
      result = true
    }else {
      message.innerText = `${username} availible`
      message.style.color = '#119100'
      console.log('free')
      console.log('avalible')
      result = false
    }  
  }
  catch(err){
    console.log(err)
  }
  return result;
}
