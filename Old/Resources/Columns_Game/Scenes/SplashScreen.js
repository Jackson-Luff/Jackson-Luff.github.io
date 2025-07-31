

////
// The SplashScreen is the first
// scene to be displayed on the
// canvas. All it is, is a displayed
// photo that has the opacity
// subtracted over time.
// Once faded, change screen to
// MainMenu.
////
var SplashScreen =
{
    // Variables
    instrPanel : null,
    countDown : null,
    // Functions
    onEnter : function()
    {
        this._super();
        this.init();
    },
    init : function()
    {
        //Get canvas size
        size = cc.director.getWinSize();
        
        //Initialise count down
        this.countDown = 1500;
        
        //Initialise Panel
        this.instrPanel = CreateSprite(sInstructionBoard, size.width / 2, size.height / 2);
        
        //Add children to scene
        this.addChild( this.instrPanel );
    },
    update : function()
    {
        // Run a count down to decrease,
        // once decreased subtract opacity.
        if(this.countDown <= 0)
        {
            this.instrPanel.opacity -= 5;
            
            if(this.instrPanel.opacity <= 0)
            {
                ChangeScene( MainMenu );
            }
        }
        else
             this.countDown -= 10;
    }
};