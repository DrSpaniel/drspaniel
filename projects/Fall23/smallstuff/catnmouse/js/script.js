/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";
let img;
let x = 0;
let y = 0;
let diff = 0;


/**
 * Description of preload
 */
function preload() {
  img = loadImage("assets/images/cat.jpeg");
}

/**
 * Description of setup
 */
function setup() {
  createCanvas(1600, 707);
}

/**
 * Description of draw()
 */
function draw() {


  diff = dist(x, y, mouseX, mouseY);

  background(
    //map(diff, 0, 255, 0, 255),
    map(diff, 0, 1000, 255, 0),
    0,
    0
  );

  image(img, x, y);
  let mouseCenterX = mouseX - 120;
  let mouseCenterY = mouseY - 80;

    //credits to https://editor.p5js.org/ENTUNG/sketches/CXHn0lIgZ

  if (x == mouseCenterX) {
    x = x;
  } else {
    if (x < mouseCenterX) {
      x = x + 5;
    }
    if (x > mouseCenterX) {
      x = x - 5;
    }
  }

  if (y == mouseCenterY) {
    y = y;
  }
  if (y < mouseCenterY) {
    y = y + 5;
  }
  if (y > mouseCenterY) {
    y = y - 5;
  }
}
