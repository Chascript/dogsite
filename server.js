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
const PORT = 80;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Example app listening at http://localhost:${PORT}`));

// load html
app.use(express.static('public'));

// to use the section of the middleware we need
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dogs = JSON.parse(fs.readFileSync('dogs.json'));// loads the data file
const breeds = JSON.parse(fs.readFileSync('breeds.json')); // loads breeds file

// Saves
const saveData = () => {
  function finished(error) {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-useless-return
      return; // if error occurs return prevents data saving
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
    sharp(`public/photosofdogs/${image}`).resize(w, h).toBuffer((err, buffer) => {
      fs.writeFile(`public/photosofdogs/${image}`, buffer, finished);
      function finished(error) {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

app.post('/dog', upload.single('photo'), (req, res) => {
  const newDog = {
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    colour: req.body.colour,
    votes: 0,
    imageFileName: req.file.filename,
  };

  resize(newDog.imageFileName, 200, 300); // w x h

  dogs[newDog.username] = newDog;
  // save the data...
  saveData();
  // signal to the front end that the file has been uploaded
  res.send(`${newDog.username}-${newDog.name} is saved`);
});

// list all votes for dogs (all data in dogData)
app.get('/voteData', (request, response) => response.send(dogs));

// list all the dogs in our data
app.get('/dogs', (req, res) => {
  const data = Object.keys(dogs);
  const indexDetails = data.map((dogId) => [
    dogs[dogId].name,
    dogs[dogId].breed,
    dogs[dogId].imageFileName,
    dogs[dogId].username,
    dogs[dogId].votes]);
  return res.send(indexDetails);
});
// list all usernames
app.get('/dogs/:username/exist', (req, res) => {
  const chosenUsername = req.params.username;
  const exist = dogs.hasOwnProperty(chosenUsername);
  res.send(exist);
});

// this really should be app.post - when connected to a front end
// votes for chosen dog
app.get('/dog/:username/:name/vote', (req, res) => {
  const { name } = req.params;
  const { username } = req.params;

  if (dogs[username].name) {
    // record the vote
    dogs[username].votes += 1; // add one to chosen dog
    res.send({ votes: dogs[username].votes });
    saveData();
  } else {
    res.send(`${name} doesn't exist under ${username}`);
  }
});

// all breeds
app.get('/dog/breeds', (request, response) => {
  const data = Object.values(breeds);
  response.send(data[0]);
});
