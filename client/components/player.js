import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, channelId, x, y) {
    super(scene, x, y, 'player')
    scene.add.existing(this)

    this.channelId = channelId
    this.displayWidth = 640 * 0.1;
    this.scaleY = this.scaleX;
  }

}
