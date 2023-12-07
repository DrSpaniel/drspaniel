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
  background(random(0, 640), random(0, 640), random(0, 640));
  noStroke();

    //add circle, red to the center of the canvas
fill(mouseX, mouseY, random(0, 255));
ellipse(320, 120, 200, 200); //coordinates of circle

//add square, purple to the left of the circle
fill(random(0, 255), random(0, 255), random(0, 255));
square(mouseX, random(0, 640), random(0, 640)); //coordinates of square

//add parallelogram, blue to the right of the canvas
fill(random(0, 255), random(0, 255), random(0, 255));
quad(random(0, 640), random(0, 640), random(0, 640), random(0, 640), random(0, 640), random(0, 640), random(0, 640), random(0, 640)); //coordinates of parallelogram

//add triangle, green to the bottom of the canvas
fill(random(0, 255), random(0, 255), random(0, 255));
triangle(random(0, 640), random(0, 640), random(0, 640), random(0, 640), random(0, 640), random(0, 640));

//make a pentagram shaped red that has random coordiantes

fill(random(0, 255), random(0, 255), random(0, 255));
beginShape();
vertex(random(0, 640), random(0, 640));
vertex(random(0, 640), random(0, 640));
vertex(random(0, 640), random(0, 640));
vertex(random(0, 640), random(0, 640));
vertex(random(0, 640), random(0, 640));
endShape(CLOSE);




}

/**
 * Description of draw()
 */
function draw() {


}
