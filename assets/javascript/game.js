var wordToGuess; 
var letterGuessedInstances;
var guessesRemaining = 5;
//Array of words to guess from
var gameWords = ['interstellar', 'andromeda', 'cosmos', 'milky way', 'supernova', 'redshift', 'pulsar', 'nebula', ' lightspeed', ];
//Hidden wordToGuess should be array of ' _ ' as long as letters in word
var hiddenWord = [];

//This is the initial key listen to create the button that generates the word
//If the userguess is found in the word, then the corresponding ' _ ' will be replaced with that letter
//If the userguess is not found in the word then the letter will be written on the side of the page
$(document).keypress(function(event) {
        var genBtn = $('#genWord');
        if(genBtn.length === 0) {
            $('#buttonDiv').html("<button id='genWord'>" + "Generate a word to guess!" + "</button>");
            $('#genWord').on('click', genWord);
        } else {
            if(!wordToGuess) {
                console.log('Please click the button.');
                return;
            }
            letterGuessedInstances = 0;
            var userGuess = event.key;
            console.log(userGuess);
            
            for(var i=0; i < wordToGuess.length; i++) {
                if(wordToGuess[i].includes(userGuess)) {
                    letterGuessedInstances++;
                    hiddenWord[i] = userGuess;
                    console.log(hiddenWord);
                    $('#guessDiv').html(hiddenWord);
                } 
                
            }
            if(!wordToGuess.includes(userGuess)) {
                $('#lettersGuessed').append(userGuess);
                guessesRemaining--;
                if(guessesRemaining === 0) {
                    $('#guessesRemaining').html('Womp womp :( Could not find ' + userGuess + '. ' + 'No remaining guesses, try another word!');
                    genWord();
                } else {
                    $('#guessesRemaining').html('Could not find ' + userGuess + '. ' + guessesRemaining + ' guesses remaining.');
                }
            }
        console.log('Found the letter ' + userGuess + ' in the word ' + letterGuessedInstances + ' times!');
        confirmComplete();
        }

        
})
//This function begins a round by generating a word and listening for user guesses
function genWord(){

    //The following lines should probably be put in a separate reset() function
    $('#guessDiv').html(' ');
    $('#lettersGuessed').html(' ');
    $('#guessesRemaining').html(' ');
    guessesRemaining = 5;
    hiddenWord = [];
    //

    //Generate a random number based on the number of items in our gameWords[] list
    var randNum = Math.floor((Math.random() * gameWords.length));

    //Assign randNum as the array item to be stored as the word the user will have to guess
    wordToGuess = gameWords[randNum];
    console.log(wordToGuess);

    //Clears any content that would be in #guessDiv
    $('#guessDiv').html(' ');

    for(var i=0; i < wordToGuess.length; i++) {
        hiddenWord.push(' _ ');
        $('#guessDiv').append(hiddenWord[i]);

    }
    
    //Searches for the index of a space character in wordToGuess
    var spacePlace = wordToGuess.indexOf(' ');
    
    //runs if there is a space in wordToGuess
    if(hasSpace(wordToGuess) === true) {
        console.log(spacePlace);
        hiddenWord[spacePlace] = ' ' + ' ' + ' ';
        console.log(hiddenWord);
        $('#guessDiv').html(hiddenWord );
    }
    
}


//check for spaces in word to guess
function hasSpace(string) {
    return string.includes(' ');
}

//checkLetters() and confirmComplete() work in tandem to sift through every char in hiddenWord and determine when the array matches wordToGuess
function checkLetters(letter) {
    return letter !== ' _ ';
}    
function confirmComplete() {
    
    if(hiddenWord.every(checkLetters) === true) {
        console.log('Word complete!');
        var victoryMsg = ('<div>' + 'Congratulations! You guessed the word!' + '</div>');
        $("#guessDiv").append(victoryMsg);
        genWord();
    }
}
    
    
            

//Possible Solutions
//currently we are logging the sentence for every time the user guesses a letter


