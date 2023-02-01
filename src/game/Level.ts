import { Hero } from './Hero';
import { Play } from './Play';
export class Level {
  hero!: Hero;
  platforms!: Phaser.Physics.Arcade.StaticGroup;
  groups!: { [key: string]: Phaser.Physics.Arcade.Group };

  constructor(private scene: Play) {
    this.platforms = this.scene.physics.add.staticGroup();
    this.groups = {
      players: this.scene.physics.add.group(),
    };
  }

  loadLevel(data) {
    this.spawnBG();
    this.spawnPlatforms(data.platforms);
    this.spawnHero(data.hero);  
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