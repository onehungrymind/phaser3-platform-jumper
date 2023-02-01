export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    console.log('Boot.preload()');
  }

  create() {
    console.log('Boot.create()');
    this.scene.start('Play');
  }
}