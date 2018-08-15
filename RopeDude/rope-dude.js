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
=========`,
];

class RopeDude {
  constructor(secretWord) {
    this.remainingGuesses = 6;
    this.secretWord = secretWord.split('')
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
    this.computeGameState()
  }
  computeGameState() {
    if(this.remainingGuesses > 0) {
      if(this.secretWord.map(L=>this.lettersGuessed.includes(L)).every(L=>L==true)) 
        this.gameState = 'won'
    }
    else if(this.remainingGuesses < 1) {
      this.gameState = 'lost'
    }  else {
      this.gameState = 'playing'
    }
  }
  getSecretWordPuzzle() {
    let self = this
    const revealedLetter = function(secretLetter) {
      if(secretLetter === ' ') return ' '
      return self.lettersGuessed.includes(secretLetter) ? secretLetter : '#'
    } 
    return this.secretWord
              .map(secretLetter=>revealedLetter(secretLetter))
              .join('')
  }
}

RopeDude.prototype.getGameStateMessage = function() {
  let message = ''
  if(this.gameState === 'playing')
    message = `There is a total of ${this.remainingGuesses} guesses remaining:\n`
  if(this.gameState === 'won')
    return 'Winner Winner Chicken Dinner, you won!'
  if(this.gameState === 'lost')
    message = `Game Over, the word was "${this.secretWord.join('')}":\n`
  
    return message + ASCIIART[this.remainingGuesses]
}

function simulateRopeDude(guesses, secretWord) {
  const game = new RopeDude(secretWord);
  for(let i in guesses) {
    game.submitGuess(guesses[i])
  }
  return game.getGameStateMessage()
}
