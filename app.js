// Add needed variables
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startGame = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const ul = document.querySelector("#phrase ul");

let missed = 0;

const phrases = [
  "be yourself",
  "I still remember", 
  "proud of you",
  "wonderful days",
  "Hello World"
];


// listen for the start game button to be pressed
startGame.addEventListener("click" , () => {
  overlay.style.display = "none";
});


// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[randomNumber].split('');
  return randomPhrase;
}

getRandomPhraseAsArray(phrases);



// adds the letters of a string to the display
const addPhraseToDisplay = arr => {
  for (let i = 0; i < arr.length; i++ ) {
      const li = document.createElement('li');
      li.textContent = arr[i];
      ul.appendChild(li);

      if (arr[i] !== ' ') {
        li.className.add('letter');
    } else {
        li.className.add('space');
      }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 



// check if a letter is in the phrase
const checkLetter = button => {
  let phraseList = ul.children;
  let match = null;
  for (let i = 0; i < phraseList.length; i++) {
      const letter = phraseList[i].textContent.toLowerCase();
      if (button.textContent === letter) {
          phraseList[i].classList.add('show');
          match = true;
          }
      }
      return match;
  }

checkLetter(qwerty);



// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
  
  if (e.target.tagName === 'BUTTON') {  
      e.target.classList.add('chosen');
      e.target.setAttribute('disabled', true);
      
      const match = checkLetter(e.target);
      
      if (!match) {
          const tries = document.querySelectorAll('.tries')
          tries[missed].style.display = 'none';
          missed++;
      }
      if (e.target) {
          return checkWin(e.target);
      }
  }
});


// Check if the game has been won or lost
const checkWin = (e) => {
     let letter = ul.getElementsByClassName('letter');
     let show = ul.getElementsByClassName('show');
  
  if (letter.length === show.length) {
      overlay.classList.add('win');
      overlay.querySelector('h2').textContent = "You won!";
      overlay.style.display = 'flex';
  }   
  if (missed > 4) {
    overlay.classList.add('lose');    
    overlay.querySelector('h2').textContent = "You lost!";
    overlay.style.display = 'flex';
    overlay.querySelector('a').textContent = 'Play Again?';
    resetGame();  
    }
}


function resetGame() {
  let keyboard = document.querySelectorAll('.keyboard');
  for (let i = 0; i < keyboard.length; i++) {
      keyboard[i].className = '';
      keyboard[i].disabled = false;
  }
  
  ul.innerHTML = '';
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));
  
  const lives = document.getElementsByTagName('img');
  for (let i = 0; i < lives.length; i++) {
      let tries = document.querySelectorAll('.tries');
      tries[i].style.display = 'inline'; 
  }
  missed = 0;

}


  





