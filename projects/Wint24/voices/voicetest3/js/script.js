/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";

const speechrecog = new p5.SpeechRec();
let currentspeech = "?";
let bg;

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight); //autosize
  bg = loadImage("assets/images/bg.jpg");

  speechrecog.onResult = handleSpeech;
  speechrecog.start();
}

/**
 * Description of draw()
 */
function draw() {
  background(bg);

  textAlign(CENTER, CENTER);
  textSize(24);

  text(currentspeech, width/2, height/2);
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function handleSpeech() {
  console.log(speechrecog.resultString);
  //currentspeech = speechrecog.resultString;

  if (speechrecog.resultString.toLowerCase() === 'how are you'){
    currentspeech = "i'm doing great!";
  }
  else {
    currentspeech = "test"
  }
}
