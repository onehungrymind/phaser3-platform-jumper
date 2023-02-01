import { Play } from './Play';
export class Level {
  platforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor(private scene: Play) {
    this.platforms = this.scene.physics.add.staticGroup();
  }

  loadLevel(data) {
    this.spawnBG();
        
    this.spawnPlatforms(data.platforms);
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