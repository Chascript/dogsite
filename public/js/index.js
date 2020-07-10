const setup = async () => {
    console.log('load data')
    try {
      const { data } = await axios.get('http://localhost:3003/dogs')
      console.log('dogs:', data);

      // render each dog component...
      data.forEach(renderDog);
    }
    catch(err) {
        console.log(err)
    }
}
window.onload = setup;

const renderDog = (dog) => {
    
    //dog container
    const dogContainer = document.createElement('section') //creates the dogContainer
    dogContainer.setAttribute('id', 'dog-container') //sets the id for dogContainer

    document.getElementById('container').appendChild(dogContainer); //dogContainer is now a child to container

    //dog-photo-container
    const dogPhotoContainer = document.createElement('div') //creates dogPhotoContainer
    dogPhotoContainer.setAttribute('id', 'dog-photo') //sets the id for dogPhotoContainer

    dogContainer.appendChild(dogPhotoContainer) //dogPhotoContainer is now a child of dogContainer
    
    //photo-of-dog
    const dogPhoto = document.createElement('img'); //creates dogPhoto
    dogPhoto.src = '/photosofdogs/' + dog.imageFileName //sets the correct image
    dogPhoto.setAttribute('id', 'photo-of-dog-above') // sets the id for dogPhoto
    dogPhotoContainer.appendChild(dogPhoto) // dogPhoto is now a child of dogPhotoContainer

    // voting-options
    const votingContainer = document.createElement('div') //creates votingContainer
    votingContainer.setAttribute('id', 'voting-options') //sets id for votingContainer

    dogContainer.appendChild(votingContainer) //votingContainer is now child of dogContainer

    //name
    const dogNameContainer = document.createElement('p') //creates dogNameContainer
    dogNameContainer.setAttribute('id', 'dog-name') //sets the id for dogNameContainer

    const dogNameText = document.createTextNode(dog.name) // Creates dogNameText with correct text node
    dogNameContainer.appendChild(dogNameText);  // dogNameText is a child of dogNameContainer

    //breed
    const dogBreedContainer = document.createElement('div') //creates dogBreedContainer
    dogBreedContainer.setAttribute('id', 'dog-breed') //sets the id for dogBreedContainer
    const dogBreedText = document.createTextNode(dog.breed) // Creates dogBreedText with correct text node

    dogBreedContainer.appendChild(dogBreedText);  // dogBreedText is a child of dogNameContainer

    //dog Details
    votingContainer.appendChild(dogNameContainer) // dogNameContainer is a child of votingContainer
    votingContainer.appendChild(dogBreedContainer) // dogBreedContainer is a child of votingContainer


    //votes
    const voteNumber = document.createElement('p') //creates voteNumber
    voteNumber.setAttribute('id', 'total-votes') //sets the id for voteNumber
    voteNumber.textContent = 'Total Votes = ' //Adds a set text for voteNumber

    const voteNode = document.createTextNode(dog.votes) // creates voteNode (the number of votes for dog)
    voteNumber.appendChild(voteNode) // voteNode is a child of voteNumber
    votingContainer.appendChild(voteNumber) //voteNumber is a child of votingConatiner

    //button
    const voteForDogAbove = document.createElement('button') //create the voteForDogAbove button
    voteForDogAbove.setAttribute('id', 'btn') //sets to id for voteForDogAbove
    voteForDogAbove.textContent = 'Vote For Above Dog' //adds a set text for voteForDogAbove
    votingContainer.appendChild(voteForDogAbove) //voteForDogAbove is a child of votingConatiner
}
document.getElementById('btn').addEventListener('click', voteForDog)

const voteForDog = () => {

    const dogId = {

    }

    const response = axios.post('/dog/:dogId/vote', dogs);
}




// Figuring out how to target data in JSON

// const data = Object.values(dogs) All data
// const data = Object.keys(dogs) Just name of Objects
//const data = Object.keys(dogs.Indie) dogId , votes (the keys in Indie)
//const data = Object.values(dogs.Manson) Manson , (no of votes) (the values in Manson)
//const data = Object.values(dogs.Roy.name) ['R', 'o', 'y' ]
//const data = Object.values(dogs.Roy.votes) [ ]

//Loops through all dog names
/*const allDogData = Object.values(dogs);


const accessDogNames = () => {
    for (i = 0;i < allDogData.length; i++) {
        const name = allDogData[i].name
        console.log(name)
    }
}
accessDogNames();

//Loops through all dog votes
const accessDogVotes = () => {
    for (i = 0;i < allDogData.length; i++) {
    const votes = allDogData[i].votes
    console.log(votes)
    }  
}
accessDogVotes();

//Loop through profile pic (when created)

const accessDogProfilePic = () => {
    for (i = 0;i < allDogData.length; i++) {
        const profilePic = allDogData[i].profilePic
        console.log(profilePic)
    }
}
accessDogProfilePic()

//To show data in the html....

const containerElement = document.getElementById('container'); //an example to try and get document..... to work

const dogNameElement = document.getElementsByClassName("dogName")
const NameData = () => {
    const dogName = Object.keys(dogs); // takes the dogs USER name out of the dogs (dogData)
for (let i = 0; i <dogName.length;i++) { //for loop to go through all dog USER names
    allDogs = dogName[i] //takes our the dognames so we can use the data

    const newDogNameItem = document.createElement("p") //creates a new <p></p> in html 

    //Creates a <p></p> and then adds text of allDogs (dogName[i]) to it. This loops over all dog names
    newDogNameItem.appendChild(document.createTextNode(allDogs)); 
}
}
NameData(); // just to call the function to show it is working.

const VotesData = () => {
    
    const data = Object.values(dogs.Roy[0])
     // takes the dogs name out of the dogs (dogData)
    console.log(data);
       
for (let i = 0; i <dogName.length;i++) { //for loop to go through all dog names
    allDogs = dogName[i] //takes our the dognames so we can use the data
}
    const newDogNameItem = document.createElement("p") //creates a new <p></p> in html 

    //Creates a <p></p> and then adds text of allDogs (dogName[i]) to it. This loops over all dog names
    newDogNameItem.appendChild(document.createTextNode(allDogs)); 
}
VotesData();


*/