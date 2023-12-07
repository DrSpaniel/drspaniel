/**

Daniel Gonzalez
explosion actually

basically just a modified version of looking for love, where

the circles are planets, if they collide, they explode and the game ends.

circle1 is now user controlled, and instead it follows the mouse

the background also turns more red the closer the circles get to each other

 */

"use strict";

/**
 * Description of preload
 */
function preload() {
  //saturnImg = loadImage("assets/images/saturn.png");
  spaceshipImg = loadImage("assets/images/spaceship.png");
}

/**
 * Description of setup
 */
function setup() {
  //create canvas same size as the window

  createCanvas(windowWidth, windowHeight);

  circleSetup();
}

//make function which if window width changes, update the canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Description of draw()
 */
function draw() {

  
  if (state === "title") {
    title();
  } else if (state === "simulation") {
    //print in the console "simulate!"
    print("simulate!");
    simulate();
  } else if (state === "explosion") {
    print("explosion!");
    explosion();
  } else if (state === "nearmiss") {
    print("nearmiss!");
    nearmiss();
  }
}

function simulate() {
  redness();
  move();
  checkOffScreen();
  checkOverlap();
  display();
}

function redness() {
  //this uses the map function to map the distance between the circles to a value between 0 and 255

  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);

  let redness = map(d, 0, width, 255, 0);

  background(redness, 0, 0);
}

function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text("explosion SIMULATOR", width / 2, height / 2);
  pop();
}

function explosion() {
  background(0);
  push();
  textSize(64);
  fill(255, 150, 150);
  textAlign(CENTER, CENTER);
  text("explosion! (yeah i know its broken i cant find the fix)", width / 2, height / 2);
  pop();
}

function nearmiss() {
  push();
  background(0);
  textSize(64);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text("NOT explosion! :D", width / 2, height / 2);
  pop();
}

/*GLOBAL VARIABLES*/

let circle1 = {
  //user controlled circle
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

let circle2 = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3,
};

let state = "title"; //can be title, simulation, explosion, nearmiss

/*FUNCTIONS*/

function circleSetup() {
  //position circles seperately
  circle2.x = random(width / 2, width);
  circle2.y = random(height / 2, height);

  circle2.vx = random(-circle2.speed, circle2.speed);
  circle2.vy = random(-circle2.speed, circle2.speed);
}

function move() {
  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;

  circle1.x = mouseX;
  circle1.y = mouseY;
}

function checkOffScreen() {
  //check if circles have gone offscreen
  if (isOffScreen(circle1) || isOffScreen(circle2)) {
    state = "nearmiss";
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
    explosion();
  }
}

function display() {
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
}

function mousePressed() {
  if (state === "title") {
    state = "simulation";
  }else if (state === "nearmiss") {
    location.reload();
  }
}
