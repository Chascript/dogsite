const express = require('express');
const fs = require('fs');
const { json, response } = require('express');
const { finished } = require('stream');



//middleware
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')

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
    let data = JSON.stringify(dogs, null, 2) //gets the data dogData.Json and makes it so JS can understand the language
    fs.writeFile('dogData.Json', data, finished) //adds the key pair to the file and saves it.

    function finished(err) {
        if(err){
            console.log('Error saving file', err);
            return
        }
        console.log('Data has been saved') // to say all is complete (catch any errors (shouldn't be any))
    }
}

//check file type
function checkFileType(file,cb){
    //Allowed extensions
    const filetypes = /jpeg|jpg|png|gif|json/;
    //check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // check mime
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null,true);
    } else{
        cb('Error: Images Only');
    }
}

// set storage engine
const storage = multer.diskStorage({
    destination: 'public/photosofdogs/',
    filename: function (req, file, cb ) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//init upload
const upload = multer({
    storage: storage,
    //limits:{fileSize:1000000} 1mb size limit
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('photo');
/*
/add/:dogId = adds dog to data
/voteData = shows all data
/voteData/:dog = shows data for chosen dog 
/dogs = shows all dogs in data
/dog/:dogId/vote = adds 1 to current vote total for chosen dog
/upload = saves photo
*/


// https://nodejs.org/api/fs.html

const dogs = JSON.parse(fs.readFileSync('dogData.json'));// loads the data file

app.post('/upload', (req,res)=>{
    upload(req,res, (err)  => {

        //there are currently no validation (is there a file??)
      console.log(req.file);
     res.send('file uploaded')
    })
})


// adds a dog to dogData.Json    
app.post('/dog', function (request, response) {

    upload()
    

    console.log('adding a dog')
    dogs[request.body.name] = request.body
    response.send('data has been saved')
    saveData() 
    return;
})

// list all votes for dogs (all data in dogData)
app.get('/voteData', (request,response) => response.send(dogs))
// give the vote data for chosen dog
app.get('/voteData/:dogId', findDogVotes)

function findDogVotes  (request,response)  {
    const {dogId} = request.params; //gets the dogId
    if(dogs[dogId]) { //If there is such a dogId in file.....
        reply = dogs[dogId]
    } else { //If that dogId isn't there
        reply = {
            msg : `${dogId} is not signed up` //return this message
        } 
    }
    response.send(reply); //send the reply (message)
}

// list all the dogs in our data
app.get('/dogs', function (req, res) {
    const dogIds = Object.keys(dogs)
    const a = dogIds.map(dogId => dogs[dogId])

    return res.send(a) //lists the objects names....future usernames
});

// this really should be app.post - when connected to a front end
// votes for chosen dog
app.get('/dog/:dogId/vote', (req, res) => {
    const {dogId} = req.params;    
    console.log('someone is voting...')
    // The dog dosen't exist
    if (dogs[dogId]) {
    // record the vote 
        dogs[dogId].votes++ // add one to chosen dog
        res.send({ votes: dogs[dogId].votes })
        saveData();
    } else{
    console.log('someone tried to vote for a non-existing dog')
    return res.send(`${dogId} doesn't exist`)
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


