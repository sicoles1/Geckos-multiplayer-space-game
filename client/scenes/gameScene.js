import { Scene } from 'phaser'
import axios from 'axios'
import Player from '../components/player.js'
//import Cursors from '../components/cursors.js'
//import Controls from '../components/controls.js'
import FullscreenButton from '../components/fullscreenButton.js'
import { Align } from '../components/align.js'
import { VirtualJoystick } from '../components/VirtualJoystick.js'
import { AlignGrid } from '../components/alignGrid.js'

export default class GameScene extends Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.objects = {}
    this.playerId
    this.joyX
    this.joyY
    this.playerAngle = 0
    this.lastAngle = 0
  }

  init(data) {
    this.channel = data.channel
  }

  preload() {
    //this.load.image('controls', 'assets/controls.png')
    this.load.spritesheet('fullscreen', 'assets/fullscreen.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.image('player', 'assets/BlueShip.png')
    this.load.image('background', 'assets/blueBackground.png')
  }

  async create() {
    this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0)
    Align.scaleToGameW(this.background, 1, this)

    // new Cursors(this, this.channel)
    // new Controls(this, this.channel)

    FullscreenButton(this)

    const parseUpdates = updates => {
      if (typeof updates === undefined || updates === '') return []

      // parse
      let u = updates.split(',')
      u.pop()

      let u2 = []

      u.forEach((el, i) => {
        if (i % 4 === 0) {
          u2.push({
            playerId: u[i + 0],
            x: parseInt(u[i + 1], 36),
            y: parseInt(u[i + 2], 36),
            dead: parseInt(u[i + 3]) === 1 ? true : false,
            ang: parseInt(u[i + 4], 36)
          })
        }
      })
      return u2
    }

    const updatesHandler = updates => {
      updates.forEach(gameObject => {
        const { playerId, x, y, dead, ang } = gameObject
        const alpha = dead ? 0 : 1

        if (Object.keys(this.objects).includes(playerId)) {
          // if the gameObject does already exist,
          // update the gameObject
          let sprite = this.objects[playerId].sprite
          sprite.setAlpha(alpha)
          sprite.setPosition(x, y)
          sprite.angle = ang
        } else {
          // if the gameObject does NOT exist,
          // create a new gameObject
          let newGameObject = {
            sprite: new Player(this, playerId, x || 200, y || 200),
            playerId: playerId
          }
          newGameObject.sprite.setAlpha(alpha)
          this.objects = { ...this.objects, [playerId]: newGameObject }
        }
      })
    }

    this.channel.on('updateObjects', updates => {
      let parsedUpdates = parseUpdates(updates[0])
      updatesHandler(parsedUpdates)
    })

    this.channel.on('removePlayer', playerId => {
      try {
        this.objects[playerId].sprite.destroy()
        delete this.objects[playerId]
      } catch (error) {
        console.error(error.message)
      }
    })

    try {
      let res = await axios.get(`${location.protocol}//${location.hostname}:1444/getState`)

      let parsedUpdates = parseUpdates(res.data.state)
      updatesHandler(parsedUpdates)

      this.channel.on('getId', playerId36 => {
        this.playerId = parseInt(playerId36, 36)
        this.channel.emit('addPlayer')
      })

      this.channel.emit('getId')
    } catch (error) {
      console.error(error.message)
    }
  }

  update() {

  }
}
