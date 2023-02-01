import { Play } from './Play';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Play, x, y) {
    super(scene, x, y, 'hero');
    this.setOrigin(0.5, 0.5);
  }
}
