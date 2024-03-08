/**
 * Title of Project
 * Author Name
 *
 * This is a template. You must fill in the title, author,
 * and this description to match your project!
 */

"use strict";

// We create a JavaScript object to configure our Phaser 3 game
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  // NOTE: We've added our Play scene to the game, it will be automatically loaded
  // when the game starts because it's the first scene in the list of scenes
  scene: [Play]
};

// Here we actually create the game using this configuration!
let game = new Phaser.Game(config);
