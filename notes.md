# Functional Requirements

## Gameplay

6 tries to guess a 5-letter word

### Pick a solution word

x Store solution words in array
x When game is loaded, choose random item from array
x Set solution to that word

### Making a guess

Detect keypresses

x if keypress is a letter
x update "letters" attribute
x update tile markup based on "letters" value

x if keypress is backspace
x delete last letter in "letters"
x update tile markup based on "letters"

x Don't run update functions if "letters" length = 4;

### Submit guess

x Pressing Enter will submit guess

x compare each letter with the corresponding letter in solution word
x update the state/color of the letter

- If all letters are "correct" / green, game is won

Guesses must be a real word, "in word list"

Guess colors (data-state):

- gray: "absent," letter not in word
- yellow: "present," letter in word, but in wrong position
- green: "correct," letter in word and in right position

Hard Mode: present or correct letters must be used in subsequent guesses

Guesses are saved in Local Storage

## Design

Tiles 5x6
Virtual keyboard

## Interactions

When typing a letter:

x border of the tile changes to light gray

- blinking in animation with letter

x backspace will remove letter, border changes back to dark gray

When submitting guess:

x Tiles will flip up and background color will change based on guess
x Slight delay between each tile flipping
x Background color changes when tile is flat, i.e. can't see it
