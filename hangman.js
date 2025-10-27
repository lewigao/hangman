var POSSIBLE_WORDS = ["obdurate", "versimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
var word = "";
var guesses = "";
MAX_GUESSES = 6;
var guess_count = MAX_GUESSES;

function newGame() {
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;

    updatePage();
}

function guessLetter() {
    var input = document.getElementById("guess")
    var letter = input.value;

    var gameStarted = false;

    // checks that a word has been chosen, which means a game has started
    if (word == "") {
        var usedLetter = document.getElementById("reminder");
        usedLetter.innerHTML = "Please start a new game before trying to guess";
    }
    else if (word != "") {
        gameStarted = true;
    }

    // only applies game logic if they start a new game
    if (gameStarted === true) {
        if (word.indexOf(letter) < 0) { // look for the index of the guessed letter in our "word", if it's not: decrement
            guess_count--;
        }

        // disallows guessing the same letter
        if (guesses.includes(letter)) {
            var usedLetter = document.getElementById("reminder");
            usedLetter.innerHTML = `You've already guessed "${letter}", try another letter`;
        }
        else {
            guesses += letter;
            updatePage();
        }
    }
}

function updatePage() {
    var clueString = "";
    var usedLetter = document.getElementById("reminder");
    usedLetter.innerHTML = "";

    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            //guess right
            clueString += currentLetter + " ";
        }
        else {
            //guess wrong
            clueString += "_ ";
        }
    }

    // updates clue string
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;

    // updates the guess area
    var guessArea = document.getElementById("usedletters");
    guessArea.innerHTML = guesses;

    // updates the image
    var image = document.getElementById("hangmanIMG");
    image.src = "images/hangman" + guess_count + ".gif"
    console.log(guess_count);
    console.log(image);

    // updates the guess area
    var input = document.getElementById("guess");
    input.value = "";

}