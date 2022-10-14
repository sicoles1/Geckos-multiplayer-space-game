//import { Align } from "../../../client/components/align"

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, playerId, x = 200, y = 200, dummy = false) {
    super(scene, x, y, '')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.scene = scene

    this.prevX = -1
    this.prevY = -1
    this.prevAng = 270
    this.angle = 270

    this.dead = false
    this.prevDead = false

    this.playerId = playerId
    this.move = {}

    //this.setDummy(dummy)

    this.body.setSize(32, 48)

    this.prevNoMovement = true

    this.setCollideWorldBounds(true)

    scene.events.on('update', this.update, this)
  }

 /* setDummy(dummy) {
    if (dummy) {
      this.body.setBounce(1)
      this.scene.time.addEvent({
        delay: Phaser.Math.RND.integerInRange(45, 90) * 1000,
        callback: () => this.kill()
      })
    } else {
      this.body.setBounce(0)
    }
  }*/

  kill() {
    this.dead = true
    this.setActive(false)
  }

  revive(playerId, dummy) {
    this.playerId = playerId
    this.dead = false
    this.setActive(true)
   // this.setDummy(dummy)
    this.setVelocity(0)
  }

  /*setMove(data) {
    let int = parseInt(data, 36)

    let move = {
      left: int === 1 || int === 5,
      right: int === 2 || int === 6,
      up: int === 4 || int === 6 || int === 5,
      none: int === 8
    }

    this.move = move
  }*/

  setMove(data){
    this.velX = data.velX;
    this.velY = data.velY;
    this.ang = data.playerAngle;
    }
  
  update() {
    this.setVelocity(this.velX,this.velY)
    this.setAngle(this.ang)
  }

  postUpdate() { 
    this.prevX = this.x
    this.prevY = this.y
    this.prevDead = this.dead
    this.prevAng = this.angle
  }
}
