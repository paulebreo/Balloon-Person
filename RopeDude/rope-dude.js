// What is ASCIIART? Check the README.md or Workshop to see why ASCIIART is defined in your file.
const ASCIIART = [
  `
  +---+
  |   |
      |
      |
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
O   |
|   |
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
/|\\\  |
    |
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
 / \\\  |
      |
=========`
];

class RopeDude {
  constructor(secretWord) {
    this.remainingGuesses = 6;
    this.secretWord = secretWord.split("").map(item => item.toLowerCase());
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
    const revealedLetter = letter => this.lettersGuessed.includes(letter) ? letter : '#'
    return this.secretWord
              .map(letter=>revealedLetter(letter)).join('')
  }
}
