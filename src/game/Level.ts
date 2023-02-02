import { Hero } from './Hero';
import { Play } from './Play';
import { Spider } from './Spider';
export class Level {
  hero!: Hero;
  platforms!: Phaser.Physics.Arcade.StaticGroup;
  groups!: { [key: string]: Phaser.Physics.Arcade.Group };
  spiders: Spider[] = [];

  constructor(private scene: Play) {
    this.platforms = this.scene.physics.add.staticGroup();
    this.groups = {
      players: this.scene.physics.add.group(),
      coins: this.scene.physics.add.group({ allowGravity: false }),
      spiders: this.scene.physics.add.group(),
      enemyWalls: this.scene.physics.add.group({
        allowGravity: false,
        immovable: true,
      }),
    };
  }

  loadLevel(data) {
    this.spawnBG();
    this.spawnPlatforms(data.platforms);
    this.spawnHero(data.hero);
    this.spawnCoins(data.coins);
    this.spawnSpiders(data.spiders);
    this.spawnEnemyWalls(data.platforms);
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
}