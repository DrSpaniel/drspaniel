/*
todo:
record ONLY when spacebar is pressed
prompt user

when pressed, save the string and save only the last word said

look up that string in unsplash using the API

then turn the background into that image
*/

"use strict";

const speechrecog = new p5.SpeechRec();
let currentspeech = "do you like tuiton hikes?";
let bg;

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight); //autosize
  bg = loadImage("assets/images/bg.jpg");

  speechrecog.onResult = handleSpeech;
  speechrecog.interumResults = true;
  //speechrecog.start();
}

let count = 0;

/**
 * Description of draw()
 */
function draw() {


  //when the spacebar is pressed, record speech by calling speechrecog.start() ONLY ONCE

  if (keyIsPressed && key === " ") {
    count++;
    if (count === 1) {
      speechrecog.start();
    }
  } else {
    count = 0;
    speechrecog.stop();
  }




  background(bg);

  textAlign(CENTER, CENTER);
  textSize(24);

  text(currentspeech, width / 2, height / 2);
  console.log(count); 
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function handleSpeech() {
  console.log(speechrecog.resultString);
  currentspeech = speechrecog.resultString;



  // if (speechrecog.resultString.toLowerCase() === "no") {
  //   currentspeech = "hell yeah!!!";
  // } else if (speechrecog.resultString.toLowerCase() === "yes") {
  //   currentspeech = "FUCK YOU!!!";
  // } else {
  //   currentspeech = "whatever";
  // }
}
