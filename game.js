var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedattern=[];
var started=false;
var level=0;

$(".btn").click(function(){

  var userChosenColor=$(this).attr("id");
  userClickedattern.push(userChosenColor);
  console.log(userClickedattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedattern.length-1);
})

$(document).keydown(function(){
  if(!started){
      $("h1").html("Level "+level);
  nextSequence();

  started=true;
}

})


function nextSequence()
{
  userClickedattern=[];
  level++;
  $("h1").html("Level "+level);
  var randomNumber=Math.floor(Math.random()*3)+1;
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();

}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel)
{
  if(userClickedattern[currentLevel]==gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickedattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }


  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over,Press Any Key to Restart");
    startOver();
  }
}
function startOver(){

  gamePattern=[];
  started=false;
  level=0;
}
