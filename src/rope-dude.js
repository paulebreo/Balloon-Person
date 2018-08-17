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
  'hello'
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
}

class Game {
  constructor() {
    this.balloonPerson
    this.guessBoardLetters = []
    this.puzzleBoardLetters = []
  }
  start() {
    console.log('starting game')
    this.createNewPerson()
    this.setupScreen()
    this.setupGuessEvents()
    this.drawPuzzleBoard()
  }
  createNewPerson() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    let randomWord = PUZZLE_WORDS[getRandomIntInclusive(0,PUZZLE_WORDS.length-1)]
    this.balloonPerson = new BalloonPerson(randomWord)
  }
  setupScreen() {
    let splashScreen = document.getElementById("splashScreen");
    let startButton = document.getElementsByClassName("startBtn")[0];
    let restartScreen = document.getElementById("restartScreen");
    let restartButton = document.getElementsByClassName("restartBtn")[0];
    restartScreen.style.display = "none";

    function closeSplashScreen() {
      console.log("pressed");
      splashScreen.style.display = "none";
    }
    function closeRestartScreen() {
      console.log("pressed");
      restartScreen.style.display = "none";
    }

    function closeModal() {
      // console.log(modal)
      splashScreen.style.display = "none";
    }

    function clickOutside(e) {
      if (e.target === screen) {
        screen.style.display = "none";
      }
    }

    startButton.addEventListener("click", closeSplashScreen);
    restartButton.addEventListener("click", closeRestartScreen);

    // close windows when click outside modal
    // window.addEventListener('click', closeSplashScreen)
  }
  addGuess(guess) {
    this.balloonPerson.submitGuess(guess)
    console.log('letters guess',this.balloonPerson.lettersGuessed)
    this.drawGuessBoard()
    return this.balloonPerson.gameState
  }
  drawGuessBoard() {
    let self = this
    Array.prototype.forEach.call(this.guessBoardLetters, function(el, i){
      if(self.balloonPerson.lettersGuessed.includes(el.dataset.letter.toLowerCase())) {
        el.classList.add('hideGuess')   
      }
    });

  }
  drawPuzzleBoard(secretWord) {
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
  checkGameState(state) {
    console.log('state:', state)
    if(state === 'won') {
      
      // animate falling balloon
      console.log('you won')

      // show restart screen

    } else if(state === 'lost') {
      console.log('you lost')
    } else {}
  }
  updatePuzzleBoard(state, guess) {
    let self = this
    if(state === 'lost') return
    
    this.puzzleLetters = document.querySelectorAll('.puzzleLetter')

    Array.prototype.forEach.call(this.puzzleLetters, function(el, i){
      console.log('puzzle text',el.innerText)
      if(el.innerText.toLowerCase() === guess.toLowerCase())
        el.classList.remove('hidden')
    });
  }
  setupGuessEvents() {
    let self = this
    function updateGame(e) {

      // add guess & update guess area
      let state = self.addGuess(e.target.dataset.letter.toLowerCase())

      // update puzzle area
      self.updatePuzzleBoard(state, e.target.dataset.letter)

      // check game state
      self.checkGameState(state)
      
      // update person area

      console.log('keycode',e.target.dataset.letter)
      
    } 
    this.guessBoardLetters = document.querySelectorAll('.letter')
    Array.prototype.forEach.call(this.guessBoardLetters, function(el, i){
      el.addEventListener('click', updateGame)
    });
  }
}

let game = new Game()
game.start()