import { Animations } from './Animations';
import { Hero } from './Hero';
import { Level } from './Level';
import { Spider } from './Spider';

export class Play extends Phaser.Scene {
  hero!: Hero;
  spiders!: Spider[];
  level!: Level;
  currentLevel: integer = 2;

  groups!: { [key: string]: Phaser.Physics.Arcade.Group };

  animations!: Animations;

  constructor() {
    super('Play');
  }

  create() {
    console.log('Play.create()');
    this.initAnimations();
    this.initLevel();
    this.initPhysics();
  }

  update() {
    this.hero.update();
    this.spiders.forEach((spider) => spider.update());
  }

  initAnimations() {
    this.animations = new Animations(this);
  }

  initLevel() {
    this.level = new Level(this);
    this.gotoLevel(this.currentLevel);
    this.mapProps();
  }

  initPhysics() {
    this.physics.add.collider(this.hero, this.level.platforms);
    this.physics.add.collider(this.groups.spiders, this.level.platforms);
    this.physics.add.collider(this.groups.spiders, this.groups.enemyWalls);
    
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

  getAnimations(key: string) {
    return this.animations.getAnimations(key);
  }

  private mapProps() {
    const props = [
      'hero',
      'groups',
      'spiders',
    ];

    props.forEach((prop) => (this[prop] = this.level[prop]));
  }

  private gotoLevel(level) {
    this.level.loadLevel(this.cache.json.get(`level:${level}`));
  }
}
