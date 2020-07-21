const express = require('express');
const fs = require('fs');
// const { json, response } = require('express');
// const { finished } = require('stream');

// middleware
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
// server running
const app = express();
const PORT = 3003;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Example app listening at http://localhost:${PORT}`));

// load html
app.use(express.static('public'));

// to use the section of the middleware we need
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dogs = JSON.parse(fs.readFileSync('dogs.json'));// loads the data file

// Saves
const saveData = () => {
  function finished(err) {
    if (err) {
      console.log('Error saving file', err);
      return;
    }
  }
  // eslint-disable-next-line max-len
  const jsonData = JSON.stringify(dogs, null, 2); // gets the data dogData.Json and makes it so JS can understand the language
  fs.writeFile('dogs.json', jsonData, finished); // adds the key pair to the file and saves it.
};

// Storage for multer to know where to save images
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/photosofdogs');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
// assign upload to storage
const upload = multer({ storage });
// resizes the image
const resize = (image, w, h) => {
  try {
    const resize = sharp(`public/photosofdogs/${image}`).resize(w, h).toBuffer((err, buffer) => {
      fs.writeFile(`public/photosofdogs/${image}`, buffer, finished);
      function finished(err) {
        if (err) {
          console.log('Error saving resized image', err);
          return;
        }
        console.log('image has been resized and saved'); // to say all is complete (catch any errors (shouldn't be any))
      }
    });
  } catch (err) {
    console.log('err resizing', err);
  }
};

app.post('/dog', upload.single('photo'), (req, res) => {
  const newDog = {
    username: req.body.username,
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    colour: req.body.colour,
    votes: 0,
    imageFileName: req.file.filename,
  };
  console.log(`Adding ${newDog.username}-${newDog.name}`);

  resize(newDog.imageFileName, 300, 200);

  dogs[newDog.username] = newDog;
  // save the data...
  saveData();
  // signal to the front end that the file has been uploaded
  res.send(`${newDog.username}-${newDog.name} is saved`);
});

// list all votes for dogs (all data in dogData)
app.get('/voteData', (request, response) => response.send(dogs));
// give the vote data for chosen dog
app.get('/voteData/:dogId', (request, response) => {
  const { dogId } = request.params; // gets the dogId
  if (dogs[dogId]) { // If there is such a dogId in file.....
    reply = dogs[dogId];
  } else { // If that dogId isn't there
    reply = {
      msg: `${dogId} is not signed up`, // return this message
    };
  } response.send(reply); // send the reply (message)
});

// list all the dogs in our data
app.get('/dogs', (req, res) => {
  const dogIds = Object.keys(dogs);
  const a = dogIds.map((dogId) => dogs[dogId]);

  return res.send(a);
});

// list all usernames
app.get('/dogs/:username/exist', (req, res) => {
  const chosenUsername = req.params.username;
  const exist = dogs.hasOwnProperty(chosenUsername);
  console.log(exist);
  console.log(chosenUsername);
  res.send(exist);
});

// this really should be app.post - when connected to a front end
// votes for chosen dog
app.get('/dog/:username/:name/vote', (req, res) => {
  const { name } = req.params;
  const { username } = req.params;

  console.log(username);
  console.log(name);
  console.log('someone is voting...');

  if (dogs[username].name) {
    // record the vote
    dogs[username].votes++; // add one to chosen dog
    res.send({ votes: dogs[username].votes });
    saveData();
  } else {
    console.log('someone tried to vote for a non-existing dog');
    res.send(`${name} doesn't exist under ${username}`);
  }
});
