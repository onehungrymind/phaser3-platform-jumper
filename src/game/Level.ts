import { Play } from './Play';
export class Level {
  constructor(private scene: Play) {}

  loadLevel() {
    this.spawnBG();
  }

  spawnBG() {
    const bg = this.scene.add.image(0, 0, 'background');
    bg.setOrigin(0, 0);
  }
}