/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
 */
function preload() {}



let bg;
let video;
let handpose;
let predictions = [];


let pin = {
  tip: {
    x: undefined,
    y: undefined
  },
  head: {
    x: undefined,
    y: undefined,
    size: 20
  }
};

/**
 * Description of setup
 */
function setup() {
  createCanvas(640, 480); //autosize
  bg = loadImage("assets/images/bg.jpg");
  video = createCapture(VIDEO);
  video.size(width,height);
  
  video.hide();

  

  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function () {

  });

  handpose.on('predict', function(results){
    predictions = results;
  })

}


/**
 * Description of draw()
 */
function draw() {
 
  background(0);
  console.log(predictions);
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);


  if (predictions.length > 0) {
    //set the pin to the tip of the index finger
    updatePin(predictions[0]);

    displayPin();
  }
}

function updatePin(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

function displayPin() {
  // Draw pin
  push();
  stroke(255);
  strokeWeight(2);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();

  // Draw pinhead
  push();
  fill(255, 0, 0);
  noStroke();
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}

