import { Scene } from 'phaser'
import { TextButton } from '../components/textButton.js'
import { AlignGrid } from '../components/alignGrid.js'
import { Align } from '../components/align.js'
import { VirtualJoystick } from '../components/VirtualJoystick.js'

export default class PurchaseScene extends Scene {
    constructor() {
      super({ key: 'PurchaseScene'})
    }
    init(data) {
      this.channel = data.channel
      this.playerSpeed = data.playerSpeed
      this.money = data.money
      }
    
      preload(){
        this.load.image('temp', 'assets/temp.png')
        this.load.image('background', 'assets/blueBackground.png')
      }


    create(){
      this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0)
      Align.scaleToGameW(this.background, 1, this)
      this.temp = this.add.sprite(0,0,'temp');
      this.temp.setVisible(false)
      this.temp2 = this.add.sprite(0,0,'temp');
      this.temp2.setVisible(false)
      this.temp3 = this.add.sprite(0,0,'temp');
      this.temp3.setVisible(false)
      this.temp4 = this.add.sprite(0,0,'temp');
      this.temp4.setVisible(false)
      this.aGrid= new AlignGrid({
        scene: this,
        rows: 11,
        cols: 11
      });
     // this.aGrid.showNumbers();
      this.aGrid.placeAtIndex(24,this.temp)
      this.aGrid.placeAtIndex(35,this.temp2) 
      this.aGrid.placeAtIndex(71,this.temp3)   
      this.aGrid.placeAtIndex(7,this.temp4)   
    this.playerSpeedText = this.add.text(this.temp2.x, this.temp2.y, '').setOrigin(0.5);
    this.startingMoneyText = this.add.text(this.temp4.x, this.temp4.y, `Remaining money: ${this.money}.`).setOrigin(0.5);

    this.increaseSpeedButton = new TextButton(this, this.temp.x, this.temp.y, 'Increase Speed', { fill: '#0f0'}, () => this.increaseSpeed());
    this.add.existing(this.increaseSpeedButton);

    this.joinGameButton = new TextButton(this, this.temp3.x, this.temp3.y, 'Join Game', { fill: '#0f0'}, () => this.joinGame());
    this.add.existing(this.joinGameButton);

    this.updatePlayerSpeedText();
    }

    increaseSpeed() {
        const cost = 25
        if (this.money - cost < 0) {
          this.notAfford()
        } else {
        this.playerSpeed += 50;
        this.updatePlayerSpeedText();
        this.updateMoneyText(cost)
          }
      }
    
    joinGame() {
        let data = {
          channel: this.channel,
          playerSpeed: this.playerSpeed
        }
       this.scene.start('GameScene', data)
       this.scene.launch('HUDScene',  data )
      }
    
    updatePlayerSpeedText() {
        this.playerSpeedText.setText(`Current Player Speed is ${this.playerSpeed}.`);
      }
 
      notAfford(){
        this.increaseSpeedButton.visible = false;
        this.add.text(this.temp.x, this.temp.y, 'You can no longer afford this!').setOrigin(0.5);
      }

      updateMoneyText(cost){
        this.money -= cost
        this.startingMoneyText.setText(`Remaining money: ${this.money}.`)
      }
}