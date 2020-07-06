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
    dogContainer = document.createElement('section')
    dogContainer.setAttribute('id', 'dog-container')

    document.getElementById('container').appendChild(dogContainer);

    //dog-photo
    dogPhotoContainer = document.createElement('div')
    dogPhotoContainer.setAttribute('id', 'dog-photo')

    dogContainer.appendChild(dogPhotoContainer)

    /*
    //INCLUDE IMAGE HERE
                <a href = '#'>   <!--When the dogs photo is clicked it will take the user to that dogs profile page-->
                    <img id = 'photoOfDogAbove' src = 'PhotosOfDog/Manson.jpg' alt = 'Profile Pic'> <!--each photo will show the chosen profile photo of each dog-->
                </a>

                For guidence^^^^^

    */
    //name
    dogNameContainer = document.createElement('p') //creates a p tag
    dogNameContainer.setAttribute('id', 'dog-name') //sets te ID for created p tag

    dogNameText = document.createTextNode(dog.name) // Create text node
    dogNameContainer.appendChild(dogNameText);  // appends the p tag to the text node
    dogPhotoContainer.appendChild(dogNameContainer) // Appends the p tag as a child to the id of dog-photo in html

    // voting-options
    votingContainer = document.createElement('div')
    votingContainer.setAttribute('id', 'voting-options')

    dogContainer.appendChild(votingContainer)

    //votes
    voteNumber = document.createElement('p')
    voteNumber.setAttribute('id', 'total-votes')
    voteNumber.textContent = 'Total Votes = '

    voteNode = document.createTextNode(dog.votes)
    voteNumber.appendChild(voteNode)
    votingContainer.appendChild(voteNumber)

    //button
    const voteForDogAbove = document.createElement('button')
    voteForDogAbove.setAttribute('id', 'btn')
    voteForDogAbove.textContent = 'Vote For Above Dog'
    votingContainer.appendChild(voteForDogAbove)
}
document.getElementById('saveDog').addEventListener('click', voteForDog)

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