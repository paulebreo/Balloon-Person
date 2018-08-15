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
=========`,

];


class RopeDude {
  constructor(secretWord) {
    this.remainingGuesses = 6
    this.secretWord = secretWord.split('').map((item)=>item.toLowerCase())
    this.lettersGuessed = []
    // playing, lost, won
    this.gameState = 'playing'
  }
  submitGuess(guess) {
    // debugger
    let theGuess = guess.toLowerCase()

    // not found
    if(this.lettersGuessed.indexOf(theGuess.toLowerCase()) === -1) {
      this.lettersGuessed.push(theGuess)
    }
    // correct 
    if(this.secretWord.includes(theGuess)) {
    } else {
      // incorrect
      this.remainingGuesses--      
    }
    





    
  }
}

