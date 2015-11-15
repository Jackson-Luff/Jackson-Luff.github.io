
////
// This is the GameOver Scene
// that is displayed when
// clicking the button in 
// MainMenu
////
var GameOver = 
{
    //Objects
    gameOverImg : null,
    timer : null,
    gem : null,
    //functions
    onEnter : function()
    {
        this._super();
        this.init();
    },
    init : function()
    {
        //Grabs size of the canvas
        size = cc.director.getWinSize();
        
        //Display 'GAME OVER' Image splash
        this.gameOverImg = CreateSprite( sGOSplash, size.width / 2, size.height / 2);
        this.addChild( this.gameOverImg, 1);
        
        // Displays gem that comes down over the 'GAME OVER' splash
        this.gem = CreateSprite( sGreenHexagonGem, size.width / 2, size.height / 2);
        
        //Specifying characterisits of the gem
        this.gem.setScale(1.3);
        var spawnPosX = (size.width / 2 ) + this.gem.width;
        var spawnPosY = size.height - this.gem.height / 2; 
        this.gem.setPosition( spawnPosX, spawnPosY );
        this.addChild( this.gem, 1);
        
        PlaySoundEffect( sApplauseFx, false, 1.0);
    },
    update : function()
    {
        //Timer increase
        this.timer += 30;
        
        //If the 'gem' is not on spot - continue until it is
        if(this.timer >= 1000 && this.gem.getPositionY() > this.gameOverImg.getPositionY())
        {
            var getCurrY = this.gem.getPositionY();
            var gemHeight = this.gem.height;
            this.gem.setPositionY( getCurrY - gemHeight);
            this.timer = 0;
        }
        
        //if the 'gem' is in position and timer is exceed change screen
        if(this.timer >= 3000 && this.gem.getPositionY() <= this.gameOverImg.getPositionY())
        {
            ChangeScene( MainMenu );
        }
    }
};