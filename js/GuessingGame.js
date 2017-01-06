function generateWinningNumber(){
  return Math.floor(Math.random()*100)+1;
}

function shuffle(array){
  var m = array.length, tmp, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    tmp = array[m];
    array[m] = array[i];
    array[i] = tmp;
  }

  return array;

  return array;
}

function Game(){
  this.playersGuess=null;
  this.pastGuesses=[];
  this.winningNumber=generateWinningNumber();
}

Game.prototype.difference=function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower=function(){
  return this.playersGuess < this.winningNumber ? true : false;
}

Game.prototype.playersGuessSubmission=function(number){

  if(isNaN(number) || number <= 0 || number >100){
    throw "That is an invalid guess.";
  }
  this.playersGuess= number;
  return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

function newGame(){
  return new Game();
}

Game.prototype.provideHint=function(){
  var array=[this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  shuffle(array);
  return array;
}

/*JQUERY*/
function makeAGuess(game){
  var guess = $('#input-circle').val();
  $('#input-circle').val("");
  var output=game.playersGuessSubmission(parseInt(guess, 10));
  $('#title').text(output);
}


$(document).ready(function(){
  $('#submit').click(function(e) {
     makeAGuess(game);
  })

  $('#input-circle').keypress(function(event) {
      if ( event.which == 13 ) {
         makeAGuess(game);
      }
  })

  $('#hint').click(function() {
      var hints = game.provideHint();
      $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
  });

  $('#reset').click(function() {
      game = newGame();
      $('#title').text('Play the Guessing Game!');
      $('#subtitle').text('Guess a number between 1-100!')
      $('.guess').text('-');
      $('#hint, #submit').prop("disabled",false);

  })
})
