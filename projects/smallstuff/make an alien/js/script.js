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
  background(255, 150, 150);
  strokeWeight(50);
  fill(0, 0, 200);
  strokeJoin(ROUND);
  beginShape();
  vertex(120, 80);
  vertex(515, 80);
  vertex(320, 550);
  endShape(CLOSE);
  noStroke();

  fill(255, 255, 255);
  ellipse(240, 160, 70, 70); //coordinates of left eye

  fill(0, 0, 0);
  ellipse(240, 160, 40, 40); //pupil

  fill(255, 255, 255);
  ellipse(400, 160, 70, 70); //coordinates of right eye

  fill(0, 0, 0);
  ellipse(400, 160, 40, 40);

  fill(0, 230, 0);
  ellipse(320, 370, 90, 110); //coordinates of mouth!

  fill(200, 0, 0);
  ellipse(320, 370, 70, 90); //coordinates of mouth!

}

/**
 * Description of draw()
 */
function draw() {}
