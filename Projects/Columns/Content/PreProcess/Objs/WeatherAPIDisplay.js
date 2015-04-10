
WeatherAPI = function(xpos, ypos)
{
    this.weathBoard = null; //Display board for objects
    this.weathImg = null;   //Displays icon depending on temp
    this.weathFont = null;  //Displays current temp
    this.checkWeath = null; //Timer for weather update
    
    //Initialise Weather Board
    this.weathBoard = CreateSprite( 
    sWeatherB,  //Source 
    xpos,ypos); //Position

    //Set default colour 
    this.colour = new cc.Color(112, 52, 30);
    
    //Initialise Weather Font
    this.weathFont = CreateFont(
    WeatherMan.temperature,//Displayed
    "Adobe Naskh Medium", 64,//Font fam, size
    xpos - 20,ypos,  // Position
    this.colour); //Colour
        
    //Initialise Weather Image
    var pos = this.weathFont.getPosition();
    this.weathImg = CreateSprite(
    sWeatherB,  //Source
    pos.x + 50, pos.y + 25); //Position
        
    //Initialise Counter
    this.checkWeath = 1000;

    //Update function
    this.update = function()
    {
        //Count down for weather update
        this.checkWeath += 10;
        if(this.checkWeath > 1000)
        {
            //Update current data every 'second'
            //Applies temp to string and img depending on temp.
            this.weathFont.setString( WeatherMan.temperature );
            this.weathImg.setTexture( WeatherMan.setForeCastImage() );
            
            //reset check time.
            this.checkWeath = 0;
        }
    };
    
    this.draw = function(scene)
    {
        //Apply drawing application
        //(Do in initialiser of scene)
        scene.addChild( this.weathBoard, 0);
        scene.addChild( this.weathFont, 0);
        scene.addChild( this.weathImg, 0);
    };
};