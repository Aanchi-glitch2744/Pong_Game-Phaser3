import Phaser from 'phaser'

class Game extends Phaser.Scene
{
    init(){
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)
    }
    preload()
    {

    }

    create()
    {
        // this.add.text(400, 250, 'Game') //check display.
        this.ball= this.add.circle(400, 250, 10, 0xffffff, 1) //create a white ball in the centre of screen
        this.physics.add.existing(this.ball) //add physics to ball
        this.ball.body.setBounce(1, 1)

        this.ball.body.setCollideWorldBounds(true, 1, 1) //Added ball bouncing capabilities off the border/bounds of screen 

        const angle = Phaser.Math.Between(0,360)
        const vec = this.physics.velocityFromAngle(angle, 200) //200 is speed

        //ball.body.setVelocity(200, 200) //set velocity for the body
        // this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200)) //randomise ball movement on screen in x and y direction.
        this.ball.body.setVelocity(vec.x, vec.y)

        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)  //add a player paddle in left side of screen.
        this.physics.add.existing(this.paddleLeft, true) //added physics so that it reacts to surroundings and ball.
        //paddleLeft.body.setBounce(1, 1) //Bounce off the body of paddle left.
        
        this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1)
        this.physics.add.existing(this.paddleRight, true)

        this.physics.add.collider(this.paddleLeft, this.ball) //react on colliding the paddle(left) with the ball.
        this.physics.add.collider(this.paddleRight, this.ball)
        this.cursors= this.input.keyboard.createCursorKeys() //Make Up and down keys //takes input from keyboard for Up Left Right Down, shapebar and shift.
        

    }

    update(){
        /** @type {Phaser.Physics.Arcade.StaticBody} */ //To tell the js that body is type of Phaser.Arcade.Body
        const body = this.paddleLeft.body

        if (this.cursors.up.isDown){
            // console.log('up pressed')
            // body.setVelocityY(-100)
            this.paddleLeft.y -= 10 //go up
            body.updateFromGameObject() //To update the physics box.

        }
        else if (this.cursors.down.isDown){
            // console.log('down pressed')
            // body.setVelocityY(100)
            this.paddleLeft.y += 10 //go down
            body.updateFromGameObject() //To update the physics box.

        }
        // else{
        //     this.paddleLeft.setVelocityY(0)
        // }
        const diff = this.ball.y - this.paddleRight.y
        // console.log(diff)
        if(Math.abs(diff) < 10){ //to make the right paddle move smoothly without jitter
            return 
        }

        const aiSpeed = 3

        if(diff< 0){
            //ball is above the paddle
            // this.paddleRight.y -= 10
            // this.paddleRight.body.updateFromGameObject()
            this.paddleRightVelocity.y = -aiSpeed
            if (this.paddleRightVelocity.y < -10){
                this.paddleRightVelocity.y = -10
            }
        }
        else if(diff > 0){
            //ball is below the paddle
            // this.paddleRight.y += 10
            // this.paddleRight.body.updateFromGameObject()
            this.paddleRightVelocity.y = aiSpeed
            if (this.paddleRightVelocity.y > 10){
                this.paddleRightVelocity.y = 10
            }
        }

        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()
    }
} 

export default Game