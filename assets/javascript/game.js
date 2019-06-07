// Gobal Variables
// -------------------------------------------------------------------------------------
// Arrays and Variables for holding Data
// Array of Superheroes (wordOptions)
var superHero = ["cat " + "woman", "wonder " + "woman", "black " + "widow", "elektra", "phoenix", "storm", "mystique", "thor", "black " + "panther", "superman", "batman", "wolverine", "the " + "flash", "aquaman"];

// Random Superhero picked by computer (selectedWord)
var SelectedHero = "";

// number of letters in word (lettersInWord)
var lettersInWord = [];

// number of blanks needed
var numOfBlanks = 0; //numBlanks
var blanksAndSuccesses = []; //blanksAndSuccesses
var wrongGuesses = [];  //wrongLetters

// Game Counters
var winCount = "";  //winCount
var lossCount = ""; //lossCount
var guessesLeft = 10;  //guessesLeft

//Game Buttons
var startButton = document.getElementById("startGameBtn");
var resetButton = document.getElementById("resetGameBtn");
// Functions
// --------------------------------------------------------------------------------------



// Fuction for computer toselect a random word from SuperHero array

function startGame() {
    // Computer randomly selects a word at start
    SelectedHero = superHero[Math.floor(Math.random() * superHero.length)];
    // the letters in the chosen word are split
    lettersInWord = SelectedHero.split("");
    // the number of blank spaces are obtained from the number of letters in the word
    numOfBlanks = lettersInWord.length;
    
    

    // Resets at the start of each round

    guessesLeft = 10;
    wrongGuesses = [];
    blanksAndSuccesses = [];

    // 
    for (var i= 0; i < numOfBlanks; i++){
        blanksAndSuccesses.push("_");  
    }


    // change html  
    document.getElementById("superheroName").innerHTML = blanksAndSuccesses.join(" "); 
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("winCount").innerHTML = winCount;
    document.getElementById("lossCount").innerHTML = lossCount;

    // Testing and Debugging
        console.log("Selected Hero: " + SelectedHero);
        console.log("Letters In Word: " + lettersInWord);
        console.log("Number of Blanks: " + numOfBlanks);
        console.log("Blanks and Successes: " + blanksAndSuccesses);
        console.log("Guesses Left: " + guessesLeft)
}

// checking the keyed letter exists in the selected SuperHero name 
function checkLetters(letter) {
    console.log(letter)
    var isLetterInWord = false;

    for(var i = 0; i < numOfBlanks; i++) {
        if(SelectedHero[i] == letter) {
            isLetterInWord = true;
        }
    }
    
    // Check where the letter exists in word and populate
    if(isLetterInWord) {
        for(var i = 0; i < numOfBlanks; i++) {
            if(SelectedHero[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
            
        }
    }

    // If letter is not found, populate letter and subtract guesses left
    else {
        wrongGuesses.push(letter);
        guessesLeft --;
    }
    console.log(blanksAndSuccesses);
}

function roundComplete() {
    // alert("testing testing");
    console.log("Win Count " + winCount + "| Loss Count " + lossCount + "| Guesses Left " + guessesLeft);

    //update HTML to reflect game 
    document.getElementById("wrongGuess").innerHTML = wrongGuesses.join(" ");
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("superheroName").innerHTML = blanksAndSuccesses.join(" ");

    // Check if User Won
    if(lettersInWord.toString() === blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        //Update Win Count in HTML
        document.getElementById("winCount").innerHTML = winCount;
        startGame();
    }

    // check if User Lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You Lost!");

        // Update Loss Count in HTML
        document.getElementById("lossCount").innerHTML = lossCount;
        startGame();
    }
}



//  Main Processes
// --------------------------------------------------------------------------------

// Run Start Game when Start Button is clicked
startButton.onclick = function clickedStartBtn() {
    startGame();
};

// Reset Game and Run Start Game when Reset Button is clicked
resetButton.onclick = function clickedResetBtn() {
    startGame();
}


// Register key clicks

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    // When a letter is keyed, checkLetters is invoked to check against superHero name
    checkLetters(letterGuessed);

    roundComplete();
    
    // Testing and Debugging
    console.log(letterGuessed);
}

