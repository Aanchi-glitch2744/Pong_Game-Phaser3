import Phaser from 'phaser'
import { TitleScreen } from '../consts/SceneKeys'
import WebFontFile from './WebFontFile'
import * as AudioKeys from '../consts/AudioKeys'

export default class Preload extends Phaser.Scene
{
    preload()   //Uses webfontloader
    {
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
        this.load.audio(AudioKeys.PongBeep, 'assets/beep.wav')
        this.load.audio(AudioKeys.PongPlop, 'assets/plop.wav')
    }
    create()
    {
        this.scene.start(TitleScreen)
    }
}