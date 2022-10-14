import Phaser from 'phaser'

export class VirtualJoystick {
    /**
     * @param {Phaser.Scene} scene Scene to add the virtual joystick to
     * @param {number} x Coordinates to place the virtual joystick
     * @param {number} y 
     * @param {number} radius The radius of the outer circle of the joystick
     * @param {{base: number, stick: number, alpha: number}} colorConfig Object
     * that is used to configure the color of the base and stick, and
     * transparency of the overall joystick object
     */
    constructor(scene, x, y, radius, channel, colorConfig) {
        // Base variables
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.playerAngle = 0
        this.lastAngle = 0
        this.channel = channel
        this.colorConfig = colorConfig || {
            base: 0xFFFFFF,
            stick: 0xFF0000,
            alpha: 0.4
        }
        scene.events.on('update',this.update, this)
        // Outer circle, part that doesn't move
        this.base = scene.add.circle(x, y, radius, this.colorConfig.base, this.colorConfig.alpha);

        // Joystick circle
        this.stick = scene.add.circle(x, y, .45 * radius, this.colorConfig.stick, this.colorConfig.alpha);
     //   console.log(this.stick.x)
     //   console.log(this.stick.y)

        // Make the stick draggable
        this.stick.setInteractive({ draggable: true });
        scene.input.setDraggable(this.stick);

        // Handle dragging the stick
        scene.input.on('drag', (_, stick, dragX, dragY) => {
            this.dragStick(stick, dragX, dragY);
        });
        scene.input.on('dragend', (_, stick) => {
            this.resetStick(stick);
        });
    }

    /**
     * @returns Value ranging from -1 to 1 representing how far the stick is in
     * the X direction
     */
    joyX(){
        return (this.stick.x - this.x) / this.radius;
    }

    /**
     * @returns Value ranging from -1 to 1 representing how far the stick is in
     * the Y direction
     */
    joyY(){
        return (this.stick.y - this.y) / this.radius;
    }

    /**
     * Attempts to drag the stick to a given position, but restricts it based on radius
     * @param {Phaser.GameObjects.Arc} stick The game object representing the stick
     * @param {number} dragX X position being dragged to
     * @param {number} dragY Y position being dragged to
     */
    dragStick(stick, dragX, dragY) {
        // Get the distance from center to drag point
        let dist = Phaser.Math.Distance.Between(this.x, this.y, dragX, dragY);
        // If we aren't outside the radius, move the stick to that position
        if (dist < this.radius) {
            stick.x = dragX;
            stick.y = dragY;
        }
        // If we are outside the radius, move the stick towards the pointer but not on it
        else {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, dragX, dragY);
            let xRadius = Math.cos(angle) * this.radius;
            let yRadius = Math.sin(angle) * this.radius;
            stick.x = this.x + xRadius;
            stick.y = this.y + yRadius;
        }
    }

    /**
     * Reset's the sticks position to the center
     * @param {Phaser.GameObjects.Arc} stick The game object representing the stick
     */
    resetStick(stick) {
        stick.setPosition(this.x, this.y);
    }

    update(){
        let X = this.joyX() * 250;
        let Y = this.joyY() * 250;
        if (X>0 && Y<0) {
          this.playerAngle = Math.atan(Y/X)*180/Math.PI +360
         } else if (X<0) {
          this.playerAngle = Math.atan(Y/X)*180/Math.PI +180
         } else {
          this.playerAngle = Math.atan(Y/X)*180/Math.PI
         }
         if (this.playerAngle) {
          this.lastAngle = this.playerAngle
          } else {
          this.playerAngle = this.lastAngle
        }
        let playerData = {
          velX: X,
          velY: Y,
          playerAngle: this.playerAngle
        }
        this.channel.emit('playerMove', playerData)
    }
}