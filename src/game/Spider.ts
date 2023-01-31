import { Play } from './Play';

const SPIDER_SPEED = 100;
const enum Directions {
  left = 'left',
  right = 'right',
}

export class Spider extends Phaser.Physics.Arcade.Sprite {
  direction = Directions.right;
  dead = false;
  animations;

  constructor(scene: Play, x, y) {
    super(scene, x, y, 'spider');

    this.animations = scene.getAnimations('spider');

    this.setOrigin(0.5, 0.5);
  }

  update() {
    if (!this.dead) {
      this.live();
    }
  }

  die() {
    this.dead = true;
    this.disableBody();
    this.anims.play(this.animations.dying, true);
  }

  live() {
    if (this.body.touching.right || this.body.blocked.right) {
      this.direction = Directions.left;
    } else if (this.body.touching.left || this.body.blocked.left) {
      this.direction = Directions.right;
    }
    this.crawl(this.direction);
  }

  crawl(direction) {
    const velocity = this.getVelocity(direction);
    this.setVelocityX(velocity);
    this.anims.play(this.animations.crawl, true);
  }

  private getVelocity(direction) {
    return direction === Directions.left ? -SPIDER_SPEED : SPIDER_SPEED;
  }
}
