export class Animations {
  map = {
    spider: {
      crawl: 'spider:crawl',
    },
    hero: {
      stop: 'hero:stop',
      run: 'hero:run',
      jump: 'hero:jump',
      fall: 'hero:fall',
      dying: 'hero:dying',
    },
    elements: {
      coin: {
        rotate: 'coin:rotate',
      },
    },
  };

  constructor(scene: Phaser.Scene) {
    this.initAnimations(scene);
  }

  getAnimations(key: string) {
    return this.map[key];
  }

  initAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: 'spider:crawl',
      frames: scene.anims.generateFrameNumbers('spider', {
        frames: [0, 1, 2],
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: 'hero:stop',
      frames: [{ key: 'hero', frame: 0 }],
    });

    scene.anims.create({
      key: 'hero:run',
      frames: scene.anims.generateFrameNumbers('hero', { start: 1, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: 'hero:jump',
      frames: [{ key: 'hero', frame: 3 }],
    });

    scene.anims.create({
      key: 'hero:fall',
      frames: [{ key: 'hero', frame: 4 }],
    });

    scene.anims.create({
      key: 'hero:dying',
      frames: scene.anims.generateFrameNumbers('hero', { start: 5, end: 6 }),
      frameRate: 12,
      repeat: 4,
    });

    scene.anims.create({
      key: 'coin:rotate',
      frames: scene.anims.generateFrameNumbers('coin', {
        frames: [0, 1, 2, 1],
      }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
