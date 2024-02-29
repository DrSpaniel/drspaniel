/**
 * Daniel Gonzalez
 *
 * poseML:
 * using ml5's pose function, the user will do certain poses
 * to control a spaceship in the screen. first ill play with pose thing to see what can be done.
 *
 * 
--HUGE THANKS TO CODINGTRAIN!!!--
https://www.youtube.com/watch?v=FYgYyq-xqAw

^was followed step by step, NOT copypasted. 

neural networks are cool!


TODO:
replace YMCA model with plane model
change outputs from 4 to 2, but figure that out later
position camera and skelly to a tiny corner, so that the ship is the main thing
add some plane icon that will move depending on pose recognizer
add randomizer for falling metors, and collision detector

the above 2 todos would be better made in a separate sketch, and then merge later on? idek


1: train model on 3 poses:
  1: salute (used to start the game)
  2: steer left (t pose, lean left)
  3: steer right (t pose, lean right)



 */
"use strict";

//--NEURAL NETWORK THINGS--
let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = "Y";

let state = "waiting";
let targetLabel;

//--SHIP GAME THINGS--
let scene = "title"; // Initial scene is set to "title"
let meteorSpawnInterval; // Interval ID for spawning meteors
let timer = 0; // Timer variable, trying to use this and oldtimer to count
let frequency = 0;
let timerInterval;
let initialSpeed;
let initialFrequency;
let bg;

let ship; // Declare ship variable
let meteor;

class Ship {
  constructor() {
    this.x = width / 2; // Initial x position at the center of the canvas
    this.y = height - 50; // Initial y position near the bottom of the canvas
    this.img = loadImage("../assets/images/cursor-worm_kij6gi.png"); // Load ship image
    this.speed = 5; // Set ship speed
  }

  move() {
    // Update the ship's position based on key input
    if (keyIsDown(LEFT_ARROW)|| poseLabel === 'L') {
      this.x -= this.speed; // Move left
    } else if (keyIsDown(RIGHT_ARROW)|| poseLabel === 'R') {
      this.x += this.speed; // Move right
    }

    // Constrain ship's position to stay within the canvas
    this.x = constrain(this.x, 0, width);
  }

  display() {
    // Display the ship at its current position
    image(this.img, this.x - 32, this.y - 32); // Assuming ship image is 64x64 pixels
  }
}

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
      0,
    ];
    this.randPosY = [
      // Predetermined locations for meteor.y
      0,
      0,
      0,
      height / 4,
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
    this.meteorPos = Math.floor(random(0, 5)); //12 cause the 0 is inclusive, but the 12 is non inclusive?!?!?! meaning up to 12 but not 12
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
  createCanvas(640, 480);
  frameRate(60); //for preformance
  meteor = new Meteor(); // Create the initial meteor object
  bg = loadImage("assets/images/space.jpg");
  initialSpeed = 1.5; // Reset the initial speed
  initialFrequency = 0; // Reset the initial frequency
  ship = new Ship(); // Create the ship object
  video = createCapture(VIDEO);
  video.hide(); //hiding, using image video on draw to show video)

  poseNet = ml5.poseNet(video, modelLoaded); //passes through video, and triggers modelloaded when model loads
  poseNet.on("pose", gotPoses);

  let options = {
    //params
    inputs: 34, //34 inputs, (17 mody parts, each having x and y)
    outputs: 4, //4 outputs, aka YMCA (to be changed to flying parts)
    task: "classification", //network will be in classifier mode
    debug: true, //to show graph when training, obsolete
  };

  brain = ml5.neuralNetwork(options); //shove all that stuff into ml5

  const modelInfo = {
    //instead of training over and over, the model is already created.
    //so this just adds that. will need to be changed into plane model
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded); //load model, call brainLoaded when done
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
    text("salute with right arm to start.", width / 2, (3 * height) / 4);
    textSize(20);
    text("in a t pose, tilt arms left and right to steer ship.", width / 2, (3.5 * height) / 4);

    textSize(18);
    text("please read code for explanation!!", width / 2, (3.8 * height) / 4);

    textSize(8);
    text("drspaniel.com", width / 8, (7 * height) / 8); //shameless plug
    textSize(20);
    text("avoid the meteors!!!", width / 2, (2.5 * height) / 4);

    if (poseLabel === 'O') {
      // If the mouse is clicked, transition to the simulation scene
      scene = "simulation";
      startTimer(); //doesnt work, trying to make timer start here
      startMeteorSpawnInterval(); // Start spawning meteors
    }
  } else if (scene === "simulation") {
    //now that i think of it, maybe the webcam can be in a tiny corner. add to TODO
    push(); //to prevent the letters showing from being flipped unlike the webcam
    translate(video.width, 0); //this and line below simply flips the video
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);

    if (pose) {
      for (let i = 0; i < skeleton.length; i++) {
        //to show skelly
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
        line(a.position.x, a.position.y, b.position.x, b.position.y);
      }

      for (let i = 0; i < pose.keypoints.length; i++) {
        //to show joints between skelly
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(0, 255, 0);
        ellipse(x, y, 16, 16);
      }
    }
    pop(); //end inversion

    // fill(255, 0, 255);
    // noStroke();
    // textSize(256);
    // textAlign(width/4, height/4);
    // text(poseLabel, width / 2, height / 2); //shows letter depending on body shape

    mouseX = ship.x;
    mouseY = ship.y;

    //main game
    print(timer);
    print(frequency);
    print(meteor.speed);
    //background(bg); // Set the background color to dark blue (RGB values).

    textSize(16);
    fill(255);
    textAlign(RIGHT, TOP);
    text("Time: " + timer, width - 100, 10); //align text to top right

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

    ship.move(); // Move the ship based on key input
    ship.display(); // Display the ship
  } else if (scene === "end") {
    background(bg); // Set the background color to dark blue (RGB values).
    fill(255); // Set the fill color to white
    textAlign(CENTER, CENTER);
    textSize(48);
    text("You Died!", width / 2, height / 2);

    textSize(24);
    text("Time: " + timer + "s", width / 2, (3 * height) / 4); // Display the elapsed time

    textSize(24);
    text("salute again to restart.", width / 2, (2.5 * height) / 4); // Restart button

    if (poseLabel === 'O') {
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

//--NEURAL NETWORK THINGS--

function gotResult(error, results) {
  if (results[0].confidence > 0.75) {
    //decreases erratic fluctuations
    poseLabel = results[0].label.toUpperCase();
    if (poseLabel === 'L' || poseLabel === 'R') {
      ship.move();
    }
  }
  console.log(results[0].confidence);
  classifyPose();
}

function brainLoaded() {
  //this network handles pose classification, salute, tilt, etc
  console.log("pose classification ready!!!!");
  classifyPose(); //explained below
}

function classifyPose() {
  //this is important..
  if (pose) {
    let inputs = []; //THIS IS SO IMPORTANT LMAO..... without this the array never ends upon each iteration... this TOOK ME 4 HOURS TO FIX AHHHHHHHHHHHHHHH
    for (let i = 0; i < pose.keypoints.length; i++) {
      //go thru the whole array and shove in array
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult); //inputs is the 32 inputs!
  } else {
    //if a pose isnt detected, keep checking for one
    setTimeout(classifyPose, 100);
  }
}

function modelLoaded() {
  //useful
  console.log("poseNet ready!");
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose; //turn pose var into the most convident
    skeleton = poses[0].skeleton; //same thing
  }
}

//--SPACE THINGS--

function spawnNewMeteor() {
  meteors.push(new Meteor()); // Create a new meteor and add it to the array
}

function startMeteorSpawnInterval() {
  //spawns meteors
  meteorSpawnInterval = setInterval(spawnNewMeteor, 250); // Start spawning meteors every 250ms
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
