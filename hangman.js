var POSSIBLE_WORDS = ["all"];
var word = "";
var guesses = "";
MAX_GUESSES = 6;
var guess_count = MAX_GUESSES;
var spaced_word;

function newGame() {
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    spaced_word = "";
    document.getElementById("usedletters").style.color = "inherit";

    guess_count = MAX_GUESSES;
    for (var i = 0; i < word.length; i++) {
        spaced_word += word[i] + " ";
    }

    updatePage();
}

function guessLetter() {
    var input = document.getElementById("guess")
    var letter = input.value;
    var userInfo = document.getElementById("reminder");

    var gameStarted = false;

    // checks that a word has been chosen, which means a game has started
    if (word == "") {
        userInfo.innerHTML = "Please start a new game before trying to guess";
    }
    else if (word != "") {
        gameStarted = true;
    }

    // ##################### TASK 4 #####################:
    // only applies game logic if they start a new game
    if (gameStarted === true && guess_count > 0) {
        if (word.indexOf(letter) < 0 && letter != "" && letter != " ") { // look for the index of the guessed letter in our "word", if it's not: decrement
            guess_count--;
        }

        // ##################### TASK 5 #####################:
        // disallows guessing the same letter or blank
        if (guesses.includes(letter) && letter != "" && letter != " ") {
            userInfo.innerHTML = `You've already guessed "${letter}", try another letter`;
        }
        else if (letter == "" || letter == " ") {
            userInfo.innerHTML = "And you've got a blank space ba-by";
            input.innerHTML = "";
        }
        else {
            guesses += letter;
            updatePage();
        }
    }
}

// self-explanatory
function checkWin() {
    if (spaced_word == document.getElementById("clue").innerHTML) {
        // ##################### TASK 2a #####################:
        guess_count = 0;
        return true;
    }
}

function updatePage() {
    // #####################T TASK 3 #####################:
    // updatePage() is only run after "a game is started + user has sufficient guesses + they guess a letter", and when a new game starts
    var clueString = "";
    var userInfo = document.getElementById("usedletters");
    document.getElementById("reminder").innerHTML = "";

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

    // ##################### TASK 1 #####################:
    if (checkWin() === false && guess_count == 0) /* TASK 2b #####################*/ {
        userInfo.style.color = "red";
        userInfo.innerHTML = "Start a new game, you're done.";
    }
    else if (checkWin() === true) {
        userInfo.style.color = "green";
        userInfo.innerHTML = "You won!";
    }
}