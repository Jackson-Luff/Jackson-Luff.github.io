
////
//
////
var MatchDetect = {};

// Gems that are required to move downward.
MatchDetect.heavyList = [];
MatchDetect.matchCleanUp = [];
////
// Checks for GameOver every frame
////
MatchDetect.checkForGameOver = function(t, b, m)
{
    // Loop through all cell places on the top row
    // if the gem isn't the collumn and has hit the limit
    // ... GAME OVER!
    for(var x = 0; x < gemGrid.length; x++)
    {   
        var yI = gemGrid[0].length - 3;
        
        var checkGem = gemGrid[x][yI];
                
        if( checkGem !== null
		 && checkGem !== t
		 && checkGem !== b
		 && checkGem !== m )
        {
            if(MainGame.totalScore > 0)
            {
                HighScore.scores.push( MainGame.totalScore );
                DataMan.saveData( HighScore.scores, window.localStorage, "score");
            }
           
			ChangeScene( GameOver );		}
    }
};

////
// Checks surrounding gems for a streak path
////
MatchDetect.checkSurrGems = function( inputGem )
{
    ////
    // Comparing the surrounding gems:
    // 0,0 - the origin of the inputGem
    // The rest are the index coords of 
    // the tempGem's.
    // [-1, 1][ 0, 1][ 1, 1]
    // [-1, 0][ 0, 0][ 1, 0]
    // [-1,-1][ 0,-1][ 1,-1]
    //
    // If there is a gem with the same
    // source, go through a recursive 
    // function that checks all directions
    // for the same source as the current.
    ////

    var streak = [];
    
    for(var i = -1; i <= 1; i++)
    {
        for(var j = 1; j >= -1; j--)
        {
            if(i === 0 && j === 0)
                continue;

            
            //current gem
            streak.push( inputGem );

            //check all both directions
            this.gemPathCreation(inputGem, i, j, streak); 
            this.gemPathCreation(inputGem, -i, -j, streak);

            // A successful match has been found!
            // clean up those found and apply score + streakCount
            if (streak.length >= 3)
            {
                var newStreak = false;
                
                for(var k in streak)
                {
                    if( $.inArray( streak[k], this.matchCleanUp) === -1)
                    {
                        this.matchCleanUp.push( streak[k] );
                        newStreak = true;
                    }
                }
                if(newStreak)
                {
                    var dingfx = cc.audioEngine.playEffect( sDingFx , false);
                    HighScore.applyScore(streak);
                    MainGame.streaksConfirmed += 1;
                }
            }
            
            //clear the streak for later use
            streak = [];
        }
    }
};

////
// Recursive function called to head
// down path of direction searching 
// for familiar gems.
////
MatchDetect.gemPathCreation = function(gem, i, j, streakArr)
{
    var tiX = gem.indexX + i; // temp index X
    var tiY = gem.indexY + j; // temp index Y

    if (gemGrid[tiX] !== undefined &&
        gemGrid[tiX][tiY] !== null &&
        gemGrid[tiX][tiY] !== undefined)
    {
        var tempGem = gemGrid[ tiX ][ tiY ];

        if(tempGem.uniqueSRC === gem.uniqueSRC)
        {
            streakArr.push( tempGem );
            this.gemPathCreation(tempGem, i, j, streakArr);
        }
    }
};

////
//  Animates the matched gems
////
MatchDetect.aniColour = null;
MatchDetect.animateStreak = function()
{
    this.timer += 10;
    
    for(var i in this.matchCleanUp)
    {  
        this.matchCleanUp[i].sprite.setTexture( sDefaultImg ); 
        
        if(this.timer > 100)
        {
            this.matchCleanUp[i].alive = false;
            this.timer = 0;
        }
    }
};

////
// Removal of the successful streak.
// For exery object deleted, i then get
// the x and y index and ready the one 
// above to move downward.
// Do this for ever gem and
// then clean up the array.
////
MatchDetect.timer = 0;
MatchDetect.removeMatchedGems = function()
{    
    this.animateStreak();
    
    for(var i in this.matchCleanUp)
    {
        if(this.matchCleanUp[i].alive === false)
        {
            // Make reference to current index
            // and remove it from gemGrid.  
            var iX = this.matchCleanUp[i].indexX;
            var iY = this.matchCleanUp[i].indexY;
            gemGrid[iX][iY].sprite.removeFromParent();
            gemGrid[iX][iY] = null;
            this.matchCleanUp.splice(i, 1);
            
            // Tell the gems above removed gem to 
            // get ready to move downward.
            this.readyGemMovement(iX, iY);
        }
    };
};

////
// Flags the ready gems above the 
// successful streak to move downward.
////
MatchDetect.readyGemMovement = function(aiX, aiY)
{
    BubbleSortObjArr(this.heavyList, 'indexY');

    //Temp array for current collumn
    var arr = gemGrid[aiX];
    
    for( var y = aiY + 1; y <= arr.length - 1; ++y )
    {
        //if not undefined, null or already
        //existing in heavyList: push on
        if( arr[y] !== null &&
            $.inArray( arr[y], this.heavyList) === -1 )
        {
            //Gems that need to be moved downward
            this.heavyList.push(arr[y]);
        }
    }
};

////
// I create reference indexes and remove those gems
// from the global grid from those indexes.
////
MatchDetect.checkList = [];

////
//
////
MatchDetect.moveHeavyList = function()
{
    if(MatchDetect.heavyList.length > 0)
    {
        //Sort arr from lowest to heighest
        //BubbleSortObjArr(MatchDetect.heavyList, 'indexY');
       
        for(var i in this.heavyList)
        {
            //create unique index position
            var iX = this.heavyList[i].indexX;
            var iY = this.heavyList[i].indexY;
            
            if(!this.heavyList[i].move(iX, iY - 1))
            {
                this.checkList.push(this.heavyList[i]);
                this.heavyList.splice( i, 1);
                continue;
            }
            this.heavyList[i].move(iX, iY - 1);
        }
    }
};

////
//
////
MatchDetect.checkThese = function()
{
    for(var i in this.checkList)
    {
        this.checkSurrGems( this.checkList[i], this.matchCleanUp);
        this.checkList.splice(i, 1);
    }  
};
