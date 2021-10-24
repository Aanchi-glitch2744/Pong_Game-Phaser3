import Phaser from 'phaser'
import { GameBackground, GameOver } from '../consts/SceneKeys'
import * as Colors from '../consts/Colors'
import { PressStart2P } from '../consts/Fonts'


const GameState = {
    Running: 'running',
    PlayerWon: 'player-won',
    AIWon: 'ai-won'
}

class Game extends Phaser.Scene
{
    init(){
        this.gameState = GameState.Running
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0)

        this.leftScore = 0
        this.rightScore = 0

        this.paused = false
    }
     //preload()

    create()
    {
        this.scene.run(GameBackground)
        this.scene.sendToBack(GameBackground) //make the background appear in the backside.

        this.physics.world.setBounds(-100, 0, 1000, 500)

       
        this.ball= this.add.circle(400, 250, 10, Colors.white, 1) //create a white ball in the centre of screen
        this.physics.add.existing(this.ball) //add physics to ball
        this.ball.body.setCircle(10)     //to make the reacting physics be in circle of radius 10, i.e. same as ball.
        this.ball.body.setBounce(1, 1)

        this.ball.body.setCollideWorldBounds(true, 1, 1) //Added ball bouncing capabilities off the border/bounds of screen 

        // this.resetBall() //was here, moving to save from resetting without time when TitleScreen goes off.

        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, Colors.white, 1)  //add a player paddle in left side of screen.
        this.physics.add.existing(this.paddleLeft, true) //added physics to surroundings and ball.
        
        
        this.paddleRight = this.add.rectangle(750, 250, 30, 100, Colors.white, 1)
        this.physics.add.existing(this.paddleRight, true)

        this.physics.add.collider(this.paddleLeft, this.ball) //react on colliding the paddle(left) with the ball.
        this.physics.add.collider(this.paddleRight, this.ball)
        
        const scoreStyle =  {
            fontSize: 48,
            fontFamily: PressStart2P //use both quites if there is a spacing in font name.
        }
        this.leftScoreLabel = this.add.text(300, 125, '0', scoreStyle) //Adding score
            .setOrigin(0.5, 0.5) 
        this.rightScoreLabel = this.add.text(500, 375, '0', scoreStyle)
        .setOrigin(0.5, 0.5)

        this.cursors= this.input.keyboard.createCursorKeys() //Make Up and down keys.
        
        this.time.delayedCall(1500, ()=> {
            this.resetBall()   //restes screen after 1500 seconds.
        })
    }

    update(){
        if(this.paused || this.gameState !== GameState.Running){  //don't do anyting if pause is returned
            return
        }
        //player key input logic was here
        this.processPlayerInput()
        // ai logic was here. Logic that computer's paddle right always hits the ball.
        this.updateAI()
        //scoring logic was here
        this.checkScore()
    }

    processPlayerInput()
    {
        /** @type {Phaser.Physics.Arcade.StaticBody} */ //To tell the js that body is type of Phaser.Arcade.Body
        const body = this.paddleLeft.body

        if (this.cursors.up.isDown){
            this.paddleLeft.y -= 10 //go up
            body.updateFromGameObject() //To update the physics box.

        }
        else if (this.cursors.down.isDown){
            this.paddleLeft.y += 10 //go down
            body.updateFromGameObject() 

        }
    }

    updateAI()
    {
        const diff = this.ball.y - this.paddleRight.y
        if(Math.abs(diff) < 10){ //to make the right paddle move smoothly without jitter //don't return anything
            return 
        }

        const aiSpeed = 3

        if(diff< 0){
            //ball is above the paddle
            this.paddleRightVelocity.y = -aiSpeed
            if (this.paddleRightVelocity.y < -10){
                this.paddleRightVelocity.y = -10
            }
        }
        else if(diff > 0){
            //ball is below the paddle
            this.paddleRightVelocity.y = aiSpeed
            if (this.paddleRightVelocity.y > 10){
                this.paddleRightVelocity.y = 10
            }
        }

        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()
    }

        checkScore()
        {
            const x = this.ball.x
            const leftBounds = -30
            const rightBounds = 830
            if (x >= leftBounds && x <= rightBounds){
                return
            }
            
            if(this.ball.x < leftBounds){
                //scored on the left side
                // this.resetBall()
                this.incrementRightScore()
            }
            else if(this.ball.x > rightBounds){
                //scored on the right side
                // this.resetBall()
                this.incrementLeftScore()
            }

            const maxScore = 7 
            if (this.leftScore >= maxScore)
            {
                //Player won.
                // this.paused = true
                this.gameState = GameState.PlayerWon
            }
            else if (this.rightScore >= maxScore)
            {
                //AI won.
                // this.paused = true
                this.gameState = GameState.AIWon
            }

            // if(!this.paused){
            //     this.resetBall()
            // }
            if(this.gameState === GameState.Running){
                this.resetBall()
            }
            else {
                this.ball.active = false
                this.physics.world.remove(this.ball.body)

                this.scene.stop(GameBackground)
                //show the win/game over screen
                this.scene.start(GameOver, {
                    leftScore: this.leftScore,
                    rightScore: this.rightScore

                })


            }
        }

    incrementLeftScore()
    {
        this.leftScore +=1
        // this.leftScoreLabel.text = 'Score: ' + this.leftScore
        this.leftScoreLabel.text = this.leftScore
    }

    incrementRightScore()  //This will actually never happen as the ball and right paddle are moving in same y-axis scale.
    {
        this.rightScore +=1
        // this.rightScoreLabel.text = 'Score: ' + this.rightScore
        this.rightScoreLabel.text = this.rightScore
    }

    resetBall()   //When paddle loses the baal, the ball rests on center to begin new game.
    {
        this.ball.setPosition(400, 250)
        const angle = Phaser.Math.Between(0,360)
        const vec = this.physics.velocityFromAngle(angle, 300) //200 is original speed. reset to 300 to make computer able to lose.
        this.ball.body.setVelocity(vec.x, vec.y)
    }
} 

export default Game