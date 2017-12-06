//VARIABLES
//=================
//game counters
var winCounter = 0;
var lossCounter = 0;
var guessesRemaining = 10;
//arrays and variables - brackets are used for variables holding needed informations
var lettersinWord = []; //letters are actually in the word
var wordArray = ["washington", "adams", "jefferson", "madison", "monroe", "jackson", "buren", "harrison", "tyler", "polk", "taylor", "filmore", "pierce", "buchanan", "lincoln", "johnson", "grant", "hayes", "garfield"];
var selectedWord = ""; //assigns the choosen presidents last name from array - empty quotes means it is waiting for information
var numBlanks = 0; // blanks to letters of presidents
var wrongLetters = []; //wrong guesses - empty brackets means it is waiting to be populated
var underscoresAndCorrect = []; //holds blanks and successful guesses - again empty

// FUNCTIONS - def - Piece of code that does one or more actions
//==================
function startGame() {
    // This funtion is selecting a presidential name from our array and assigning blanks to each letter
    selectedWord = wordArray[Math.floor(Math.random() * wordArray.length)]; //chooses at random a word in the wordArray array of words
    lettersinWord = selectedWord.split(""); //.split breaks the selected president into seperate letters 	//numBlanks = lettersinWord.length;
    numBlanks = lettersinWord.length; //redefining numBlanks to be the length of the word for the sake of iteration


    //this group of varibles will reset the game when user reloads (restarts) the game - set at beginning of sequence
    underscoresAndCorrect = [];
    wrongLetters = [];
    guessesRemaining = 10;

    // since numBlanks has now the assigned no. of letters we now put "underscores" to those letters
    for (var i = 0; i < numBlanks; i++) {
        underscoresAndCorrect.push("_");
        console.log(underscoresAndCorrect);
    }

    //portion of code is first "document" or reflecting in browser the grab info (pres name, user letter guesses, win counter and loss counter )
    // .getElementById - select elements by their // ID
    // .innerHTML - method of replacing content - allows to add new content
    document.getElementById("wordDiv").innerHTML = underscoresAndCorrect.join(" "); // .join eleminates the "commas" between "underscores"
    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
    document.getElementById("wins").innerHTML = "Wins: " + winCounter;
    document.getElementById("losses").innerHTML = "Losses: " + lossCounter;
}


//this function will verify if the user typed letter matches the pres name letters randomly choosen
function checkLetters(letterGuessed) {
    var lettersinWord = false; // this is replacing the previous op

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letterGuessed) {
            lettersinWord = true;

        }
    }
    //loop and conditional needed to compare and replace underscores with correct letters and/or add to wrong guesses and update guess remaining counter
    if (lettersinWord) {
        for (i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letterGuessed) {
                underscoresAndCorrect[i] = letterGuessed;
            }
        }
    }
    else {
        wrongLetters.push(letterGuessed);
        guessesRemaining--;
    }

}


function roundDone(){
    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
    document.getElementById("wordDiv").innerHTML = underscoresAndCorrect.join(" ");
    document.getElementById("wrongGuesses").innerHTML = "Wrong Guesses: " + wrongLetters.join(" ");

    //won?
    // .tostring returns value of a string object
    if (lettersinWord.toString() == underscoresAndCorrect.toString()) {
        document.getElementById("wins").innerHTML = "Wins: " + winCounter;
        winCounter++;
        setTimeout(function(){
            alert("Winner!!");
          }, 10000);
        setTimeout(function(){
            startGame();
          }, 20000);
    }
    //Lost?
    else if (guessesRemaining === 0) {
        lossCounter++;
        setTimeout(function(){
            alert ("Looser!!");
          }, 10000);
        setTimeout(function(){
            document.getElementById("losses").innerHTML = "Loss:" + lossCounter;
          }, 20000);
        setTimeout(function(){
            startGame();
          }, 30000);
    }
}

// Beginnings of the game
startGame();
document.onkeyup = function(event) {
      var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
      // Had trouble with this part -
      // string - variable that needs an assignment
      // .fromCharCode - a number which represents an ASCII character
      // .keyCode - a number which represents an actual key on the KeyBoard
      // event.keycode - getting the unicode of the pressed keyboard key
    checkLetters(letterGuessed);
    roundDone();
};
