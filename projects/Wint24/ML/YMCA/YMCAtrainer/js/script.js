/**
using line 50,
you can create data, and train it.

comment out line 50 to define data, then save using s
then import the JSON file and uncomment line 50 with the 
directory of the file.
 */
"use strict";

let video;
let poseNet;
let pose;
let skeleton;

let brain;

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
  brain.loadData('ymca.json', dataReady);
}

function dataReady(){
  brain.normalizeData();
  brain.train(
    {
      epochs: 50
    }, finished
  );
}

function finished(){
  console.log('model trained!!');
  brain.save();   //saves meta, model, and weights to download
}

function draw() {
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
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];
      brain.addData(inputs, target);
    }

  }
}
