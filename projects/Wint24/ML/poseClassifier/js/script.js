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

function setup(){
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();   //hiding, using image video on draw to show video)

  poseNet = ml5.poseNet(video, modelLoaded);    //passes through video, and triggers modelloaded when model loads
  poseNet.on('pose', gotPoses);
}


function draw(){
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);

  if (pose){    //maybe up the confidence level?
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);


  fill (255, 0, 0);
  ellipse(pose.nose.x, pose.nose.y, d);
  ellipse(pose.leftWrist.x, pose.leftWrist.y, 16);
  ellipse(pose.rightWrist.x, pose.rightWrist.y, 16);

    for (let i = 0; i < pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }

    for (let i = 0; i < skeleton.length; i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

  }
}

function modelLoaded(){
  console.log('poseNet ready!');
}

function gotPoses(poses){
  console.log(poses);
  if (poses.length > 0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}