import formdata from 'form-data';
// wait for the document to load)
window.onload = () => {

//button 
  document.getElementById('saveDog').addEventListener('click', handleFormData) //remember to add log dog when upload works
  // assign a click event to the saveDog button
};

const handleFormData = async (ev)  => {
  // validate
  ev.preventDefault();
  // if invalid, stop form by doing ev.preventDefault()
let form = ev.target
  let data = new FormData(form);

  data.set('name',name);
  data.set('breed', breed);
  data.set('dob',dob);
  data.set('colour', colour);
  data.append('votes', 0);
  data.append('file', file, file.fileName);
  response = await axios.post('/dog',data) //{
    /*headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    });*/
  console.log('all data sent')

  alert(`${document.getElementById('name').value} is signed up, Happy Voting!`)
  window.location = ('/index.html')
}








const savefile =  (ev) => {
  ev.preventDefault();
const url = "http://localhost:3003/upload"

  let photo = new FormData();
  photo.append('file', file, file.fileName);

  return (dispatch) =>  { 
     axios.post(URL, photo, {
  headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  }
})
.then((response) => {
  console.log('saved')
}).catch((error) => {
  console.log('err')
});
};
}



/*
  const response = await axios.post(url, profilephoto, config)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ', err));

    */
  //console.log(photo)
  //const response = await axios.post('/upload', photo)
  
