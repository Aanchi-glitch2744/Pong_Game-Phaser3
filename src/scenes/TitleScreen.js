import Phaser from 'phaser' //Gives intelliSense feature.
import { Game } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
export default class TitleScreen extends Phaser.Scene

{
    preload()
    {

    }
    create()
    {
        const title = this.add.text(400, 200, 'Old School Tennis!',{
            fontSize: 37,
            fontFamily: PressStart2P
        })
        title.setOrigin(0.5, 0.5)

        this.add.text(400, 300, 'Press Spacebar to Start',{
            fontFamily: PressStart2P
        }).setOrigin(0.5)

        this.input.keyboard.once(`keydown-SPACE`, ()=>{ // `keydown-${Phaser.Input.Keyboard.KeyCodes.SPACE}` is equal to: 'keydown-' + Phaser.Input.Keyboard.KeyCodes.SPACE 
            // console.log('space pressed')
            this.scene.start(Game)
        })
    }
}