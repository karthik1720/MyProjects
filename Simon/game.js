var buttonColors = ["red","yellow","blue","green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
   
   $("#level-title").click(function(){
       if(!started){
        $("h1").text("Level " +level);
        nextSequence();
        started = true;
       }
   });

   $(".btn").click( function(event){
    var userColor = event.target.id;
    userClickedPattern.push(userColor);
    playAudio(userColor);
    //$("#"+userColor).fadeOut(100).fadeIn(100);
    animatePress(userColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " +level);
    var randomNumber =Math.floor(Math.random() * 4);  
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" +randomChosenColor).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
}

function playAudio(userColor){
    var audio = new Audio("sounds/"+userColor+".mp3");
    audio.play();
}



function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel) {
    
    
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("Success");
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        }
        else{
            wrongAudio = new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 300);
            $("h1").text("Game over, Press any key to continue");
            startOver();
        }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

   


