/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";

const speechSyn = new p5.Speech();

/**
 * Description of preload
 */
function preload() {}

let bg;

let words = "Hello, world! i am a human talking robot. i am sentient.";
let showSubtitle = false;

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight); //autosize
  bg = loadImage("assets/images/bg.jpg");
  console.log(speechSyn.listVoices());
  speechSyn.setPitch(0.8);
  speechSyn.setRate(0.87);
  speechSyn.setVoice("Google US English");

  speechSyn.onStart = startedSpeech;
  speechSyn.onEnd = stopSpeech;
}

/**
 * Description of draw()
 */
function draw() {
  background(bg);

  if (showSubtitle){
    textSize(36);
    text(words, 0, height/2);
  }
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  //say stuff
  speechSyn.speak(words);
}

function startedSpeech() {
  showSubtitle = true;
}

function stopSpeech() {
  showSubtitle = false;
}