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
      this.lastAngle = 0;
      this.playerAngle = 0;
      this.temp = this.add.sprite(0,0,'temp');
      this.temp.setVisible(false)
      this.aGrid= new AlignGrid({
        scene: this,
        rows: 11,
        cols: 11
      });
      //this.aGrid.showNumbers();
      this.aGrid.placeAtIndex(93,this.temp)     
      this.joystick = new VirtualJoystick(this, this.temp.x, this.temp.y, 50,this.channel);
    }

    update(){

    }
}
