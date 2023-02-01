export class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    console.log('Boot.preload()');

    this.load.setCORS('crossOrigin');
    this.load.setBaseURL('https://ninja-code-club.s3.us-west-1.amazonaws.com/');

    this.load.image('background', 'images/background.png');
  }

  create() {
    console.log('Boot.create()');
    this.scene.start('Play');
  }
}