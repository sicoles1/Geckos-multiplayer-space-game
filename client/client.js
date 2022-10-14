//// <reference path="../phaser.d.ts" />

import Phaser, { Game } from 'phaser'
import BootScene from './scenes/bootScene.js'
import GameScene from './scenes/gameScene.js'
import PurchaseScene from './scenes/purchaseScene.js'
import FullScreenEvent from './components/fullscreenEvent.js'
import HUDScene from './scenes/HUDScene.js'

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 640
  },
  scene: [BootScene, GameScene, HUDScene,PurchaseScene ]
}

window.addEventListener('load', () => {
  const game = new Game(config)
  FullScreenEvent(() => resize(game))
})
