/**
Daniel Gonzalez
cART-253

REQUIREMENTS:
- user controlled shape/image
- user interaction with other objects (attract, repel, etc) be sure to use for loops!
- objects must vary in size, colour, or size (add variants as well)
- at least 2 alternate endings

farmer getting sheep and putting in farm

farmer is user, image rotates depending on the direction

preset amount of sheep (10) with varying colour and size

sheep repel from farmer, but if youre fast (press shift to boost for quick moment) you can grab.

get close enough and you capture sheep, they follow you to the farm when youre done.


----------------------------------------
step 1: setup farmer movement and image
farmer is controlled by wasd, shift for boost (2 second cooldown)










 */

"use strict";

let bg;
let farmer;
let speed = 2;
let wKeyHeld = false;
let aKeyHeld = false;
let sKeyHeld = false;
let dKeyHeld = false;
let isBoosting = false;
let sheepArray = [];

class Farmer {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
  }

  move() {
    let currentSpeed = isBoosting ? speed * 2 : speed;

    if (wKeyHeld) {
      this.y -= currentSpeed; // Move up while 'W' key is held down
    }
    if (aKeyHeld) {
      this.x -= currentSpeed; // Move left while 'A' key is held down
    }
    if (sKeyHeld) {
      this.y += currentSpeed; // Move down while 'S' key is held down
    }
    if (dKeyHeld) {
      this.x += currentSpeed; // Move right while 'D' key is held down
    }
  }

  catchSheep(sheep) {
    let distance = dist(this.x, this.y, sheep.x, sheep.y);
    if (distance < 200) {
      if (isBoosting && distance < 64) {
        // Boosted farmer can catch the sheep
        let index = sheepArray.indexOf(sheep);
        sheepArray.splice(index, 1);
        playSound("assets/sounds/hitHurt.wav");
      } else {
        // Sheep moves away from the farmer
        let angle = atan2(sheep.y - this.y, sheep.x - this.x);
        let repelSpeed = isBoosting ? speed * 0.8 : speed * 1.5; // Slower repel when boosting
        sheep.x += cos(angle) * repelSpeed;
        sheep.y += sin(angle) * repelSpeed;
      }
    }
  }
}

class Sheep {
  constructor(image, x, y, size, speed) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
  }

  repelFromFarmer(farmer) {
    let distance = dist(this.x, this.y, farmer.x, farmer.y);
    if (distance < 200) {
      let angle = atan2(this.y - farmer.y, this.x - farmer.x);
      let repelSpeed = isBoosting ? this.speed * 0.6 : this.speed; // Slower repel when boosting
      this.x += cos(angle) * repelSpeed;
      this.y += sin(angle) * repelSpeed;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage("assets/images/grass.jpeg");

  farmer = new Farmer(loadImage("assets/images/farmer.png"), windowWidth / 2, windowHeight / 2);

  let numberOfSheep = Math.floor(random(10, 21)); // Randomize the number of sheep

  for (let i = 0; i < numberOfSheep; i++) {
    let sheepImage = loadImage(`assets/images/sheeps/sheep${Math.floor(random(6))}.png`);
    let x = constrain(random(100, windowWidth - 100), 100, windowWidth - 100);
    let y = constrain(random(100, windowHeight - 100), 100, windowHeight - 100);
    let size = random(30, 60); // Randomize sheep size
    let sheepSpeed = random(1.2, 1.8); // Randomize sheep speed
    sheepArray.push(new Sheep(sheepImage, x, y, size, sheepSpeed));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function teleportIfNeeded(object) {
  if (object.x < 0) {
    object.x = 0;
  } else if (object.x > windowWidth - 64) {
    object.x = windowWidth - 64;
  }
  if (object.y < 0) {
    object.y = 0;
  } else if (object.y > windowHeight - 64) {
    object.y = windowHeight - 64;
  }
}

function draw() {
  background(bg);

  farmer.move();
  teleportIfNeeded(farmer);
  image(farmer.image, farmer.x, farmer.y);

  for (let sheep of sheepArray) {
    farmer.catchSheep(sheep);
    sheep.repelFromFarmer(farmer);
    teleportIfNeeded(sheep);
    sheep.display();
  }
}

function keyPressed() {
  if (keyCode === 87) {
    wKeyHeld = true; // 'W' key
  } else if (keyCode === 65) {
    aKeyHeld = true; // 'A' key
  } else if (keyCode === 83) {
    sKeyHeld = true; // 'S' key
  } else if (keyCode === 68) {
    dKeyHeld = true; // 'D' key
  } else if (keyCode === 13) {
    // 'Enter' key
    isBoosting = true;
    setTimeout(() => {
      isBoosting = false;
    }, 500); // Reset the boost after 500ms
  }
}

function keyReleased() {
  if (keyCode === 87) {
    wKeyHeld = false; // 'W' key
  } else if (keyCode === 65) {
    aKeyHeld = false; // 'A' key
  } else if (keyCode === 83) {
    sKeyHeld = false; // 'S' key
  } else if (keyCode === 68) {
    dKeyHeld = false; // 'D' key
  }
}

function playSound(soundFile) {
  // You should implement your sound playing mechanism here
  // For example, you can use the p5.js library's sound functions.
}
