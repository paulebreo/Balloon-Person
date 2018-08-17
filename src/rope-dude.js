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
  }
  start() {
    console.log('starting game')
    this.createNewPerson()
    this.setupScreen()
    this.setupGuessEvents()
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
  }
  setupGuessEvents() {
    let self = this
    function addToLettersGuess(e) {
      console.log('keycode',e.target.dataset.letter)
      self.addGuess(e.target.dataset.letter.toLowerCase())
    } 
    const guessLetters = document.querySelectorAll('.guessArea')
    guessLetters.forEach((el)=>{
      el.addEventListener('click', addToLettersGuess)
    });
  }
}

let game = new Game()
game.start()