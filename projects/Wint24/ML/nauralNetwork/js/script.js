/**
 * playing with neural networks
 */

"use strict";

let model;
let targetLabel = "C";
let trainingData = [];

let state = "collection"; //begins by collecting data, might have to be changed
let env;
let wave;

let notes = {
  //notes used by the sound stuff
  C: 261.6256,
  D: 293.6648,
  E: 329.6276,
  F: 349.2282,
  G: 391.9954,
  A: 440.0,
  B: 493.8833,
};

function setup() {
  createCanvas(400, 400);

  //sound stuff
  env = new p5.Envelope();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);

  wave = new p5.Oscillator();

  wave.setType("sine");
  wave.start();
  wave.freq(440);
  wave.amp(env);
  //end sound stuff

  let options = {
    //parameters for network. 2 inputs, and outputs are label.
    //network will use the classify task, and debug is true to
    //show the graph when training.
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
  };

  model = ml5.neuralNetwork(options); //this begins the model with the above params.

  model.loadData("./mouse-notes.json", dataLoaded); //loads training data

  background(255);
}

function dataLoaded() {   
  //THIS IS BROKEN, I CANT FIND OUT WHY XS' X AND Y VALS ARE NORMALIZED AND HOW TO REVERT THAT
  //ALSO, THE JSON RETURNS AS EMPTY IF TRAINING DOES NOT START
  
  
  // console.log(model.data);

  let data = model.data.training;

  for (let i = 0; i < data.length; i++) {
    let inputs = data[i].xs;
    let target = data[i].ys;

    stroke(0);
    noFill();
    ellipse(inputs.x, inputs.y, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(target.label, inputs.x, inputs.y);
  }
  state = "training";
  console.log("starting training!");
  model.normalizeData(); //this makes all numbers relative to 0 and 1
  let options = {
    epochs: 100, //200 cycles, takes longer but is more accurate
  };
  model.train(options, whileTraining, finishedTraining); //using options params, calls whileTraining during training, and calls finishedTraining when done training,
}

function keyPressed() {
  if (key == "t") {
    //assign a train button
  } else if (key == "s") {
    //assign a save button
    model.saveData("mouse-notes"); //call it mouse-notes
  } else {
    targetLabel = key.toUpperCase(); //letter pressed to show network
  }
}

function whileTraining(epoch, loss) {
  //loss is error of incorrect guesses
  console.log(epoch); //for each cycle, print the epoch to show progress
}

function finishedTraining() {
  //self explanatory
  console.log("finished training!");
  state = "prediction";
  //dataLoaded();
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY,
  };

  if (state == "collection") {
    //when in learning state
    let target = {
      label: targetLabel,
    };

    model.addData(inputs, target); //add data that shows what each letter should be.

    //all this is user made.
    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);

    wave.freq(notes[targetLabel]);
    env.play();
  } else if (state == "prediction") {
    model.classify(inputs, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  stroke(0);
  fill(0, 0, 255, 100);
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  let label = results[0].label; //whatever is the most confident, make it that letter
  text(label, mouseX, mouseY);

  wave.freq(notes[label]); //then using that confident letter, play that note
  env.play();
}
