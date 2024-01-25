let scene = "title"; // Initial scene is set to "title"
let meteorSpawnInterval; // Interval ID for spawning meteors
let timer = 0; // Timer variable, trying to use this and oldtimer to count
let frequency = 0;
let timerInterval;

class Meteor {
  constructor() {
    //vars needed for meteors to wo
    this.x = 0;
    this.y = 0;
    this.img = 0;
    this.vx = 0;
    this.vy = 0;
    this.initialVx = 0;
    this.initialVy = 0;
    this.speed = 3;
    this.meteorPos = 0;
    this.randPosX = [
      // Predetermined locations for meteor.x
      windowWidth / 4,
      windowWidth / 2,
      (3 * windowWidth) / 4,
      windowWidth,
      windowWidth,
      windowWidth,
      (3 * windowWidth) / 4,
      windowWidth / 2,
      windowWidth / 4,
      0,
      0,
      0,
    ];
    this.randPosY = [
      // Predetermined locations for meteor.y
      0,
      0,
      0,
      height / 4,
      height / 2,
      (3 * height) / 4,
      height,
      height,
      height,
      (3 * height) / 4,
      height / 2,
      height / 4,
    ];
    this.img = loadImage(
      `assets/images/meteors/meteor${Math.floor(random(0, 8))}.png` //randomizes the meteor image
    );
    this.spawnMeteor();
  }

  move() {
    // Update the meteor's position based on its velocity, which is calculated by calculateDirection()
    this.x += this.vx;
    this.y += this.vy;
  }

  calculateDirection() {
    // Calculate the direction vector from the meteor to the mouse's last location.
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const magnitude = dist(mouseX, mouseY, this.x, this.y); //using p5js's dist to find relative distance of mouse cursor and meteor

    // Normalize the direction vector to get a unit vector.
    if (this.vx === 0 && this.vy === 0) {
      //only when the meteor is spawned will it change.
      this.initialVx = (dx / magnitude) * this.speed; //linear algebra fuck yeah!
      this.initialVy = (dy / magnitude) * this.speed;
    }
    this.vx = this.initialVx;
    this.vy = this.initialVy;
  }

  spawnMeteor() {
    this.meteorPos = Math.floor(random(0, 12)); //12 cause the 0 is inclusive, but the 12 is non inclusive?!?!?! meaning up to 12 but not 12
    this.x = this.randPosX[this.meteorPos]; //sets predetermined locations for meteor
    this.y = this.randPosY[this.meteorPos];
    this.initialVx = 0; //triggers the if else in line 64.
    this.initialVy = 0;
    print("reset!"); //debug
    this.calculateDirection();
  }
}

let meteors = []; // Array to hold meteor objects

function setup() {
  createCanvas(windowWidth, windowHeight); //autosize
  frameRate(60); //for preformance
  mouseX = width / 2; //if there is no mouse input, mouseX/Y default to 0. that looks kinda weird so i made it the center of the page to it looks a little nicer.
  mouseY = height / 2; //though i realize now this is useless, since the user has to click to start the game
  meteor = new Meteor(); // Create the initial meteor object
  bg = loadImage("assets/images/space.jpg");
  initialSpeed = 1.5; // Reset the initial speed
  initialFrequency = 0; // Reset the initial frequency
}

function spawnNewMeteor() {
  meteors.push(new Meteor()); // Create a new meteor and add it to the array
}

function startTimer() {
  //trying to make a function which starts a timer from 0, counts to 1, 2, 3, etc every second until stoptimer is called
  clearInterval(timerInterval);

  timer = 0;
  timerInterval = setInterval(function () {
    //simple counter
    timer++;
  }, 1000);
}

function stopTimer() {
  //stops the timer
  clearInterval(timerInterval);
}

function draw() {
  if (scene === "title") {
    // Title screen
    background(0, 34, 88); // Set the background color to dark blue (RGB values).
    fill(255); // Set the fill color to white
    textAlign(CENTER, CENTER);
    textSize(60);
    text("Space!", width / 2, height / 4); //title, make it better
    textSize(29);
    text("click to start.", width / 2, (3 * height) / 4);
    textSize(8);
    text("drspaniel.com", width / 8, (7 * height) / 8); //shameless plug
    textSize(20);
    text("avoid the meteors!!!", width / 2, (2.5 * height) / 4);

    if (mouseIsPressed) {
      // If the mouse is clicked, transition to the simulation scene
      scene = "simulation";
      startTimer(); //doesnt work, trying to make timer start here
      startMeteorSpawnInterval(); // Start spawning meteors
    }
  } else if (scene === "simulation") {
    //main game
    print(timer);
    print(frequency);
    print(meteor.speed);
    background(bg); // Set the background color to dark blue (RGB values).

    textSize(16);
    fill(255);
    textAlign(RIGHT, TOP);
    text("Time: " + timer, width - 100, 10);    //align text to top right

    for (let i = meteors.length - 1; i >= 0; i--) {
      //for every meteor in the array
      const meteor = meteors[i]; // Get the current meteor object from the array.

      image(meteor.img, meteor.x - 32, meteor.y - 32); // Display the meteor's image at its current position with an offset to center it.

      meteor.calculateDirection(); // Calculate the direction of the meteor's movement based on the mouse position.

      meteor.move(); // Update the meteor's position based on its velocity.

      if (
        //meteor touching border
        meteor.y > height ||
        meteor.y < 0 ||
        meteor.x > width ||
        meteor.x < 0
      ) {
        meteors.splice(i, 1); // Remove meteors that go off-screen from the array.
      }
      if (dist(meteor.x, meteor.y, mouseX, mouseY) < 55) {
        //when ship touches any meteor
        //55 to account of radius of both meteor and ship. probably janky. i could probably make it when both images overlap but argh
        // If the mouse touches a meteor, transition to the "end" scene
        scene = "end";
        clearInterval(meteorSpawnInterval); // Stop spawning meteors

        stopTimer();
      }
    }
  } else if (scene === "end") {
    background(bg); // Set the background color to dark blue (RGB values).
    fill(255); // Set the fill color to white
    textAlign(CENTER, CENTER);
    textSize(48);
    text("You Died!", width / 2, height / 2);

    textSize(24);
    text("Time: " + timer + "s", width / 2, (3 * height) / 4); // Display the elapsed time

    textSize(24);
    text("Click to Restart", width / 2, (2.5 * height) / 4); // Restart button

    if (mouseIsPressed) {
      // If the mouse is clicked, transition to the simulation scene and restart the simulation
      scene = "simulation";
      startMeteorSpawnInterval(); // Start spawning meteors
      meteors = [];
      startTimer();
    }
  } else if (scene === "board") {
    //WIP, this will be a leaderboard to submit results. title page will have a list

    background(0); // Set the background color to black
  }
}

function windowResized() {    //resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function startMeteorSpawnInterval() {   //spawns meteors
  meteorSpawnInterval = setInterval(spawnNewMeteor, 250); // Start spawning meteors every 250ms
}
