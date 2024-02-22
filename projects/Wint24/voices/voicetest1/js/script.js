/**
using p5.speech, make a page with a button in the middle, where if clicked, the user is prompted to speak. depending on the colour they say, the bacground will change to that colour.
 */

"use strict";

let speech = new p5.Speech();

let recog = new p5.SpeechRec();

let bg;

/**
 * Description of preload
 */
function preload() {}



/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight); //autosize
  bg = loadImage("assets/images/bg.jpg");
  recog.onresult = handleResult;
  recog.start();
}

/**
 * Description of draw()
 */
function draw() {
  background(bg);
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  speech.speak("i am sentient. i am alive. i am a robot. beep boop.");
}

function handleResult() {
  console.log(recog.resultString);
}
