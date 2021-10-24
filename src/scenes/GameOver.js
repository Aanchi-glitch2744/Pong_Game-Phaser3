import Phaser from 'phaser'
import { TitleScreen } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'

export default class GameOver extends Phaser.Scene
{
    /**
     * 
     * @param {{leftScore: number, rightScore: number}} data 
     */

    create(data)
    {
        let titleText =  'Game Over'
        // console.dir(data)
        if(data.leftScore > data.rightScore){
            //Player Won
            titleText = 'You Win!'
        }
        // else{
        //     //AI Won
        //     titleText = 'Computer Win!'
        // }

        this.add.text(400, 200, titleText, {
            fontFamily: PressStart2P,
            fontSize: 37
        }).setOrigin(0.5)

        this.add.text(400, 400, 'Press Space To Continue', {
            fontFamily: PressStart2P
        }).setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', ()=>{
            this.scene.start(TitleScreen)
        })
    }
}