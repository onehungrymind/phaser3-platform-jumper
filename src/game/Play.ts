import { Hero } from './Hero';
import { Level } from './Level';

export class Play extends Phaser.Scene {
  hero!: Hero;
  level!: Level;
  currentLevel: integer = 2;

  groups!: { [key: string]: Phaser.Physics.Arcade.Group };

  constructor() {
    super('Play');
  }

  create() {
    console.log('Play.create()');
    this.initLevel();
    this.initPhysics();
  }

  update() {
    this.hero.update();
  }

  initLevel() {
    this.level = new Level(this);
    this.gotoLevel(this.currentLevel);
    this.mapProps();
  }

  initPhysics() {
    this.physics.add.collider(this.hero, this.level.platforms);

    this.physics.add.overlap(
      this.hero,
      this.groups.coins,
      this.collectCoin,
      undefined,
      this
    );
  }

  collectCoin(hero, coin) {
    coin.destroy();
    this.sound.play('sfx:coin');
  }

  private mapProps() {
    const props = [
      'hero',
      'groups',
    ];

    props.forEach((prop) => (this[prop] = this.level[prop]));
  }

  private gotoLevel(level) {
    this.level.loadLevel(this.cache.json.get(`level:${level}`));
  }
}
