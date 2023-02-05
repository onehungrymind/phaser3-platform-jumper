import { Animations } from './Animations';
import { Hero } from './Hero';
import { Level } from './Level';
import { Spider } from './Spider';

const LEVEL_COUNT = 2;

export class Play extends Phaser.Scene {
  hero!: Hero;
  spiders!: Spider[];
  level!: Level;
  currentLevel: integer = 1;
  score: integer = 0;
  key: any;
  door: any;
  coinIcon: any;
  keyIcon: any;
  hasKey: boolean = false;
  
  scoreText!: Phaser.GameObjects.BitmapText;

  groups!: { [key: string]: Phaser.Physics.Arcade.Group };

  animations!: Animations;

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

  initScore() {
    this.scoreText = this.add.bitmapText(
      this.coinIcon.x + this.coinIcon.width + 5,
      15,
      'font:numbers',
      `X${this.score}`
    );
  }

  initAnimations() {
    this.animations = new Animations(this);
  }

  initLevel() {
    this.level = new Level(this);
    this.gotoLevel(this.currentLevel);
    this.mapProps();
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
      undefined,
      this
    );

    this.physics.add.overlap(
      this.hero,
      this.groups.spiders,
      this.doBattle,
      undefined,
      this
    );

    this.physics.add.overlap(this.hero, this.key, this.collectKey, undefined, this);

    this.physics.add.overlap(
      this.hero,
      this.door,
      this.exitThroughDoor,
      (hero, door) => this.hasKey && hero.body.touching.down,
      this
    );
  }
  
  exitThroughDoor(hero, door) {
    this.sound.play('sfx:door');
    this.gotoNextLevel();
  }

  doBattle(hero, spider) {
    if (spider.body.touching.up && hero.body.touching.down) {
      this.sound.play('sfx:stomp');
      spider.die();
    } else {
      this.gameOver();
    }
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

  getAnimations(key: string) {
    return this.animations.getAnimations(key);
  }

  reset() {
    this.score = 0;
    this.hasKey = false;
    this.cameras.main.fade(1000);
    this.cameras.main.on('camerafadeoutcomplete', (camera, effect) => {
      this.scene.start('Play');
      this.gotoLevel(this.currentLevel);
    });
  }

  gameOver() {
    this.hero.die();
    this.reset();
  }

  gotoNextLevel() {
    this.currentLevel =
      this.currentLevel < LEVEL_COUNT ? ++this.currentLevel : 1;

    this.reset();
  }

  gotoLevel(level) {
    this.level.loadLevel(this.cache.json.get(`level:${level}`));
  }

  private mapProps() {
    const props = [
      'hero',
      'groups',
      'spiders',
      'coinIcon',
      'keyIcon',
      'key',
      'door',
    ];

    props.forEach((prop) => (this[prop] = this.level[prop]));
  }
}
