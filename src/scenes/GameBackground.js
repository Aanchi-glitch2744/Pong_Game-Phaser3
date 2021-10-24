import Phaser from 'phaser'
import * as Colors from '../consts/Colors'

export default class GameBackground extends Phaser.Scene
{
    preload()
    {

    }

    create()
    {
        this.add.line(400, 250, 0, 0, 0, 500, Colors.white, 1) //line in the centre.
            .setLineWidth(2.5, 2.5) //making line have similar width to circumference
        this.add.circle(400, 250, 50) //making the circle for court
            .setStrokeStyle(5, Colors.white, 1) //making the circle have only border/circumference.
    }
}