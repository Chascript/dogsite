const express = require('express');
const fs = require('fs');
const { json, response } = require('express');
const { finished } = require('stream');

// middleware
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const sharp = require('sharp')

const app = express();
const port = 3003;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
//load index.html
app.use(express.static('public'));

//to use the section of the middleware we need
app.use(bodyParser.json());
//app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.urlencoded(),{extended: true});
//saves
const saveData = () => {
    let jsonData = JSON.stringify(dogs, null, 2) //gets the data dogData.Json and makes it so JS can understand the language
    fs.writeFile('dogs.json', jsonData, finished) //adds the key pair to the file and saves it.

    function finished(err) {
        if(err){
            console.log('Error saving file', err);
            return
        }
        console.log('Data has been saved') // to say all is complete (catch any errors (shouldn't be any))
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/photosofdogs')
    },
    filename: function (req, file, cb) {
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
  const upload = multer({ storage: storage })


/*
/add/:dogId = adds dog to data
/voteData = shows all data
/voteData/:dog = shows data for chosen dog 
/dogs = shows all dogs in data
/dog/:dogId/vote = adds 1 to current vote total for chosen dog
/upload = saves photo
*/
const resize = async (image) => {
    try{
    console.log(image)
    const resize = await sharp("public/photosofdogs/"+ image).resize(300,200).toBuffer(function(err,buffer){
        fs.writeFile("public/photosofdogs/"+ image,buffer,finished)
        function finished(err) {
            if(err){
                console.log('Error saving resized image', err);
                return
            }
            console.log('image has been resized and saved') // to say all is complete (catch any errors (shouldn't be any))
        }
    })
    console.log(resize)
    //sharp(image)
 // .resize(200, 300).toFile('public/photosofDogs')
    }
    catch(err){
        console.log('err resizing',err)
    }
}

// https://nodejs.org/api/fs.html

const dogs = JSON.parse(fs.readFileSync('dogs.json'));// loads the data file

app.post('/dog', upload.single('photo'), (req, res) => {
  console.log('inside upload end point')
  const newDog = {
    username: req.body.username,
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    colour: req.body.colour,
    votes: 0,
    imageFileName: req.file.filename };

    console.log(newDog);



   resize(newDog.imageFileName)

  dogs[newDog.username] = newDog;


  // signal to the front end that the file has been uploaded
  res.send('file uploaded')

  // save the data...
  saveData();  
})

// list all votes for dogs (all data in dogData)
app.get('/voteData', (request,response) => response.send(dogs))
// give the vote data for chosen dog
app.get('/voteData/:dogId', (request,response) => {
    const {dogId} = request.params; //gets the dogId
    if(dogs[dogId]) { //If there is such a dogId in file.....
        reply = dogs[dogId]
    } else { //If that dogId isn't there
        reply = {
            msg : `${dogId} is not signed up` //return this message
        }  
        
    } response.send(reply); //send the reply (message)
})

// list all the dogs in our data
app.get('/dogs', (req, res) => {
    const dogIds = Object.keys(dogs)
    const a = dogIds.map(dogId => dogs[dogId])

    return res.send(a)
});

// list all usernames
app.get('/dogs/:username/exist', (req,res) => {
    const chosenUsername = req.params.username
    const exist = dogs.hasOwnProperty(chosenUsername)
    console.log(exist)
    console.log(chosenUsername)
    res.send(exist)
})


// this really should be app.post - when connected to a front end
// votes for chosen dog
app.get('/dog/:username/:name/vote', (req, res) => {
    const name = req.params.name; 
    const username = req.params.username; 
   
    console.log(username) 
    console.log(name) 
    console.log('someone is voting...')
    // The dog dosen't exist
    if (dogs[username].name) {
    // record the vote 
        dogs[username].votes++ // add one to chosen dog
        res.send({ votes: dogs[username].votes })
        saveData();
    } else{
    console.log('someone tried to vote for a non-existing dog')
    res.send(`${name} doesn't exist under ${username}`)
    }
})

// Figuring out how to target data in JSON

// const data = Object.values(dogs) All data
// const data = Object.keys(dogs) Just name of Objects
//const data = Object.keys(dogs.Indie) dogId , votes (the keys in Indie)
//const data = Object.values(dogs.Manson) Manson , (no of votes) (the values in Manson)
//const data = Object.values(dogs.Roy.name) ['R', 'o', 'y' ]
//const data = Object.values(dogs.Roy.votes) [ ]


//upload image
