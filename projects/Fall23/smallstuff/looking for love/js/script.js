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

/**
 * Description of setup
 */
function setup() {
  createCanvas(600, 600);

  circleSetup();
}

/**
 * Description of draw()
 */
function draw() {
  if (state === "title") {
    title();
  } else if (state === "simulation") {
    simulate();
  } else if (state === "love") {
    love();
  } else if (state === "sadness") {
    sadness();
  }
}

function simulate() {
  background(0);
  move();
  checkOffScreen();
  checkOverlap();
  display();
}

function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text("LOVE SIMULATOR", width / 2, height / 2);
  pop();
}

function love() {
  background(0);
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER, CENTER);
  text("LOVE! :)", width / 2, height / 2);
  pop();
}

function sadness() {
  push();
  background(0);
  textSize(64);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text("NOT LOVE! :(", width / 2, height / 2);
  pop();
}

/*GLOBAL VARIABLES*/

let circle1 = {
  x: 300,
  y: 200,
  size: 100,
  vx: 2.8,
  vy: 1.05,
  speed: 3,
};

let circle2 = {
  x: 600,
  y: 200,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

let state = "title"; //can be title, simulation, love, sadness

/*FUNCTIONS*/

function circleSetup() {
  //position circles seperately
  circle1.x = random(0, width / 2);
  circle2.x = random(width / 2, width);

  circle1.y = random(0, width / 2);
  circle2.y = random(width / 2, width);

  //start circles moving in a random direction
}

function move() {
  //move x and y of circles
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

function checkOffScreen() {
  //check if circles have gone offscreen
  if (isOffScreen(circle1) || isOffScreen(circle2)) {
    state = "sadness";
  }
}

function isOffScreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  } else {
    return false;
  }
}

function checkOverlap() {
  //check if circles overlap

  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);

  if (d < circle1.size / 2 + circle2.size / 2) {
    love();
    noLoop();
  }
}

function display() {
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
  if (state === "title") {
    state = "simulation";
  }
}
