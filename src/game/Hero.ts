import { Play } from './Play';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  keys!: Phaser.Types.Input.Keyboard.CursorKeys;
  animations!: any;
  
  constructor(scene: Play, x, y) {
    super(scene, x, y, 'hero');
    this.animations = scene.getAnimations('hero');
    this.setOrigin(0.5, 0.5);
    this.initKeys(scene);
  }

  update() {
    if (this.keys.up.isDown && this.body.touching.down) {
      this.jump();
    } else if (this.keys.left.isDown) {
      this.runLeft();
    } else if (this.keys.right.isDown) {
      this.runRight();
    } else {
      this.halt();
    }

    let animationName = this.getAnimationName();
    if (this.anims.getName() !== animationName) {
      this.anims.play(animationName);
    }
  }

  jump() {
    this.setVelocityY(-330);
    this.scene.sound.play('sfx:jump');
  }

  runRight() {
    this.setVelocityX(160);
    this.flipX = false;
  }

  runLeft() {
    this.setVelocityX(-160);
    this.flipX = true;
  }

  halt() {
    this.setVelocityX(0);
  }

  getAnimationName() {
    let name = this.animations.stop; // default animation

    if (this.body.velocity.y > 0) {
      name = this.animations.jump;
    } else if (this.body.velocity.y <= 0 && !this.body.touching.down) {
      name = this.animations.fall;
    } else if (this.body.velocity.x !== 0 && this.body.touching.down) {
      name = this.animations.run;
    }

    return name;
  }
  
  private initKeys(scene) {
    this.keys = scene.input.keyboard.createCursorKeys();
  }
}
