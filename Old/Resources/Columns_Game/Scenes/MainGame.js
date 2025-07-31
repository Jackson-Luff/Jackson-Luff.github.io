////
// This MainGame scene is the scene 
// that is ran when clicking the 
// 'PLAY' button on the main menu.
////
var MainGame = 
{
    //Objects
    column : null,     
    backGrid : null,        
    displayHUD : null,    //masked HUD
    scoreDisplay : null,  //Displays Score
    streakCount : null,   //Displays overall matches made
    menuButt : null,
    transButt : null,
    spawnTimer : null,
    //functions
    onEnter : function()
    {
        //Won't draw without it
        this._super();
        
        //Initialise objects
        this.init();
        TouchInput.init(this);
    },
    init : function()
    {
        this.spawnTimer = 0;
        
        MainGame.totalScore = 0;
        MainGame.streaksConfirmed = 0;
        MatchDetect.heavyList = [];
        // Gather size of canvas
        size = cc.director.getWinSize();
        
        // Apply backGrid sprite array                       has to be pow of 2
        this.backGrid = new CreateGrid( size.width, size.height, 64, 64);
        this.backGrid.draw(this);
        
        // Add Display HUD
        this.displayHUD = new CreateSprite( sDisplayHUD, size.width / 2, size.height);
        var y = this.displayHUD.getPositionY() - (this.displayHUD.height / 2);
        this.displayHUD.scaleX = size.width / this.displayHUD.width;
        this.displayHUD.setPositionY( y );
        this.addChild(this.displayHUD, 1);
        
        // Fill global gemGrid array with
        // but undefined values
        PopulateGemGrid( size, this.backGrid.cellSize );
        
        // Creating the column
        this.column = new ColMan( size, this.backGrid.cellSize);
        this.column.ctor(this);
        
        //Initialise labels
        this.scoreDisplay = new CreateFont(
                "0",
                "System Bold", 32, 
                size.width / 10, size.height / 1.09,
                new cc.Color(112, 52, 30));
        
        this.streakCount = new CreateFont(
                "0",
                "Lucida Console, Monaco, monospace", 32, 
                size.width / 3, size.height / 1.09,
                new cc.Color(112, 52, 30));
                
        this.menuButt = new CreateButton(
            sMenuButt,      // First img
            sMenuButtHov,   // Secon img
            function(){ChangeSceneWTrans( MainMenu, 'SlideBot' );}, // Func to run
            size.width / 8, size.height / 2.4, // Position
            0.5); // Scale
        var menuButt = cc.Menu.create( this.menuButt );
        
        //Draw Labels
        this.addChild( menuButt, 1);
        this.addChild( this.scoreDisplay, 1);
        this.addChild( this.streakCount, 1);
    },
    update : function()
    {	
        if(this.spawnTimer > 1000)
        {
            //Movement of column 
            this.column.update(this);
        }
        else
            this.spawnTimer += 5;
        
        //Update score display 
        this.scoreDisplay.setString( "Score: " + MainGame.totalScore );
        
        //Update score display 
        this.streakCount.setString( "Streaks: " + MainGame.streaksConfirmed );
        
        //Returning to the main menu
        if(KeyInput.wasDown(KeyInput.ESCAPE))
        {
            if(MainGame.totalScore > 0)
            {
                HighScore.scores.push( MainGame.totalScore );
                DataMan.saveData( HighScore.scores, window.localStorage, "score");
            }
            
            ChangeScene( MainMenu );
        }
        
        //Do this at the bottom of your Scene update
        KeyInput.updateKeys();
        TouchInput.update();
    }
};

// Global variable for application
// of accumulated scores
MainGame.totalScore = null;
// Global variable that holds
// info about how many streaks
// the play has completed
MainGame.streaksConfirmed = null;
