describe('RopeDude Class', () => {
  it('it attaches a constructor method to the RopeDude Class', () => {
    expect(typeof RopeDude.constructor).toBe('function');
  });

  it('the instance has `secretWord`, `remainingGuesses`, `lettersGuessed`, and `gameState` properties', () => {
    const game = new RopeDude('widdershins');

    expect(game.secretWord).toEqual([
      'w',
      'i',
      'd',
      'd',
      'e',
      'r',
      's',
      'h',
      'i',
      'n',
      's',
    ]);
    expect(game.remainingGuesses).toBe(6);
    expect(game.lettersGuessed).toEqual([]);
    expect(game.gameState).toEqual('playing');
  });

  describe('submitGuess method', () => {
    it('is a prototype method', () => {
      const game = new RopeDude('xertz');
      expect(game.hasOwnProperty('submitGuess')).toBe(false);
    });

    it('if the character is a unique guess (first time the guess was attempted with a character), it is stored', () => {
      const game = new RopeDude('xertz');
      game.submitGuess('a');
      game.submitGuess('a');
      game.submitGuess('z');
      game.submitGuess('e');
      game.submitGuess('a');
      game.submitGuess('z');
      expect(game.lettersGuessed).toEqual(['a', 'z', 'e']);
    });

    it('decrements the remaining guesses when a guess is incorrect and unique', () => {
      const game = new RopeDude('fidgety');

      game.submitGuess('f'); // correct guesses do not decrease the amount of guesses remaining
      game.submitGuess('Z');
      game.submitGuess('g');
      game.submitGuess('F');
      game.submitGuess('a');
      game.submitGuess('T');
      game.submitGuess('B');

      expect(game.remainingGuesses).toBe(3);
    });

    it("if the gameStatus property not set to 'playing', all mechanics of the submitGuess method won't execute", () => {
      const game = new RopeDude('tangerine');

      game.submitGuess('t');
      game.submitGuess('E');
      game.submitGuess('z');
      game.submitGuess('s');
      game.gameState = 'lost'; // manually setting the gameState to "lost" to test the "lost" state

      game.submitGuess('n');
      game.submitGuess('o');
      game.submitGuess('b');
      game.submitGuess('p');

      expect(game.remainingGuesses).toBe(4);
      expect(game.lettersGuessed).toEqual(['t', 'e', 'z', 's']);
    });
  });

  describe('computeGameState', () => {
    it('is a prototype method', () => {
      const game = new RopeDude('cowboy');
      expect(game.hasOwnProperty('computeGameState')).toBe(false);
    });

    it('updates the gameState property to "lost" when the remainingGuesses reaches 0', () => {
      const game = new RopeDude('fly');

      game.submitGuess('z');
      game.submitGuess('x');
      game.submitGuess('a');
      game.submitGuess('c');
      game.submitGuess('s');
      game.submitGuess('e');
      game.computeGameState();
      game.submitGuess('o');

      expect(game.gameState).toBe('lost');
    });

    it('updates the gameState property to "won" when every word is guessed and there are remaining guesses', () => {
      const game = new RopeDude('tree');

      game.submitGuess('T');
      game.submitGuess('x');
      game.submitGuess('R');
      game.submitGuess('e');

      game.computeGameState();

      expect(game.gameState).toBe('won');
    });
  });

  describe('getSecretWordPuzzle method', () => {
    it('is a prototype method', () => {
      const game = new RopeDude('xertz');
      expect(game.hasOwnProperty('getSecretWordPuzzle')).toBe(false);
    });

    it('represents the secret word puzzle with "#"', () => {
      const elephant = 'elephant';
      const game = new RopeDude(elephant);
      const secretWordPuzzle = game.getSecretWordPuzzle();

      expect(secretWordPuzzle).toBe('########');
      expect(secretWordPuzzle.length === elephant.length).toBe(true);
    });

    it('reveals the correct guesses in the puzzle', () => {
      const game = new RopeDude('typewriter');

      game.submitGuess('w');
      game.submitGuess('T');
      const twoCorrectGuesses = game.getSecretWordPuzzle();
      expect(twoCorrectGuesses).toBe('t###w##t##');

      game.submitGuess('y');
      game.submitGuess('p');
      game.submitGuess('e');

      const fiveCorrectGuesses = game.getSecretWordPuzzle();
      expect(fiveCorrectGuesses).toBe('typew##te#');

      game.submitGuess('r');
      game.submitGuess('i');

      const sevenCorrectGuesses = game.getSecretWordPuzzle();
      expect(sevenCorrectGuesses).toBe('typewriter');
    });

    it('handles a space', () => {
      const game = new RopeDude('nacho fries');

      expect(game.getSecretWordPuzzle()).toBe('##### #####');
    });

    it('handles multiple spaces', () => {
      const game = new RopeDude('take me out to the ball game');

      expect(game.getSecretWordPuzzle()).toBe('#### ## ### ## ### #### ####');
    });
  });

  describe('getGameStateMessage method', () => {
    it('is a prototype method', () => {
      const game = new RopeDude('xertz');
      expect(game.hasOwnProperty('getGameStateMessage')).toBe(false);
    });

    it('returns a structured string with blank board ASCII-ART when the game state is set to "playing"', () => {
      const game = new RopeDude('helmet');
      const gameState = game.gameState;

      const message = game.getGameStateMessage();
      expect(gameState === 'playing').toBe(true);
      expect(game.getGameStateMessage())
        .toBe(`There is a total of 6 guesses remaining:

  +---+
  |   |
      |
      |
      |
      |
=========`);
    });

    it('returns a structured string with a filled board ASCII-ART when the game state is set to "lost"', () => {
      const game = new RopeDude('rubber duck');
      const gameState = game.gameState;
      game.submitGuess('a');
      game.computeGameState();
      game.submitGuess('p');
      game.computeGameState();
      game.submitGuess('z');
      game.computeGameState();
      const threeIncorrectMessage = game.getGameStateMessage();

      game.submitGuess('t');
      game.computeGameState();
      game.submitGuess('o');
      game.computeGameState();
      const fiveIncorrectMessage = game.getGameStateMessage();
      game.submitGuess('i');
      game.computeGameState();

      const sixIncorrectMessage = game.getGameStateMessage();

      expect(threeIncorrectMessage)
        .toBe(`There is a total of 3 guesses remaining:

  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`);
      expect(fiveIncorrectMessage)
        .toBe(`There is a total of 1 guesses remaining:

  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
      
=========`);
      expect(game.gameState === 'lost').toBe(true);
      expect(sixIncorrectMessage).toBe(`Game Over, the word was "rubber duck":

  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========`);
    });
    it('returns a structured string when the game state is set to "won"', () => {
      const game = new RopeDude('coffee');

      game.submitGuess('c');
      game.computeGameState();
      game.submitGuess('o');
      game.computeGameState();
      game.submitGuess('f');
      game.computeGameState();
      game.submitGuess('e');
      game.computeGameState();

      expect(game.gameState).toBe('won');
      expect(game.getGameStateMessage()).toBe(
        'Winner Winner Chicken Dinner, you won!'
      );
    });
  });
});

describe('simulateRopeDude', () => {
  /* 
  
  note: the specs are not defined beside the return value (and the argument)
  review the suggestions for the simulateRopeDude function and try to apply them!
  
  */
  it('returns the final result (won or lost condition)', () => {
    expect(typeof simulateRopeDude('hello world')).toBe('string');
  });
});
