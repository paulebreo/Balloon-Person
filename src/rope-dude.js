// What is ASCIIART? Check the README.md or Workshop to see why ASCIIART is defined in your file.
const ASCIIART = [
  `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
      
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========`
];

const PUZZLE_WORDS = [
  'class',
  'let',
  'map',
  'reduce',
  'filter',
  'instance',
  'fullstack',
  'function',
  'prototype',
  'array',
  'number',
  'string',
  'loop'  
]

class RopeDude {
  constructor(secretWord) {
    this.remainingGuesses = 6;
    this.secretWord = secretWord.split("");
    this.lettersGuessed = [];
    // playing, lost, won
    this.gameState = "playing";
  }
  submitGuess(guess) {
    // debugger
    let theGuess = guess.toLowerCase();
    if (this.gameState === "playing") {
      // not found in lettersGuessed
      if (this.lettersGuessed.indexOf(theGuess.toLowerCase()) === -1) {
        this.lettersGuessed.push(theGuess);
      }

      // correct
      if (this.secretWord.includes(theGuess)) {
      } else {
        // incorrect
        this.remainingGuesses--;
      }
    }
    this.computeGameState();
  }
  computeGameState() {
    if (this.remainingGuesses > 0) {
      if (
        this.secretWord
          .map(L => this.lettersGuessed.includes(L))
          .every(L => L == true)
      )
        this.gameState = "won";
    } else if (this.remainingGuesses < 1) {
      this.gameState = "lost";
    } else {
      this.gameState = "playing";
    }
  }
  getSecretWordPuzzle() {
    // method 1
    // let self = this
    // const revealedLetter = function(secretLetter) {
    //   if(secretLetter === ' ') return ' '
    //   return self.lettersGuessed.includes(secretLetter) ? secretLetter : '#'
    // }
    // return this.secretWord
    //           .map(function(secretLetter){
    //             if(secretLetter === ' ') return ' '
    //             return self.lettersGuessed.includes(secretLetter) ? secretLetter : '#'
    //           })
    //           .join('')

    // method 2
    // return this.secretWord.map(el => this.lettersGuessed.includes(el) || el == ' ' ? el : '#').join('')

    return this.secretWord.reduce((str, secretLetter) => {
      if (secretLetter === " ") return str + " ";
      return (
        str + (this.lettersGuessed.includes(secretLetter) ? secretLetter : "#")
      );
    }, "");
  }
}

RopeDude.prototype.getGameStateMessage = function() {
  let message = "";
  if (this.gameState === "playing")
    message = `There is a total of ${
      this.remainingGuesses
    } guesses remaining:\n`;
  if (this.gameState === "won") return "Winner Winner Chicken Dinner, you won!";
  if (this.gameState === "lost")
    message = `Game Over, the word was "${this.secretWord.join("")}":\n`;

  return message + ASCIIART[this.remainingGuesses];
};

function simulateRopeDude(guesses, secretWord) {
  const game = new RopeDude(secretWord);
  for (let i in guesses) {
    game.submitGuess(guesses[i]);
  }
  return game.getGameStateMessage();
}

class BalloonPerson extends RopeDude {
  constructor(secretWord) {
    super(secretWord);
  }
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  reloadSecretWord(secretWordList) {
    let randomIndex = this.getRandomIntInclusive(0, secretWordList.length-1)
    // reset state
    this.gameState = 'playing'
    // reset guesses
    this.lettersGuessed = []
    this.remainingGuesses = 6
    // reset secretWord
    this.secretWord = secretWordList[randomIndex].split('')
  }
}

class Game {
  constructor() {
    this.guessBoardLetters = []
    this.puzzleBoardLetters = []
  }  
}

Game.prototype.drawGuessBoard = function() {
  let self = this
  Array.prototype.forEach.call(this.guessBoardLetters, function(el, i){
    if(self.balloonPerson.lettersGuessed.includes(el.dataset.letter.toLowerCase())) {
      el.classList.add('hideGuess')   
    }
  });

}

Game.prototype.clearGuessBoard = function() {
  Array.prototype.forEach.call(this.guessBoardLetters, function(el, i){
      el.classList.remove('hideGuess')   
  });
}

Game.prototype.clearPuzzleBoard = function() {
  let puzzleLetters = document.getElementsByClassName("puzzleArea")[0].children;
  while(puzzleLetters.length > 0) {
    Array.prototype.forEach.call(puzzleLetters, function(el, i){
      el.parentNode.removeChild(el)
    });
  }
}

Game.prototype.drawPuzzleBoard = function(secretWord) {
  this.clearPuzzleBoard()
  
  let puzzleArea = document.getElementsByClassName("puzzleArea")[0];

  this.balloonPerson.secretWord.forEach((letter)=>{
    let L = letter.toUpperCase()
    let newDiv = document.createElement("div"); 
    newDiv.className = 'puzzleLetter'
    newDiv.classList.add('hidden')
    newDiv.dataset.letter = L
    newDiv.innerText = L
    puzzleArea.appendChild(newDiv);
  })
}


Game.prototype.checkWin = function(state) {
  let winScreen = document.getElementById("winScreen");
  console.log('state:', state)
  if(state === 'won') {
    winScreen.style.display = "flex"
  } 
}

Game.prototype.updatePuzzleBoard = function(state, guess) {
  let self = this
  if(state === 'lost') return
  
  this.puzzleLetters = document.querySelectorAll('.puzzleLetter')

  Array.prototype.forEach.call(this.puzzleLetters, function(el, i){
    // console.log('puzzle text',el.innerText)
    if(el.innerText.toLowerCase() === guess.toLowerCase())
      el.classList.remove('hidden')
  });
}

Game.prototype.updatePersonArea = function(state) {
  let balloonElements = document.getElementById('balloons').children
  let playerArea = document.getElementsByClassName('playerArea')[0]
  if(state === 'lost') {
    // remove last balloon
    let el = balloonElements[balloonElements.length-1]
    if(el) 
      el.parentNode.removeChild(el)
    // animate falling
    playerArea.classList.add('falling')

  }
  console.log('remaining guesses', this.balloonPerson.remainingGuesses)
  
  while(balloonElements.length > this.balloonPerson.remainingGuesses) {
    let el = balloonElements[balloonElements.length-1]
    el.parentNode.removeChild(el)
  }
}

Game.prototype.setupGuessEvents = function() {
  let self = this
  function updateGame(e) {

    // add guess & update guess area
    let state = self.addGuess(e.target.dataset.letter.toLowerCase())

    // update puzzle area
    self.updatePuzzleBoard(state, e.target.dataset.letter)

    // update person area
    self.updatePersonArea(state)

    // check win state
    self.checkWin(state)
    

    console.log('keycode',e.target.dataset.letter)
    
  } 
  this.guessBoardLetters = document.querySelectorAll('.letter')
  Array.prototype.forEach.call(this.guessBoardLetters, function(el, i){
    el.addEventListener('click', updateGame)
  });
}

Game.prototype.closeRestartScreen = function(){
  let restartScreen = document.getElementById("restartScreen");
  restartScreen.style.display = "none";
}

Game.prototype.createNewPerson = function() {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  let randomWord = PUZZLE_WORDS[getRandomIntInclusive(0,PUZZLE_WORDS.length-1)]
  Game.prototype.balloonPerson = new BalloonPerson(randomWord)
}

Game.prototype.start = function() {
  console.log('starting game')
  try {
    Game.prototype.closeRestartScreen()
    Game.prototype.createNewPerson()
    Game.prototype.resetGameState()
    Game.prototype.setupScreen()
    Game.prototype.setupGuessEvents()
    Game.prototype.clearGuessBoard()    
    Game.prototype.drawPuzzleBoard()
  } catch(ex) {
    debugger
    let z = this
    console.log(ex)
  }

}

Game.prototype.resetGameState = function() {
  Game.prototype.balloonPerson.reloadSecretWord(PUZZLE_WORDS)
}

Game.prototype.setupScreen = function() {
  let self = this
  let splashScreen = document.getElementById("splashScreen");
  let startButton = document.getElementsByClassName("startBtn")[0];
  let restartScreen = document.getElementById("restartScreen");
  let winScreen = document.getElementById("winScreen");
  let restartButton = document.getElementsByClassName("restartBtn")[0];
  let playAgainButton = document.getElementsByClassName("playAgain")[0];
  let playerArea = document.getElementsByClassName("playerArea")[0];
  restartScreen.style.display = "none";
  winScreen.style.display = "none";

  function closeSplashScreen() {
    console.log("pressed");
    splashScreen.style.display = "none";
  }

  // function closeRestartScreen() {
  //   restartScreen.style.display = "none";
  // }

  function closeModal() {
    splashScreen.style.display = "none";
  }

  function clickOutside(e) {
    if (e.target === screen) {
      screen.style.display = "none";
    }
  }
  
  function showRestartScreen(e) {
    console.log('animation ended')
    restartScreen.style.display = "flex"
  }

  startButton.addEventListener("click", closeSplashScreen);
  restartButton.addEventListener("click", Game.prototype.start);
  playAgainButton.addEventListener("click", Game.prototype.start);
  playerArea.addEventListener('animationend', showRestartScreen)
  // close windows when click outside modal
  // window.addEventListener('click', closeSplashScreen)
}

const animateShark = true

let leftToRight = true
const sharkElem = document.getElementsByClassName('shark')[0]

if(animateShark)
  sharkElem.classList.add('sharkMove1')
sharkElem.addEventListener('animationend', alternateMove)

function alternateMove(e) {
  // console.log('target',e.target)
  if( e.target.classList.contains('sharkMove1') ) {
    e.target.classList.remove('sharkMove1')
    e.target.classList.add('sharkMove2')    
  } else if( e.target.classList.contains('sharkMove2') ) {
    e.target.classList.remove('sharkMove2')
    e.target.classList.add('sharkMove1')    
  } else {
    e.target.classList.add('sharkMove1')   
  }
}
Game.prototype.addGuess = function(guess) {
  this.balloonPerson.submitGuess(guess)
  console.log('letters guess',this.balloonPerson.lettersGuessed)
  this.drawGuessBoard()
  return this.balloonPerson.gameState
}

Game.prototype.start()