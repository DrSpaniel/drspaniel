/**
 * Daniel Gonzalez
 *
 * poseML:
 * using ml5's pose function, the user will do certain poses
 * to control a spaceship in the screen. first ill play with pose thing to see what can be done.
 *
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

function keyPressed() {
  if (key == "s") {
    brain.saveData();
  } else {
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

  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  };

  brain = ml5.neuralNetwork(options);

  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log("pose classification ready!!!!");
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult); //inputs is the 32 inputs!
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  console.log(results[0].confidence);
  classifyPose();
}

function dataReady() {
  brain.normalizeData();
  brain.train(
    {
      epochs: 50,
    },
    finished
  );
}

function finished() {
  console.log("model trained!!");
  brain.save();
}

function draw() {
  push();
  translate(video.width, 0); //this and line below simply flips the video
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    //when pose gets activated, do stuff. maybe up confidence?

    //below commented code was to size clown nose. no longer needed
    // let eyeR = pose.rightEye;
    // let eyeL = pose.leftEye;
    // let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

    // fill(255, 0, 0);
    // ellipse(pose.nose.x, pose.nose.y, d);

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }
  }
  pop();
  fill(255, 0, 255);
  noStroke();
  textSize(256);
  textAlign(CENTER, CENTER);
  text(poseLabel, width / 2, height / 2);
}

function modelLoaded() {
  console.log("poseNet ready!");
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;

    if (state == "collecting") {
      let target = [targetLabel];
      brain.addData(inputs, target);
    }
  }
}
