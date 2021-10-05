var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

var bottonColour = ['red', 'blue', 'green', 'yellow'];

$(document).keypress(function (e) {
    gameStart();
});

function gameStart() {
    if(!started) {
        $('h1').text('Level ' + level);
    nextSequence();
    }
    started = true;
}

$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    var audio = new Audio('sounds/' + userChosenColour + '.mp3');
    audio.play();
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = bottonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    
    animatePress(randomChosenColour);
    var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();
    
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(() => {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }    
    } else {
        gameOver();
    }
}

function gameOver() {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass('game-over');
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}