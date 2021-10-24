// Uses main ES6
import Phaser, { Physics } from 'phaser'
import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'
import GameBackground from './scenes/GameBackground'

const config = {     //get config codes from photostorm.github.io/phaser3-docs...
    width: 800,
    height: 500,
    type: Phaser.AUTO,  //Let phaser decide to use canvus or not a/c to the user's WebGL support.
    backgroundColor: '#d1473b',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0}, //no gravity. Try 200 and watch it fall towards -y axis.
            debug: true     //to help out in debugging
        }
    }
}

const game= new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen) //register
game.scene.add('game', Game)
game.scene.add('game-background', GameBackground)

// game.scene.start('titlescreen')    //display on screen.
game.scene.start('game')