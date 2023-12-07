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
  createCanvas(640, 640);
  noStroke();

  //add rectangle which will be the tree trunk
}

/**
 * Description of draw()
 */
function draw() {
  background(
    map(mouseY, 0, height, 255, 230),
    map(mouseY, 0, height, 250, 92),
    map(mouseY, 0, height, 133, 111)
  );
  fill(
    map(mouseY, 0, height, 240, 231),
    map(mouseY, 0, height, 194, 163),
    map(mouseY, 0, height, 96, 0)
  );

  let sunX = constrain(map(mouseY, 0, width, 200, 0), 0, 200);
  let sunY = map(constrain(mouseY, 128, 640), 0, width, 128, 640);
  let sunSize = map(constrain(mouseY, 40, 500), 0, height, 40, 500);
  ellipse(sunX, sunY, sunSize);

  fill(92, 51, 23);
  rect(450, 350, 70, 500);

  fill(0, 255, 0);
  ellipse(485, 300, 250, 120);

  fill
}
