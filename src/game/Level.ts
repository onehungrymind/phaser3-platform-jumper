import { Hero } from './Hero';
import { Play } from './Play';
import { Spider } from './Spider';
export class Level {
  hero!: Hero;
  spiders: Spider[] = [];
  coinIcon: any;
  keyIcon: any;
  key: any;

  platforms!: Phaser.Physics.Arcade.StaticGroup;
  groups!: { [key: string]: Phaser.Physics.Arcade.Group };
  
  animations!: any;

  constructor(private scene: Play) {
    this.animations = this.scene.getAnimations('elements');
    this.platforms = this.scene.physics.add.staticGroup();
    this.groups = {
      players: this.scene.physics.add.group(),
      coins: this.scene.physics.add.group({ allowGravity: false }),
      spiders: this.scene.physics.add.group(),
      enemyWalls: this.scene.physics.add.group({
        allowGravity: false,
        immovable: true,
      }),
      hud: this.scene.physics.add.group({ allowGravity: false }),
      bgDecoration: this.scene.physics.add.group(),
    };
  }

  loadLevel(data) {
    this.spawnBG();
    this.spawnPlatforms(data.platforms);
    this.spawnHero(data.hero);
    this.spawnCoins(data.coins);
    this.spawnSpiders(data.spiders);
    this.spawnEnemyWalls(data.platforms);
    this.spawnKey(data.key);
    this.spawnHUD();
  }

  spawnKey(key) {
    this.key = this.groups.bgDecoration.create(key.x, key.y, 'key');
    this.key.setOrigin(0.5, 0.5);
    this.key.body.allowGravity = false;
    this.key.y -= 3;

    this.scene.tweens.add({
      targets: this.key,
      y: this.key.y + 6,
      duration: 500,
      yoyo: true,
      loop: -1,
      ease: 'Sine.easeInOut',
      delay: 1000,
    });

    this.addPhysics(this.key);
  }

  spawnHUD() {
    this.spawnKeyIcon();
    this.spawnCoinIcon();
    this.spawnScoreText();
  }

  spawnKeyIcon() {
    this.keyIcon = this.scene.add.image(0, 0, 'icon:key');
    this.keyIcon.setOrigin(0, 0);
    this.keyIcon.setPosition(5, 15);
    this.groups.hud.add(this.keyIcon);
  }

  spawnCoinIcon() {
    this.coinIcon = this.scene.add.image(0, 0, 'icon:coin');
    this.coinIcon.setOrigin(0, 0);
    this.coinIcon.setPosition(this.keyIcon.x + this.keyIcon.width + 10, 10);
    this.groups.hud.add(this.coinIcon);
  }

  spawnScoreText() {
    const config = {
      image: 'font:numbers',
      width: 20,
      height: 26,
      chars: '0123456789X ',
      'offset.x': 0,
      'offset.y': 0,
      charsPerRow: 6,
      'spacing.x': 0,
      'spacing.y': 0,
      lineSpacing: 1,
    };

    this.scene.cache.bitmapFont.add(
      'font:numbers',
      Phaser.GameObjects.RetroFont.Parse(this.scene, config)
    );
  }

  spawnEnemyWalls(platforms) {
    platforms.forEach((platform) => {
      const left = this.spawnEnemyWall(platform.x, platform.y, 'left');
      const right = this.spawnEnemyWall(
        platform.x + platform.width,
        platform.y,
        'right'
      );
    });
  }

  spawnEnemyWall(x, y, side) {
    const wall = this.groups.enemyWalls.create(x, y, 'invisible-wall');
    wall.setOrigin(side === 'left' ? 1 : 0, 1);
    wall.visible = false;
  }

  spawnSpiders(spiders) {
    spiders.forEach((spider) => {
      const _spider = new Spider(this.scene, spider.x, spider.y);
      this.groups.spiders.add(_spider, true);
      this.spiders = [...this.spiders, _spider];
      _spider.setCollideWorldBounds(true);
    });
  }

  spawnCoins(coins) {
    coins.forEach((coin) => {
      const _coin = this.spawnCoin(coin);
      this.groups.coins.add(_coin, true);
    });
  }

  spawnCoin(coin) {
    const _coin = this.scene.add.sprite(coin.x, coin.y, 'coin');
    _coin.setOrigin(0.5, 0.5);
    _coin.anims.play(this.animations.coin.rotate, true);
    return _coin;
  }

  spawnHero(hero) {
    this.hero = new Hero(this.scene, hero.x, hero.y);
    this.groups.players.add(this.hero, true);

    // Now that hero has been added to the scene...
    this.hero.setBounce(0.3);
    this.hero.setCollideWorldBounds(true);
  }

  spawnPlatforms(platforms) {
    platforms.forEach((platform) => {
      const _platform = this.spawnPlatform(platform);
      this.platforms.add(_platform);
    });
  }

  spawnPlatform(platform) {
    const _platform = this.scene.add.sprite(
      platform.x,
      platform.y,
      platform.image
    );
    _platform.setOrigin(0, 0);
    return _platform;
  }

  spawnBG() {
    const bg = this.scene.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);
  }

  addPhysics(gameObject, isStatic?) {
    this.scene.physics.add.existing(gameObject, isStatic);
  }
}