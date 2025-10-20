var POSSIBLE_WORDS = ["obdurate", "versimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
var word = "";
var guesses = "";

function newGame(){
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";

    updatePage();
}

function guessLetter(){
    var input = document.getElementById("guess")
    var letter = input.value;
    guesses += letter;

    updatePage();
}

function updatePage(){
    var clueString = "";

    for (var i = 0; i < word.length; i++){
        var currentLetter = word.charAt(i);    
        if (guesses.indexOf(currentLetter) >= 0){
            //guess right
            clueString += currentLetter + " ";
        }
        else {
            //guess wrong
            clueString += "_ ";
        }
    }
    
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;

    var guessArea = document.getElementById("usedletters");
    guessArea.innterHTML = guesses;
}