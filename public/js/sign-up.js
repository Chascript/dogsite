// wait for the document to load)
window.onload = () => {

//button 
    document.getElementById('saveDog').addEventListener('click', logDog)

    // assign a click event to the saveDog button
  //  document.getElementById('saveDog').onclick = logDog
};

const logDog = async (ev)  => {
    // validate
   ev.preventDefault();

    // if invalid, stop form by doing ev.preventDefault()
  const dogs = {
    name: document.getElementById('name').value,
    breed: document.getElementById('breed').value,
    dob: document.getElementById('dob').value,
    colour: document.getElementById('colour').value,
    votes: 0,
    photo: document.getElementById('profilepic').value

  }
  const response = await axios.post('/dog', dogs);

  alert(`${document.getElementById('name').value} is signed up, Happy Voting!`)
  window.location = ('/index.html')
  

  document.querySelector('form').reset(); 
  }