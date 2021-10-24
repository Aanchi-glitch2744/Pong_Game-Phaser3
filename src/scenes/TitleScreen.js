import Phaser from 'phaser' //Gives intelliSense feature.

export default class TitleScreen extends Phaser.Scene
{
    preload()
    {

    }
    create()
    {
        const text = this.add.text(400, 250, 'Hello, World!')
        text.setOrigin(0.5, 0.5)
        
    }
}