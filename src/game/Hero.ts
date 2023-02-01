import { Play } from './Play';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  
  constructor(scene: Play, x, y) {
    super(scene, x, y, 'hero');
    this.setOrigin(0.5, 0.5);
    this.initKeys(scene);
  }

  update() {
    if (this.keys.up.isDown && this.body.touching.down) {
      this.jump();
    } else if (this.keys.left.isDown) {
      this.runLeft();
    } else if (this.keys.right.isDown) {
      this.runRight();
    } else {
      this.halt();
    }
  }

  jump() {
    this.setVelocityY(-330);
    this.scene.sound.play('sfx:jump');
  }

  runRight() {
    this.setVelocityX(160);
  }

  runLeft() {
    this.setVelocityX(-160);
  }

  halt() {
    this.setVelocityX(0);
  }

  private initKeys(scene) {
    this.keys = scene.input.keyboard.createCursorKeys();
  }
}
