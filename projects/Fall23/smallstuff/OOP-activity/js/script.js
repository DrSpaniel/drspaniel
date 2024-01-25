/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";

let scene = "title";

let gravityForce = 0.0025;

let paddle;

let balls = [];

let numBalls = 10;

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
  paddle = new Paddle(300, 20);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }
}

/**
 * Description of draw()
 */
function draw() {
  if (scene === "title") {
    background(0, 34, 88); // Set the background color to dark blue (RGB values).
    fill(255); // Set the fill color to white
    textAlign(CENTER, CENTER);
    textSize(60);
    text("juggle", width / 2, height / 4); //title, make it better
    textSize(29);
    text("click to start.", width / 2, (3 * height) / 4);
    textSize(8);
    text("drspaniel.com", width / 8, (7 * height) / 8); //shameless plug
    if (mouseIsPressed) {
      // If the mouse is clicked, transition to the simulation scene
      scene = "draw";
    }
  } else if (scene === "draw") {
    background(254, 234, 132);
    paddle.move();
    paddle.display();

    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i];
      if (ball.active) {
        ball.gravity(gravityForce);
        ball.move();
        ball.bounce(paddle);
        ball.display();
      }
    }
  } else if (scene === "end") {
    //end stuff
  }
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}
