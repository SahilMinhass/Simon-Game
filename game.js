var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started= false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    var sound1 =  randomChosenColor + ".mp3";
    playSound(sound1);
}    

$(".btn").click(function (event) {
    var userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    setTimeout(function () {
        $("." + userChosenColor).removeClass("pressed");
    }, 100);
    var sound2 = userChosenColor + ".mp3";
    playSound(sound2);
    checkAnswer(userClickedPattern.length-1);
});
    
$(document).keydown(function () {
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started= true;
    }
});

function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function()  {
                nextSequence();
            }, 1000);
        }
    }
    else{
        var sound3="wrong.mp3";
        playSound(sound3);
        $("body").addClass("game-over");
        setTimeout(function()  {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    started=false;
    level = 0;
    
}

