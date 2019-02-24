var wordToGuess; 
var letterGuessedInstances;
//Array of words to guess from
var gameWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
//Hidden wordToGuess should be array of ' _ ' as long as letters in word
var hiddenWord = [];

//This is the initial key listen to create the button that generates the word

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
            confirmComplete();
        console.log('Found the letter ' + userGuess + ' in the word ' + letterGuessedInstances + ' times!');
        }

        
})
//This function begins a round by generating a word and listening for user guesses
//If the userguess is found in the word, then the corresponding ' _ ' will be replaced with that letter
//If the userguess is not found in the word then the letter will be written on the side of the page
function genWord(){
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
}

//checkLetters() and confirmComplete() work in tandem to sift through every char in hiddenWord and determine when the array matches wordToGuess
function checkLetters(letter) {
    return letter !== ' _ ';
}    
function confirmComplete() {
    
    if(hiddenWord.every(checkLetters) === true) {
        console.log('Word complete!');
    }
}
    
    
            

//Possible Solutions
//currently we are logging the sentence for every time the user guesses a letter


