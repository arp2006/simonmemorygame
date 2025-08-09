var buttons = ["red", "blue", "green", "yellow"];
var level = 0;
var sec = [];
var userSec = [];
var k=0;
var hs=0;
var started = false;

$(document).ready(adjustHeaderText);

$(window).resize(function() {
  adjustHeaderText();
});



$(document).keypress(function (event) {
  if(!started) {
    console.log(event.key);
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".start").on( "click", function(event) {
  if(!started) {
    console.log(event);
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
    // $("h2").text("Started");
    $('#Start').css('opacity', '0.5');
  }
});

$(".btn").on( "click", function(event) {
  var userChosenColour = $(this).attr("id");
  userSec.push(event.target.id);
  playSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(level,hs);
});

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);
  var x = Math.floor(Math.random()*4);
  var randomChosenColour = buttons[x];
  sec.push(randomChosenColour);
  $("#"+randomChosenColour).delay(1).fadeOut().fadeIn('slow');
  playSound(randomChosenColour);
}

function playSound(name){
  var aud = new Audio("sounds/"+name+".mp3");
  aud.muted;
  aud.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(lvl,h){
  if(sec[k]===userSec[k]) {
    k++;
    if(lvl===k){
      setTimeout(function() {
        nextSequence();
        userSec = [];
        k=0
      }, 1000);
    }
    if (lvl > h) {
      hs = lvl;
      $("h3").text("Highscore: "+hs);
    }
  }
  else{
    playSound("wrong");
    $("h2").text("Restart");
    $('#Start').css('opacity', '1');
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    started = false;
    sec = [];
    userSec = [];
    level = k = 0;
  }
}

function adjustHeaderText() {
  const header = document.getElementById('level-title');
  if (window.innerWidth <= 1000) {
    header.textContent = "Click Start to Begin";
  }
  else{
    header.textContent = "Press any key to begin";
  }
}