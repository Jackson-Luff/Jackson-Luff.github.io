

////
// This is the MainMenu display
// that is shown right after
// the SplashScreen scene.
// 
// It has several features,
// such as:
// - Particles
// - Buttons 
// - Images
////
var MainMenu = 
{
    //Objects
    title : null,
    backTint : null,
    playButt : null,
    instrButt : null,
    highSButt : null,
    particleMan : null,
    checkWeather : null,
    weatherAPI : null,
    //Functions
    onEnter : function()
    {
        this._super();
        this.init();
    },
    init : function()
    {
        // Get size of the canvas
        size = cc.director.getWinSize();
        
        //Initialise title
        this.title = CreateSprite( sMTitle , size.width / 2, size.height / 1.2);
        
        //Initialise background tint
        this.backTint = new CreateSprite( sMBackTint,size.width/2, size.height/2);
        this.backTint.setScale(4.9, 2.9);
        
        //Initialise particle sys
        this.particleMan = new ParticleManager( 
            size.width / 2,
            size.height / 2,
            'WEATHER');
       
        //Initialise buttons 
        this.playButt = new CreateButton(
            sMPlayButt,    //firstSprite
            sMPlayButtHov, //sec--Sprite
            function()
            {
                //Scene to change to MainGame
                ChangeSceneWTrans( MainGame, 'SlideTop' ); 
            },
            0, 0,  //position
            1.0);  //scale
        
        this.highSButt = new CreateButton(
            sMHSButt,    //firstSprite
            sMHSButtHov, //sec--Sprite
            function()
            {
                //Scene to change to HighScore
                ChangeSceneWTrans( HighScore, 'SlideLeft' );
            }, 
            0, 0,  //position
            1.0);  //scale
        
        this.instrButt = new CreateButton(
            sMInstructButt,    //firstSprite
            sMInstructButtHov, //sec--Sprite
            function()
            {
                //Scene to change to Instructions
                ChangeSceneWTrans( Instructions, 'SlideRight' );  
            },
            0, 0,  //position
            1.0);  //scale
        
        //Initialise Weather API
        this.weatherAPI = new WeatherAPI(size.width/2, size.height/8);
         
        //Create menu objects to add
        var menuButtons = cc.Menu.create( this.playButt, this.highSButt, this.instrButt);
        menuButtons.alignItemsVerticallyWithPadding(size.height / 16);
        
        //Add children to scene
        this.addChild( this.backTint, 0);
        this.weatherAPI.draw(this);
        this.addChild( menuButtons );
        this.addChild( this.title );
        
        this.checkWeather = 1000;
    },
    update : function()
    {
        //Update the particles
        this.particleMan.update(this, size);
        
        //Updates Weather API
        this.weatherAPI.update();
        
        this.checkWeather += 10;
        
        //Apply colour change in tint for background
        if(this.checkWeather > 1000)
        {
            var tempColour = WeatherMan.setForeCastColour();            
            var tintTo = cc.TintTo.create(1.5, tempColour.r, tempColour.g, tempColour.b);
            this.backTint.runAction( tintTo );
            this.checkWeather = 0;
        }
    }
};
