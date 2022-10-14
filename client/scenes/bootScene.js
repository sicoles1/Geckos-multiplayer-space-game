import { Scene } from 'phaser'
import geckos from '@geckos.io/client'
import { AlignGrid } from '../components/alignGrid.js'

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })

    const channel = geckos({ port: 1444 })

    channel.onConnect(error => {
      if (error) console.error(error.message)
      let data = {
        channel: channel,
        playerSpeed: 250,
        money: 100
      }
      channel.on('ready', () => {
       // this.scene.start('GameScene', data)
       // this.scene.launch('HUDScene',  data )
        this.scene.start('PurchaseScene', data)
      })
    })
  }
 
}
