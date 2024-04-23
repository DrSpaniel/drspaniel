class Play extends Phaser.Scene {

  // NOTE: As we know, the constructor is called when an object is created with this class
  // but in Phaser 3 we don't actually do much with it! We just make sure that we give
  // the scene a "key" via its parent which we'll need to use to refer to it in our program.
  constructor() {
    super({
      key: `play`
    });
  }

  // NOTE: The create() method is called once when the scene is first created,
  // so we use it to set up all the elements in the current scene
  create() {
    // Let's at least print a message for now to know if this is doing anything...
    console.log("Play scene created!");
  }

  // NOTE: The update() method is a lot like the p5.js draw() function, it's called once
  // every animation frame
  update() {
    // Let's put in another message...
    console.log("Play scene updated!");
  }
}
