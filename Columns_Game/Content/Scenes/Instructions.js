

////
// This is the instructions Scene.
// 
// This is the scene displayed 
// when clicking the 'instructions'
// button on the main menu. 
// 
// This is also displayed on the 
// SplashScreen scene but people
// may not have realise and thus
// this is now a thing.
////
var Instructions = 
{
    // Variables
    instrBoard : null,
    tintBack : null,
    exitButt : null,
    // Functions
    onEnter : function()
    {
        this._super();
        this.init();
    },
    init : function()
    {
        //Gets the canvas size
        size = cc.director.getWinSize();
        
        //Initialise instruction panel
        this.instrBoard = CreateSprite(sInstructionBoard, size.width / 2, size.height / 2);
        
        //Initialise exit button
        this.exitButt = CreateButton(
            sIExitButt,    //firstSprite
            sIExitButtHov, //sec--Sprite
            function(){ChangeSceneWTrans( MainMenu, 'SlideLeft' );},      //Scene to change to
            size.width / 3.5, size.height / 3, //position
            0.5);   //scale
            
        //Draw children to scene
        this.addChild( this.instrBoard, 0);
        this.addChild( cc.Menu.create( this.exitButt ), 0 );
    }
};