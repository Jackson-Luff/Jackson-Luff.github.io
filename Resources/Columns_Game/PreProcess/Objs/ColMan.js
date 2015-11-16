

////
// ColMan (Collumn Manager) holds 3 main objects
// that are manipulated throughout the functions
// within. (For movement of the column)
////
var ColMan = function( size, cellSize )
{
    this.ctor = function(scene)
    {
        // Current gems and clean up
        this.topGem = null;
        this.midGem = null;
        this.botGem = null;
        
        // Stored next gems
        this.nxtTop = null;
        this.nxtMid = null;
        this.nxtBot = null;
        
        // Timing and size
        this.gravTimer = null;
        this.timeLimit = 1000;
        this.cellSize = cellSize;

        // Positioning
        var spawnX = Math.floor((size.width / 2) / cellSize.x);
        var spawnY = Math.floor((size.height * 1.0) / cellSize.y);
        this.spawnIndex = cc.p(spawnX, spawnY);
        
        // Initialise the spawning of a column
        this.spawnGems( scene );
    };
    
    //Generates display column
    this.genNxtCol = function(si)
    {
        this.nxtTop = new Gem(si.x, si.y, cellSize);
        this.nxtMid = new Gem(si.x, si.y + 1, cellSize);
        this.nxtBot = new Gem(si.x, si.y + 2, cellSize);
        
        this.nxtBot.sprite.setPositionY( this.nxtBot.sprite.getPositionY() - (cellSize.y * 0.15));
        this.nxtMid.sprite.setPositionY( this.nxtBot.sprite.getPositionY() - (cellSize.y * 0.5));
        this.nxtTop.sprite.setPositionY( this.nxtMid.sprite.getPositionY() - (cellSize.y * 0.5));
    };
    
    this.spawnGems = function ( scene )
    {
         //Create virtual var's to pass in for the spawn
        var si = this.spawnIndex;
        
        if(this.nxtTop !== null)
        {
            this.nxtTop.sprite.removeFromParent(0);
            this.nxtMid.sprite.removeFromParent(0);
            this.nxtBot.sprite.removeFromParent(0);
        }
        else
            this.genNxtCol(si);
        
        //Increase drop speed for the columns
        this.timeLimit -= 10;
        
        this.topGem = this.nxtTop;
        this.midGem = this.nxtMid;
        this.botGem = this.nxtBot;
        
        //Following scaling code implements sized scaling 
        //(e.g. if cellsize was 32 it would adjust each 
        // gem to half it's size (Default size is 64)
        //Top Gem Scaling
        var scaleX = cellSize.x / this.topGem.sprite.width;
        var scaleY = cellSize.y / this.topGem.sprite.height;
        this.topGem.sprite.setScale(scaleX, scaleY);
        //Mid Gem Scaling
        var scaleX = cellSize.x / this.midGem.sprite.width;
        var scaleY = cellSize.y / this.midGem.sprite.height;
        this.midGem.sprite.setScale(scaleX, scaleY);
        //Bot Gem Scaling
        var scaleX = cellSize.x / this.botGem.sprite.width;
        var scaleY = cellSize.y / this.botGem.sprite.height;
        this.botGem.sprite.setScale(scaleX, scaleY);
        
        this.topGem.sprite.setPositionY( this.topGem.sprite.getPositionY() - (cellSize.y * 0.25));
        this.midGem.sprite.setPositionY( this.midGem.sprite.getPositionY() - (cellSize.y * 0.75));
        this.botGem.sprite.setPositionY( this.botGem.sprite.getPositionY() - (cellSize.y * 0.75));
        
        this.genNxtCol(si);
        this.genNxtCol(cc.p((size.width /2.1) / cellSize.x, size.height * 0.75 / cellSize.y));
                
        this.nxtTop.sprite.setScale(0.5, 0.5);
        this.nxtMid.sprite.setScale(0.5, 0.5);
        this.nxtBot.sprite.setScale(0.5, 0.5);
        
        scene.addChild( this.topGem.sprite, 0);
        scene.addChild( this.midGem.sprite, 0);
        scene.addChild( this.botGem.sprite, 0);
        scene.addChild( this.nxtTop.sprite, 1);
        scene.addChild( this.nxtMid.sprite, 1);
        scene.addChild( this.nxtBot.sprite, 1);
        
    };
    
    this.update = function( scene )
    {
        this.gravTimer += 30;
        
        // Update gems (updates texture change)
        this.topGem.update();
        this.midGem.update();
        this.botGem.update();
        
        // Returns a string depending on touch input vector direction
        var swipeDir = TouchInput.calDir();
        
        if( KeyInput.wasDown(KeyInput.W) || swipeDir === "up")
            this.swapTextures();
        
        if( KeyInput.wasDown(KeyInput.S) || swipeDir === "down"
            || this.gravTimer > this.timeLimit )  
        {
            this.keyDownFunction(scene);
            MatchDetect.moveHeavyList(this.matchCleanUp);
            if(MatchDetect.heavyList.length >= 0)
                MatchDetect.checkThese();
            MatchDetect.checkForGameOver(this.topGem, this.midGem, this.botGem);
        }
        
        if( KeyInput.wasDown(KeyInput.A) || swipeDir === "left")
            this.keyLeftFunction();
        else if( KeyInput.wasDown(KeyInput.D) || swipeDir=== "right")
            this.keyRightFunction();
        
        // Checks for gems that need 
        // to be removed and removes them.
        MatchDetect.removeMatchedGems();
        
        TouchInput.update();
    };
    
    this.keyDownFunction = function( scene )
    {        
        if( this.topGem.indexY >= 1)
        {
            var gemBelow = gemGrid[this.topGem.indexX][this.topGem.indexY - 1];

            //if the index in the array below the top gem doesn't exist, move downward
            if(gemBelow === null)
            {
                //Move the top gem downward and update grid    
                this.topGem.move(this.topGem.indexX, this.topGem.indexY - 1);
                this.midGem.move(this.midGem.indexX, this.midGem.indexY - 1);
                this.botGem.move(this.botGem.indexX, this.botGem.indexY - 1);
            }
            else if(this.gravTimer > this.timeLimit)
            {
                PlaySoundEffect( sLandedFx, false, 1.0);
                MatchDetect.checkSurrGems( this.topGem);
                MatchDetect.checkSurrGems( this.midGem);
                MatchDetect.checkSurrGems( this.botGem);
                
                this.spawnGems( scene );
            }
            //reset timer
            this.gravTimer = 0;
        }
        if( this.topGem.indexY <= 0 && this.gravTimer > this.timeLimit / 8)
        {
            PlaySoundEffect( sLandedFx, false, 1.0);
            MatchDetect.checkSurrGems( this.topGem);
            MatchDetect.checkSurrGems( this.midGem);
            MatchDetect.checkSurrGems( this.botGem);

            this.spawnGems( scene );
            MatchDetect.checkForGameOver(this.topGem, this.midGem, this.botGem);
        }
    };
    
    this.keyLeftFunction = function()
    {
        if( this.topGem.indexX > 0)
        {
            var gemToLeftofTop = gemGrid[ this.topGem.indexX - 1][this.topGem.indexY ];
            var gemToLeftofMid = gemGrid[ this.midGem.indexX - 1][this.midGem.indexY ];
            var gemToLeftofBot = gemGrid[ this.botGem.indexX - 1][this.botGem.indexY ];
            
            if( gemToLeftofTop === null &&
                gemToLeftofMid === null &&
                gemToLeftofBot === null)
            {
                //Move the gems to the left
                this.topGem.move(this.topGem.indexX - 1, this.topGem.indexY);
                this.midGem.move(this.midGem.indexX - 1, this.midGem.indexY);
                this.botGem.move(this.botGem.indexX - 1, this.botGem.indexY);
            }
        }

    };
    
    this.keyRightFunction = function()
    {
        if( this.topGem.indexX < (size.width - cellSize.x) / cellSize.x)
        {
            var gemToRightofTop = gemGrid[ this.topGem.indexX + 1][this.topGem.indexY ];
            var gemToRightofMid = gemGrid[ this.midGem.indexX + 1][this.midGem.indexY ];
            var gemToRightofBot = gemGrid[ this.botGem.indexX + 1][this.botGem.indexY ];
            
            if( gemToRightofTop === null &&
                gemToRightofMid === null &&
                gemToRightofBot === null)
            {
                //moving to the right 
                this.topGem.move(this.topGem.indexX + 1, this.topGem.indexY);
                this.midGem.move(this.midGem.indexX + 1, this.midGem.indexY);
                this.botGem.move(this.botGem.indexX + 1, this.botGem.indexY);
            }
        }
    };
    
    this.swapTextures = function()
    {
        var sfxID = cc.audioEngine.playEffect( sCycleFx , false);
        
        var firstSRC = this.topGem.uniqueSRC;
        var secSRC   = this.midGem.uniqueSRC;
        var thirdSRC = this.botGem.uniqueSRC;
        
        this.topGem.uniqueSRC = thirdSRC;
        this.midGem.uniqueSRC = firstSRC;
        this.botGem.uniqueSRC = secSRC;
    };
};