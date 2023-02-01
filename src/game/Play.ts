import { Level } from './Level';

export class Play extends Phaser.Scene {
  level!: Level;

  constructor() {
    super('Play');
  }

  create() {
    console.log('Play.create()');
    this.initLevel();
  }

  update() {
    console.log('Play.update()');
  }

  initLevel() {
    this.level = new Level(this);
    this.level.loadLevel();
  }
}
