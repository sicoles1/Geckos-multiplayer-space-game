import { Scene } from 'phaser'
import { TextButton } from '../components/textButton.js'

export default class PurchaseScene extends Scene {
    constructor() {
      super({ key: 'PurchaseScene'})
    }
    init(data) {
      this.channel = data.channel
      this.playerSpeed = data.playerSpeed
    }
    create(){
    //this.scene.setVisible(false,'HUDScene')
    this.playerSpeedText = this.add.text(100, 200, '');

    this.increaseSpeedButton = new TextButton(this, 100, 100, 'Increase Speed', { fill: '#0f0'}, () => this.increaseSpeed());
    this.add.existing(this.increaseSpeedButton);

    this.joinGameButton = new TextButton(this, 100, 150, 'Join Game', { fill: '#0f0'}, () => this.joinGame());
    this.add.existing(this.joinGameButton);

    this.updatePlayerSpeedText();
    }

    increaseSpeed() {
        this.playerSpeed += 50;
        this.updatePlayerSpeedText();
      }
    
      joinGame() {
        let data = {
          channel: this.channel,
          playerSpeed: this.playerSpeed
        }
       // this.scene.setVisible(true,'HUDScene')
      // this.scene.start('HUDScene',data)
        //this.scene.remove('PurchaseScene')
      }
    
      updatePlayerSpeedText() {
        this.playerSpeedText.setText(`Current Player Speed is ${this.playerSpeed}.`);
      }
    
}