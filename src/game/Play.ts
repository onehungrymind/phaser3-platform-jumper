import { Level } from './Level';

export class Play extends Phaser.Scene {
  level!: Level;
  currentLevel: integer = 2;

  constructor() {
    super('Play');
  }

  create() {
    console.log('Play.create()');
    this.initLevel();
  }

  update() {
    // console.log('Play.update()');
  }

  initLevel() {
    this.level = new Level(this);
    this.gotoLevel(this.currentLevel);
  }

  private gotoLevel(level) {
    this.level.loadLevel(this.cache.json.get(`level:${level}`));
  }
}
