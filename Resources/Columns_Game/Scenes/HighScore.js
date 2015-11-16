

////
// This is the HighScore Scene 
// this screen displays the 
// table of the top 5 highest scores
////
var HighScore =
{
    //Objects
    hSboard : null,
    exitButt : null,
    clearButt : null,
    clearedMsgMan : null,
    legendStr : [],
    displayScores : [],
    //functions
    onEnter : function()
    {
        this._super();
        this.init();
        HighScore.refreshScores(this);
    },
    init : function()
    {
        for(var i in this.legendStr)
        {
            this.legendStr[i].removeFromParent(0);
        }
        
        //Access size of canvas
        size = cc.director.getWinSize();
        
        //Initialise high score board and draw it
        this.hSboard = CreateSprite( 
            sHSBoard, //Source
            size.width / 2, size.height / 2); //Position
        
        //Initialise message particle manager
        this.clearedMsgMan = new ParticleManager( 
            size.width / 2,
            size.height / 2,
            'FONT');
        
        //Initialise buttons
        this.exitButt = CreateButton(
            sIExitButt,    //firstSprite
            sIExitButtHov, //sec--Sprite
            function(){ChangeSceneWTrans( MainMenu, 'SlideRight' );}, //Scene to change to
            size.width / 4.8, size.height / 3,  //position
            0.5);   //scale
            
        this.clearButt = CreateButton(
            SHSClearButt,    //firstSprite
            SHSClearedButt, //sec--Sprite
            function(){ }, //Scene to change to
            0, -(size.height / 2.5), //position
            1.0);   //scale
       
        for(var i = 10; i >= 1; i--)
        {
            this.legendStr.push( CreateFont( 
                i + "). ",      //What to display
                "Arial", 24,    //Font fam, size
                size.width / 2.2, (size.height / 1.4) - (32 *i), // position
                new cc.Color(112, 52, 30))); //Colour 
        }
       
        //Apply children to screen
        this.addChild( this.hSboard, 0 );
        this.addChild( cc.Menu.create( this.exitButt, this.clearButt ), 0);
        
        for(i in this.legendStr)
        {
            this.addChild(this.legendStr[i], 0);
        }
    },
    update : function()
    {
        this.clearedMsgMan.update(this, size);
        
        if(this.clearButt.isSelected())
        {
            this.clearedMsgMan.AddParticle(this, new CreateFont( 
                "Local Storage cleared.", //What to display
                "Arial", 36,     // font fam, size
                size.width/2, size.height/2, //position
                new cc.Color(255, 255, 255, 255) )); //Colour
                
            HighScore.clearScores(this);
            this.clearButt.unselected();
        }
    }
};

////
// This is the scoped global array that 
// holds the array of scores.
// [e.g. contents are "int's"]]
////

HighScore.scores = [];

////
// 'ApplyScore' will calculate the
//  output score.
////
HighScore.applyScore = function(streakArr)
{
    // 'baseScore' is the default score
    // assigned to every gem in the streak.
    // (e.g 3 gems = 150 points)
    var baseScore = 50;
    var score = null;
    var comboScore = null;
    
    for(var i in streakArr )
    {
        score += baseScore;
        
        //Apply combo!
        if(streakArr.length > 3)
        {
            comboScore = baseScore * (i + 1);
            score += comboScore;
        }
    }
    
    MainGame.totalScore += score;
};
    
HighScore.refreshScores = function(scene)
{
    //Remove previously drawn data
    for(var i in this.displayScores)
    {
        this.displayScores[i].removeFromParent(0);
    }
    
    //Fill up to 5 places (TOP 5 shown)
    HighScore.scores = [];
    this.displayScores = [];
    
    //Load in the scores
    DataMan.loadData( HighScore.scores, window.localStorage );
    
    //Sort Displayed Scored
    BubbleSort(HighScore.scores);
    
    //Apply high scores:
    for(var i = 0; i < 10; i++)
    {
        var fontRef = CreateFont( 
            "0",            //What to display
            "Arial", 24,    //Font fam, size
            size.width / 2, (size.height / 1.485) - (32 *i), // position
            new cc.Color(112, 52, 30) ); //Colour
        
        //if the score exists
        if( HighScore.scores[i] !== undefined 
            && HighScore.scores[i] !== null)
        {
            fontRef.setString(HighScore.scores[i]);
            this.displayScores.push(fontRef);
        }
        else //else apply 'null'
        {
            fontRef.setString("-");
            this.displayScores.push(fontRef);
        }
    }
    
    for(var i in this.displayScores)
    {
        scene.addChild( this.displayScores[i], 0);
    }
};

HighScore.clearScores = function(scene)
{
    window.localStorage.clear();
    HighScore.refreshScores(scene);
};