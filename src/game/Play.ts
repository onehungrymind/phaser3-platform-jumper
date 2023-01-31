import { Level } from './Level';
import { Hero } from './Hero';
import { Spider } from './Spider';
import { Animations } from './Animations';

const LEVEL_COUNT = 2;

export class Play extends Phaser.Scene {
  currentLevel: integer = 1;
  level: Level;
  hero: Hero;
  key: any;
  door: any;
  keyIcon: any;
  coinIcon: any;
  spiders: Spider[];

  groups: { [key: string]: Phaser.Physics.Arcade.Group };

  scoreText: Phaser.GameObjects.BitmapText;

  score: integer = 0;
  hasKey: boolean = false;

  animations: Animations;

  constructor() {
    super('Play');
  }

  create() {
    console.log('Play.create()');
    this.initAnimations();
    this.initLevel();
    this.initCamera();
    this.initPhysics();
    this.initScore();
  }

  update() {
    this.hero.update();
    this.spiders.forEach((spider) => spider.update());

    const frame = this.hasKey ? 1 : 0;
    this.keyIcon.setFrame(frame);
  }

  initAnimations() {
    this.animations = new Animations(this);
  }

  initLevel() {
    this.level = new Level(this);

    this.gotoLevel(this.currentLevel);

    const props = [
      'hero',
      'key',
      'keyIcon',
      'coinIcon',
      'door',
      'spiders',
      'groups',
    ];

    props.forEach((prop) => (this[prop] = this.level[prop]));
  }

  initCamera() {
    this.cameras.main.setBounds(0, 0, 960, 600);
    this.cameras.main.flash();
  }

  initPhysics() {
    this.physics.add.collider(this.hero, this.level.platforms);
    this.physics.add.collider(this.groups.spiders, this.level.platforms);
    this.physics.add.collider(this.groups.spiders, this.groups.enemyWalls);

    this.physics.add.overlap(
      this.hero,
      this.groups.coins,
      this.collectCoin,
      null,
      this
    );

    this.physics.add.overlap(
      this.hero,
      this.groups.spiders,
      this.doBattle,
      null,
      this
    );

    this.physics.add.overlap(this.hero, this.key, this.collectKey, null, this);

    this.physics.add.overlap(
      this.hero,
      this.door,
      this.exitThroughDoor,
      (hero, door) => this.hasKey && hero.body.touching.down,
      this
    );
  }

  initScore() {
    this.scoreText = this.add.bitmapText(
      this.coinIcon.x + this.coinIcon.width + 5,
      15,
      'font:numbers',
      `X${this.score}`
    );
  }

  getAnimations(key: string) {
    return this.animations.getAnimations(key);
  }

  doBattle(hero, spider) {
    if (spider.body.touching.up && hero.body.touching.down) {
      this.sound.play('sfx:stomp');
      spider.die();
    } else {
      this.gameOver();
    }
  }

  exitThroughDoor(hero, door) {
    this.sound.play('sfx:door');
    this.gotoNextLevel();
  }

  collectKey(hero, key) {
    key.destroy();
    this.sound.play('sfx:key');
    this.hasKey = true;
  }

  collectCoin(hero, coin) {
    coin.destroy();
    this.sound.play('sfx:coin');
    this.score += 1;
    this.scoreText.text = `X${this.score}`;
  }

  reset() {
    this.score = 0;
    this.hasKey = false;
  }

  gotoNextLevel() {
    this.reset();
    this.currentLevel =
      this.currentLevel < LEVEL_COUNT ? ++this.currentLevel : 1;

    this.cameras.main.fade(1000);
    this.cameras.main.on('camerafadeoutcomplete', (camera, effect) => {
      this.scene.start('Play');
      this.gotoLevel(this.currentLevel);
    });
  }

  gotoLevel(level) {
    this.level.loadLevel(this.cache.json.get(`level:${level}`));
  }

  gameOver() {
    this.reset();
    this.hero.die();
    this.cameras.main.fade(1000);
    this.cameras.main.on('camerafadeoutcomplete', (camera, effect) => {
      this.scene.restart();
    });
  }
}
