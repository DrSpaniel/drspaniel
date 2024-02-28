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

 */
"use strict";

let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = "Y";

let state = "waiting";
let targetLabel;

function keyPressed() {   //implimented a save function, obsolete from previous training data project
  if (key == "s") {
    brain.saveData();
  } else {    //also obsolete.
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function () {
      console.log("collecting");
      state = "collecting";

      setTimeout(function () {
        console.log("not collecting!");
        state = "waiting";
      }, 10000);
    }, 5000);
  }
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide(); //hiding, using image video on draw to show video)

  poseNet = ml5.poseNet(video, modelLoaded); //passes through video, and triggers modelloaded when model loads
  poseNet.on("pose", gotPoses);

  let options = { //params
    inputs: 34, //34 inputs, (17 mody parts, each having x and y)
    outputs: 4, //4 outputs, aka YMCA (to be changed to flying parts)
    task: "classification", //network will be in classifier mode
    debug: true,  //to show graph when training, obsolete
  };

  brain = ml5.neuralNetwork(options); //shove all that stuff into ml5

  const modelInfo = { //instead of training over and over, the model is already created. 
              //so this just adds that. will need to be changed into plane model
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded); //load model, call brainLoaded when done
}

function brainLoaded() {  //called when network is ready to predict
  console.log("pose classification ready!!!!");
  classifyPose(); //explained below
}

function classifyPose() {   //might not be needed... unsure, check later
  if (pose) { //if pose detected
    let inputs = [];  //THIS IS SO IMPORTANT LMAO..... without this the array never ends upon each iteration... this TOOK ME 4 HOURS TO FIX AHHHHHHHHHHHHHHH
    for (let i = 0; i < pose.keypoints.length; i++) { //go thru the whole array and shove in array
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult); //inputs is the 32 inputs!
  } else {  //if a pose isnt detected, keep checking for one
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence > 0.75) { //decreases erratic fluctuations
    poseLabel = results[0].label.toUpperCase(); //
  }
  console.log(results[0].confidence);
  classifyPose();
}

function dataReady() {    //pretty sure not needed, check later
  brain.normalizeData();
  brain.train(
    {
      epochs: 50, //50 cycles, more = longer, but more accurate
    },
    finished
  );
}

function finished() {   //also obsolete, check later
  console.log("model trained!!");
  brain.save();
}

function draw() { //now that i think of it, maybe the webcam can be in a tiny corner. add to TODO
  push(); //to prevent the letters showing from being flipped unlike the webcam
  translate(video.width, 0); //this and line below simply flips the video
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) { //commented stuff is older stuff, may be useful later
    //when pose gets activated, do stuff. maybe up confidence?

    //below commented code was to size clown nose. no longer needed
    // let eyeR = pose.rightEye;
    // let eyeL = pose.leftEye;
    // let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    // fill(255, 0, 0);
    // ellipse(pose.nose.x, pose.nose.y, d);

    for (let i = 0; i < skeleton.length; i++) {   //to show skelly
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

    for (let i = 0; i < pose.keypoints.length; i++) { //to show joints between skelly
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }
  }
  pop();  //end inversion
  fill(255, 0, 255);
  noStroke();
  textSize(256);
  textAlign(CENTER, CENTER);
  text(poseLabel, width / 2, height / 2); //shows letter depending on body shape
}

function modelLoaded() {  //useful
  console.log("poseNet ready!");
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose; //turn pose var into the most convident
    skeleton = poses[0].skeleton; //same thing

    if (state == "collecting") {    //p sure this is useless
      let target = [targetLabel];
      brain.addData(inputs, target);
    }
  }
}
