import Phaser from 'phaser'
import { Align } from './align.js'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, channelId, x, y) {
    super(scene, x, y, 'player')
    scene.add.existing(this)

    this.channelId = channelId
    //Align.scaleToGameW(this,0.1)

    //this.setFrame(4)
  }
}
