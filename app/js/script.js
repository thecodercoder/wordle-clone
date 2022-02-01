//console.log('keypress');
const lettersPattern = /[a-z]/; // /^[A-Za-z][A-Za-z0-9]*$/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount);
let words = ['apple', 'baker', 'store', 'horse', 'speak', 'clone', 'bread'];
let solutionWord = '';

const chooseWord = () => {
  // choose random item from words array
  let randomItem = Math.floor(Math.random() * (words.length - 1)) + 1;
  solutionWord = words[randomItem];
};

chooseWord();
//console.log('solution word = ' + solutionWord);

// detect keypress (letter, backspace, enter, other)
document.addEventListener('keydown', (e) => {
  //console.log('keypress: ' + e.key);
  let keypress = e.key;
  if (currentGuessCount < 7) {
    if (
      keypress.length == 1 &&
      lettersPattern.test(e.key) &&
      currentGuess.dataset.letters.length < 5
    ) {
      //console.log('is letter');
      updateLetters(keypress);
    } else if (e.key == 'Backspace' && currentGuess.dataset.letters != '') {
      //console.log('is backspace');
      deleteFromLetters();
    } else if (e.key == 'Enter' && currentGuess.dataset.letters.length == 5) {
      submitGuess();
    }
  }
});

const submitGuess = () => {
  //console.log('submit guess');
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      revealTile(i, checkLetter(i));
    }, i * 200);
  }
};

const checkIfGuessComplete = (i) => {
  if (i == 4) {
    checkWin();
  }
};

const jumpTiles = () => {
  //console.log('jumpTiles');
  //console.log(currentGuessCount);
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      let currentTile = document.querySelector(
        '#guess' + currentGuessCount + 'Tile' + (i + 1)
      );
      currentTile.classList.add('jump');
    }, i * 200);
  }
};

const checkWin = () => {
  //console.log('check win');
  if (solutionWord == currentGuess.dataset.letters) {
    // Win
    //console.log('game is won!');
    setTimeout(() => {
      jumpTiles();
    }, 500);
  } else {
    // Not won
    currentGuessCount = currentGuessCount + 1;
    currentGuess = document.querySelector('#guess' + currentGuessCount);
    //console.log('not a win, increment guess count to ' + currentGuessCount);
    if (currentGuessCount == 7) {
      setTimeout(() => {
        showSolution();
      }, 500);
    }
  }
};

const showSolution = () => {
  alert('Better luck next time. The solution was: ' + solutionWord);
};

// Update "letters"
const updateLetters = (letter) => {
  let oldLetters = currentGuess.dataset.letters;
  let newLetters = oldLetters + letter;
  let currentTile = newLetters.length;
  currentGuess.dataset.letters = newLetters;
  //console.log('currentTile = ' + currentTile);
  updateTiles(currentTile, letter);
};

// Update tile markup
const updateTiles = (tileNumber, letter) => {
  //console.log('updateTiles(' + tileNumber, letter + ')');
  let currentTile = document.querySelector(
    '#guess' + currentGuessCount + 'Tile' + tileNumber
  );
  currentTile.innerText = letter;
  currentTile.classList.add('has-letter');
};

// Backspace -- Delete last letter
const deleteFromLetters = () => {
  // remove last letter from data-letters
  let oldLetters = currentGuess.dataset.letters;
  //console.log('oldLetters = ' + oldLetters);
  let newLetters = oldLetters.slice(0, -1);
  //console.log('newLetters = ' + newLetters);
  currentGuess.dataset.letters = newLetters;
  deleteFromTiles(oldLetters.length);
};

// Backspace -- Delete last tile markup
const deleteFromTiles = (tileNumber) => {
  // remove markup from last tile
  //console.log('deleteFromTiles = ' + tileNumber);
  let currentTile = document.querySelector(
    '#guess' + currentGuessCount + 'Tile' + tileNumber
  );
  currentTile.innerText = '';
  currentTile.classList.remove('has-letter');
};

// Check letter to solution
// parameter = letter position in word
const checkLetter = (position) => {
  //console.log('checkLetter');
  let guessedLetter = currentGuess.dataset.letters.charAt(position);
  let solutionLetter = solutionWord.charAt(position);
  //console.log(guessedLetter, solutionLetter);

  // If letters match, return "correct"
  if (guessedLetter == solutionLetter) {
    return 'correct';
  }
  // If not a match, if letter exists in solution word, return "present"
  else {
    return checkLetterExists(guessedLetter) ? 'present' : 'absent';
  }

  // If not a match, if letter doesn't exist in solution, return "absent"
};

const checkLetterExists = (letter) => {
  return solutionWord.includes(letter);
};

const revealTile = (i, state) => {
  //console.log('revealTile = ' + i, state);
  let tileNum = i + 1;
  flipTile(tileNum, state);
  checkIfGuessComplete(i);
};

const flipTile = (tileNum, state) => {
  let tile = document.querySelector(
    '#guess' + currentGuessCount + 'Tile' + tileNum
  );
  tile.classList.add('flip-in');
  setTimeout(() => {
    tile.classList.add(state);
  }, 250);
  setTimeout(() => {
    tile.classList.remove('flip-in');
    tile.classList.add('flip-out');
  }, 250);
  setTimeout(() => {
    tile.classList.remove('flip-out');
  }, 1500);
};
/*
- if keypress is a letter
  - update "letters" attribute
    - update tile markup based on "letters" value
- if keypress is backspace
  - delete last letter in "letters"
    - update tile markup based on "letters"
*/
