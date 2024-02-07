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

/**
 * Description of setup
 */
function setup() {
  createCanvas(windowWidth, windowHeight); //autosize
  bg = loadImage("assets/images/bg.jpg");
  console.log(speechSyn.listVoices());
  speechSyn.setPitch(1);
  speechSyn.setRate(1);
  speechSyn.setVoice('Google polski');
  
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
  //say stuff
  speechSyn.speak("Hello, world! i am a human talking robot. i am sentient.");
}