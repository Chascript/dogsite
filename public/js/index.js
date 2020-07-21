/* eslint-disable max-len */
/* eslint-disable no-undef */
const voteForDog = async (username, name) => {
  const response = await axios.get(`/dog/${username}/${name}/vote`); // gets username+name from server
  const element = document.getElementById(username); // where new value will be displayed
  element.innerText = `Total Votes = ${response.data.votes}`; // re-writes the inner text of element to show new votes value
};
const renderDog = (dog) => {
  // dog container
  const dogContainer = document.createElement('section'); // creates the dogContainer
  dogContainer.setAttribute('id', 'dog-container'); // sets the id for dogContainer
  dogContainer.setAttribute('class', 'dog-container'); // sets the class for dogContainer
  document.getElementById('container').appendChild(dogContainer); // dogContainer is now a child to container
  // dog-photo-container
  const dogPhotoContainer = document.createElement('div'); // creates dogPhotoContainer
  dogPhotoContainer.setAttribute('id', 'dog-photo'); // sets the id for dogPhotoContainer
  dogPhotoContainer.setAttribute('class', 'dog-photo'); // sets the class for dogPhotoContainer
  dogContainer.appendChild(dogPhotoContainer); // dogPhotoContainer is now a child of dogContainer
  // photo-of-dog
  const dogPhoto = document.createElement('img'); // creates dogPhoto
  dogPhoto.src = `/photosofdogs/${dog.imageFileName}`; // sets the correct image
  dogPhoto.setAttribute('id', 'photo-of-dog-above'); // sets the id for dogPhoto
  dogPhoto.setAttribute('class', 'photo-of-dog-above'); // sets the class for dogPhoto
  dogPhotoContainer.appendChild(dogPhoto); // dogPhoto is now a child of dogPhotoContainer
  // voting-options
  const votingContainer = document.createElement('div'); // creates votingContainer
  votingContainer.setAttribute('id', 'voting-options'); // sets id for votingContainer
  votingContainer.setAttribute('class', 'voting-options'); // sets the class for votingContainer
  dogContainer.appendChild(votingContainer); // votingContainer is now child of dogContainer
  // name
  const dogNameContainer = document.createElement('p'); // creates dogNameContainer
  dogNameContainer.setAttribute('id', 'dog-name'); // sets the id for dogNameContainer
  dogNameContainer.setAttribute('class', 'dog-name'); // sets the class for dogNameContainer
  // creates nameNode (the number of votes for dog)
  const dogNameNode = document.createTextNode(dog.name); // Creates dogNameText with correct text node
  dogNameContainer.appendChild(dogNameNode); // dogNameText is a child of dogNameContainer
  // breed
  const dogBreedContainer = document.createElement('div'); // creates dogBreedContainer
  dogBreedContainer.setAttribute('id', 'dog-breed'); // sets the id for dogBreedContainer
  const dogBreedText = document.createTextNode(dog.breed); // Creates dogBreedText with correct text node
  dogBreedContainer.appendChild(dogBreedText); // dogBreedText is a child of dogNameContainer
  // dog Details
  votingContainer.appendChild(dogNameContainer); // dogNameContainer is a child of votingContainer
  votingContainer.appendChild(dogBreedContainer); // dogBreedContainer is a child of votingContainer
  // votes
  const voteNumber = document.createElement('p'); // creates voteNumber
  voteNumber.setAttribute('id', dog.username); // sets the id for voteNumber
  voteNumber.setAttribute('class', 'total-votes'); // sets the class for voteNumber
  // creates voteNode (the number of votes for dog)
  const voteNode = document.createTextNode(`Total Votes = ${dog.votes}`);
  voteNumber.appendChild(voteNode); // voteNode is a child of voteNumber
  votingContainer.appendChild(voteNumber); // voteNumber is a child of votingConatiner
  // button
  const voteForDogAbove = document.createElement('button'); // create the voteForDogAbove button
  voteForDogAbove.setAttribute('class', 'btn'); // sets the class for voteForDogAbove
  voteForDogAbove.textContent = 'Vote For Above Dog'; // adds a set text for voteForDogAbove
  votingContainer.appendChild(voteForDogAbove); // voteForDogAbove is a child of votingConatiner
  // the event listener (within a function to prevent broswer from automatically clicking button when rendered)
  voteForDogAbove.addEventListener('click', () => { voteForDog(dog.username, dog.name); }, false);
};

const setup = async () => {
  try {
    const { data } = await axios.get('/dogs'); // change this so it only gives info actually need
    // render each dog component...
    data.forEach(renderDog);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
window.onload = setup;
