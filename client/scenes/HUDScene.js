import { Scene } from 'phaser'
//import { BootScene } from './bootScene'
import { VirtualJoystick } from '../components/VirtualJoystick.js'
import { AlignGrid } from '../components/alignGrid.js'
//import axios from 'axios'
import { Align } from '../components/align.js'

export default class HUDScene extends Scene {
    constructor() {
      super({ key: 'HUDScene'})
    }
    init(data) {
      this.channel = data.channel
      this.playerSpeed = data.playerSpeed
      }

    preload(){
      this.load.image('temp', 'assets/temp.png')
    }

    create(){
      this.temp = this.add.sprite(0,0,'temp');
      this.temp.setVisible(false)
      this.aGrid= new AlignGrid({
        scene: this,
        rows: 11,
        cols: 11
      });
      //this.aGrid.showNumbers();
      this.aGrid.placeAtIndex(93,this.temp)     
      this.joystick = new VirtualJoystick(this, this.temp.x, this.temp.y, 50);

    // this.PlayerSpeed = 500;
     // this.lastAngle = 180;
    //  this.playerAngle = 180;

    // get sceneMain
    this.gameScene = this.scene.get('GameScene');
    console.log(this.playerSpeed)

    }

    update(){
        let X = this.joystick.joyX() * this.playerSpeed;
        let Y = this.joystick.joyY() * this.playerSpeed;
        this.gameScene.joyX = X
        this.gameScene.joyY = Y
        if (X>0 && Y<0) {
          this.gameScene.playerAngle = Math.atan(Y/X)*180/Math.PI +360
         } else if (X<0) {
          this.gameScene.playerAngle = Math.atan(Y/X)*180/Math.PI +180
         } else {
          this.gameScene.playerAngle = Math.atan(Y/X)*180/Math.PI
         }
         if (this.gameScene.playerAngle) {
          this.lastAngle = this.gameScene.playerAngle
          } else {
          this.gameScene.playerAngle = this.lastAngle
        }
        console.log(X)
    }
}
