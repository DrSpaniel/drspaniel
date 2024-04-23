"use strict";
class Example extends Phaser.Scene {
  text;
  cursors;
  sprite;
  bullets;
  lastFired = 0;

  preload() {
    this.load.image("bullet", "assets/games/asteroids/bullets.png");
    this.load.image("ship", "assets/images/ship.png");
  }

  create() {
    this.sprite = this.physics.add.image(400, 300, "ship");

    this.sprite.setDamping(true);
    this.sprite.setDrag(0.40);
    this.sprite.setMaxVelocity(3000);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
     // maxSize: 10,
      runChildUpdate: true,
    });

    this.input.keyboard.on("keydown-SPACE", this.fireBullet, this);

    this.text = this.add.text(10, 10, "", {
      font: "16px Courier",
      fill: "#00ff00",
    });
  }

  update() {
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.sprite.rotation,
        500,
        this.sprite.body.acceleration
      );
    } else {
      this.sprite.setAcceleration(0);
    }

    if (this.cursors.left.isDown) {
      this.sprite.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.sprite.setAngularVelocity(300);
    } else {
      this.sprite.setAngularVelocity(0);
    }

    this.text.setText(`Speed: ${this.sprite.body.speed}`);

    this.physics.world.wrap(this.sprite, 32);
  }

  fireBullet() {
    if (this.time.now > this.lastFired) {
      let bullet = this.bullets.get(this.sprite.x, this.sprite.y);
      if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setVelocity(
          Math.cos(this.sprite.rotation) * 1000,
          Math.sin(this.sprite.rotation) * 1000
        );
        this.lastFired = this.time.now + 400; // Delay between shots (1 second)
      }
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  scene: Example,
};

const game = new Phaser.Game(config);
