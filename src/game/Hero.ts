import { Play } from './Play';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  
  constructor(scene: Play, x, y) {
    super(scene, x, y, 'hero');
    this.setOrigin(0.5, 0.5);
    this.initKeys(scene);
  }

  update() {
    if (this.keys.left.isDown) {
      this.runLeft();
    } else if (this.keys.right.isDown) {
      this.runRight();
    } else {
      this.halt();
    }
  }

  runRight() {
    this.setVelocityX(160);
    this.flipX = false;
  }

  runLeft() {
    this.setVelocityX(-160);
    this.flipX = true;
  }

  halt() {
    this.setVelocityX(0);
  }

  private initKeys(scene) {
    this.keys = scene.input.keyboard.createCursorKeys();
  }
}
