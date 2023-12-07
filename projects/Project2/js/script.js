/**
 * red square simulator
 * Daniel Gonzalez
 *
 * red square simulator. goes thru the process of making a red square, from buying the materials to protesting.
 *  yes, there are some duct tape solutions, but hey! if it works, it works!
 */

"use strict";

/**
 * Description of preload
 */
function preload() {}

//backgrounds
let bg;
let s1;
let s2;
let s3;
let s4;
let endscene;

//items
//scene1
let felt;
let pins;
let basket;

let placeSound;
let snip;
let pickup;
let drop;
let thanks;

//scene2
let felt1; //too lazy to rename ugh
let felt2;
let felt3;
let felt4;
let felt5;
let felt6;

//scene3
let bag;
let p1; //unused, idek
let p2;
let p3;
let p4;

//scene4
let armcursor;

//used to check if its time to change scene
let count = 0;
let toggle = false;   //used to see where the cursor just was.

class Item {    //template
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
}

//scene declaration
let scene = "title";

/**
 * just setting stuff up
 */
function setup() {
  createCanvas(heightCheck(), heightCheck()); //autosize

  //*****SOUNDS*****//
  placeSound = loadSound("assets/sounds/place.wav");
  snip = loadSound("assets/sounds/snip.wav");
  pickup = loadSound("assets/sounds/pickup.wav");
  drop = loadSound("assets/sounds/drop.wav");

  //*****SCENE 1*****//

  s1 = loadImage("assets/images/scene1/s1.png");

  felt = new Item(
    width - width / 6 - 25, //x
    height / 2 - 25, //y
    loadImage("assets/images/scene1/felt.png") //img
  );
  pins = new Item(
    width / 6 - 25, //x
    height - height / 3 - 25, //y
    loadImage("assets/images/scene1/pins.png") //img
  );

  basket = new Item(
    width / 2 - 75, //x
    height - height / 8 - 60, //y
    loadImage("assets/images/scene1/basket.png") //img
  );

  //*****SCENE 2*****//

  s2 = loadImage("assets/images/scene2/table.png");

  felt1 = new Item(
    width / 8, //x
    height / 4, //y
    loadImage("assets/images/scene2/felt1.png") //img
  );
  felt2 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt2.png") //img
  );
  felt3 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt3.png") //img
  );
  felt4 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt4.png") //img
  );
  felt5 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt5.png") //img
  );
  felt6 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene2/felt6.png") //img
  );

  //*****SCENE 3*****//

  s3 = loadImage("assets/images/scene3/s3.png");

  bag = new Item(
    width / 6, //x
    (1.8 * height) / 4, //y
    loadImage("assets/images/scene3/bag.png") //img
  );

  p1 = new Item(
    (2.5 * width) / 4, //x
    height / 3, //y
    loadImage("assets/images/scene3/p1.png") //img
  );

  p2 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene3/p2.png") //img
  );

  p3 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene3/p3.png") //img
  );

  p4 = new Item(
    width + 10, //x
    0, //y
    loadImage("assets/images/scene3/p4.png") //img
  );

  //*****SCENE 4*****//

  s4 = loadImage("assets/images/scene4/s4.png");

  armcursor = new Item(
    mouseX,
    mouseY,
    loadImage("assets/images/scene4/arm.png")
  );
}

function debugClick() {   //used to determine coords of mouse
  if (mouseIsPressed) {
    //print mouseX and mouseY
    print("mouseX: ");
    print(mouseX);
    print("mouseY: ");
    print(mouseY);
  }
}

function heightCheck() {
  //make sure the square fits in the window. plz dont resize the window while playing the game. it will break.
  if (windowHeight > windowWidth) {
    return windowWidth;
  } else {
    return windowHeight;
  }
}

function windowResized() {
  //resize canvas when window is resized
  resizeCanvas(heightCheck(), heightCheck());
}

function draw() {
  //debugClick();
  if (scene === "title") {
    title();
  } else if (scene === "scene1") {
    scene1(); //buy red square materials
  } else if (scene === "scene2") {
    scene2(); //cut felt material
  } else if (scene === "scene3") {
    scene3(); //share pins
  } else if (scene === "scene4") {
    scene4(); //protest!
  } else if (scene === "gameover") {
    gameover();
  }
}

function title() {
  // Title screen
  background(255, 0, 0); // Set the background color to dark blue (RGB values).
  fill(255); // Set the fill color to white
  textAlign(CENTER, CENTER);
  textSize(60);
  text("red square simulator!", width / 2, height / 4); //title, make it better
  textSize(29);
  text("click to start.", width / 2, (3 * height) / 4);
  textSize(8);
  text("drspaniel.com", width / 8, (7 * height) / 8); //shameless plug
  textSize(20);
  text(":)", width / 2, (2.5 * height) / 4);

  if (mouseIsPressed) {
    // If the mouse is clicked, transition to the simulation scene
    scene = "scene1";
    mouseIsPressed = false;   //prevent misclicks
  }
}

function scene1() {
  //set background
  background(s1);

  //set items
  image(basket.img, basket.x, basket.y); //basket on bottom shelf
  image(felt.img, felt.x, felt.y); //felt on right shelf
  image(pins.img, pins.x, pins.y); //pins on left shelf

  //set behaviour
  if (mouseIsPressed) {
    if (
      //if mouse is in felt area
      mouseX > felt.x &&
      mouseX < felt.x + felt.img.width &&
      mouseY > felt.y &&
      mouseY < felt.y + felt.img.height
    ) {
      felt.x = mouseX - felt.img.width / 2;
      felt.y = mouseY - felt.img.height / 2;
    } else if (
      //if mouse is in pins area
      mouseX > pins.x &&
      mouseX < pins.x + pins.img.width &&
      mouseY > pins.y &&
      mouseY < pins.y + pins.img.height
    ) {
      pins.x = mouseX - pins.img.width / 2;
      pins.y = mouseY - pins.img.height / 2;
    }
  }

  //set behaviour 2 
  if (
    //if felt is within the basket area, dissapear
    felt.x > basket.x &&
    felt.x < basket.x + basket.img.width &&
    felt.y > basket.y &&
    felt.y < basket.y + basket.img.height
  ) {
    placeSound.play();
    count++;
    felt.x = -100;
    felt.y = -100;
  } else if (
    //or if pins are within the basket area, dissapear
    pins.x > basket.x &&
    pins.x < basket.x + basket.img.width &&
    pins.y > basket.y &&
    pins.y < basket.y + basket.img.height
  ) {
    placeSound.play();
    count++; //count to 2
    pins.x = -100;
    pins.y = -100;
  }

  if (count === 2) {
    scene = "scene2";
    count = 0;
  }
}

function scene2() {
  //cut squares
  //set background
  background(s2);

  textSize(45);

  if (count < 5) {
    cursor("assets/images/scene2/scissors.png"); //set cursor to scissors

    textSize(29);
    text("click the blue lines to cut.", width / 2, height / 6); //title, make it better
  } else {
    textSize(29);
    text("congrats!!", width / 2, height / 6); //title, make it better
    text("click to continue!", width / 2, (5 * height) / 6); //title, make it better
    if (mouseIsPressed) {
      scene = "scene3";
      count = 1;
    }
  }

  //set items
  image(felt1.img, felt1.x, felt1.y); //felt on table

  //set behaviour

  //if user clicks in predetermined bounds of felt1, cut. also vertically crop the felt1.img by the mouse position
  //cutting means replacing the cropped portion with a slice.
  //debugClick();
  if (mouseIsPressed) {
    print(count);

    if (count == 0) {
      if (
        mouseX > 440 &&
        mouseX < 520 &&
        mouseY > felt1.y &&
        mouseY < felt1.y + 340
      ) {
        felt1.img = felt2.img;
        count = 1;
        snip.play();
        mouseIsPressed = false;
        //play cut sound each time count goes
      }
    }

    if (count == 1) {
      if (
        mouseX > 311 &&
        mouseX < 400 &&
        mouseY > felt1.y &&
        mouseY < felt1.y + 340
      ) {
        felt1.img = felt3.img;
        count = 2;
        snip.play();
        mouseIsPressed = false;
      }
    }

    if (count == 2) {
      if (
        mouseX > 142 &&
        mouseX < 221 &&
        mouseY > felt1.y &&
        mouseY < felt1.y + 340
      ) {
        
        felt1.img = felt4.img;
        count = 3;
        snip.play();
        mouseIsPressed = false;
      }
    }

    if (count == 3) {
      //begin horiz cut
      if (
        mouseX > felt1.x &&
        mouseX < felt1.x + 530 &&
        mouseY > 341 &&
        mouseY < 432
      ) {
       
        felt1.img = felt5.img;
        count = 4;
        snip.play();
        mouseIsPressed = false;
      }
    }
    if (count == 4) {
      if (
        mouseX > felt1.x &&
        mouseX < felt1.x + 530 &&
        mouseY > 233 &&
        mouseY < 314
      ) {
        
        felt1.img = felt6.img;
        count = 5;
        snip.play();
        mouseIsPressed = false; //reset mouseIsPressed to false so that the user can click to continue. THIS TOOK ME SO LONG TO REALIZE AAAAAAAAAAAHHHHHHHHHH
      }
    }
  }
}

function ppl() {
  //for time efficiency's sake, this was the best i could do. given more time i could have probably done a more elegant solution. but hey! if its stupid and it works IT AINT STUPID!!!!!!!!!!!! ;-; (yeah i could have managed my time better but i was busy working on the real protest lol)
  if (count === 1) {
    p1.img = p1.img;
  } else if (count === 2) {
    p1.img = p2.img;
  } else if (count === 3) {
    p1.img = p3.img;
  } else if (count === 4) {
    p1.img = p4.img;
  }
}
let pickupsound = 0;    //without this the sound spams a lot and its annoying
function scene3() {
  //give squares to protestors
  //set background
  background(s3);

  //debug
  print(count);
  debugClick();

  //set items
  image(bag.img, bag.x, bag.y);
  image(p1.img, p1.x, p1.y);
  //set behaviour
  if (pickupsound === 1) {
    pickup.play();
  }
  if (mouseIsPressed === true) {
    if (
      mouseX > bag.x &&
      mouseX < bag.x + 250 &&
      mouseY > bag.y &&
      mouseY < bag.y + 480
    ) {
      cursor("assets/images/scene3/closedhand.png"); //pickup squares
      pickupsound++;
      toggle = true; //used to see where the cursor just was.
    }
  } else if (mouseIsPressed === false) {
    if (toggle === true) {
      //if user picks up square, toggle becomes true. then if they let go on the protestor, change the protestor.
      if (
        mouseX > p1.x &&
        mouseX < p1.x + 150 &&
        mouseY > p1.y &&
        mouseY < p1.y + 230
      ) {
        count++; //idk
        print("yipee!!"); //THIS WORKS!!!!!!!!!!!!!! I CANT BELIEVE IT
        drop.play();
        ppl(); //duct tape solution to change person images
        pickupsound = 0;
        toggle = false;
      }
    }
    cursor("assets/images/scene3/openhand.png");
    toggle = false; //this fixes so when user picks up square but does not drop on protestor, but then hovers over protestor, it will not change.
  }

  if (count < 5) {
    text("give squares to the protestors!!!", width / 2, height / 6);
  }

  //set end state
  if (count >= 6) {
   
    scene = "scene4";
    count = 0;
    mouseIsPressed = false; //just so ppl dont accidentally misclick in the next scene
  } else if (count === 5) {
    text("awesome!!!!!!", width / 2, height / 6); //title, make it better
    text("click to protest!!!!!!!!!", width / 2, (5 * height) / 6); //title, make it better
    if (mouseIsPressed === true) {
      count++;
    }
  }
}

function scene4() {
  //protest!!!
  //set background to protest crowd
  background(s4);
  textSize(40);
  text("PROTEST!!!!!!!!!!!!!!!!!", width / 2, height / 6);
  textSize(17);
  text("(click to go back to main page)", width / 2, height / 6 + 50);

  //cursor("assets/images/scene4/armtest.png"); //this likely isnt working cause the image is too huge. also be sure to fix the offset cause thats important

  cursor("none");

  armcursor.x = mouseX;
  armcursor.y = mouseY;
  image(armcursor.img, armcursor.x, armcursor.y);

  //set items
  //just turn cursor to hand holding protest sign.

  //set behaviour
  //play booing and protest sounds?!?!?! looping?/!?!?!

  //set end state
  if (mouseIsPressed) {
    //if mouse is clicked, redirect to drspaniel.com
    window.location.href = "https://drspaniel.com";
  }
}


//game over screen was never used. whatever!!


function gameover() {
  background(0, 34, 88); // Set the background color to dark blue (RGB values).
  fill(255); // Set the fill color to white
  textAlign(CENTER, CENTER);
  textSize(48);
  text("done!!", width / 2, height / 2);

  textSize(24);
  text("Click to Restart", width / 2, (2.5 * height) / 4); // Restart button

  if (mouseIsPressed) {
    // If the mouse is clicked, transition to the simulation scene and restart the simulation
    scene = "simulation";
  }
}
