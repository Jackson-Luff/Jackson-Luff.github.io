////
// Upon loading this file, start the function
// 'Run' that requests an ID (from a canvas)
// to run on.
////
window.addEventListener('load', Run("mainCanvas"));

////
// This function will read in an ID and with 
// that ID it will output the X and Y pos.
////
function ReadMouseMove(event, id)
{
    //Referencing element by ID
    var mousePos = document.getElementById(id);

    //Applying the visual approach to display
    // the current X and Y position
    mousePos.innerHTML  = "XPosition: " + event.pageX + " ";
    mousePos.innerHTML += "YPosition: " + event.pageY;
}

////
// This function applies custom functions to window commands,
// preloads a resource array so the app doesn't have to access
// url references on the fly - as well as readability and finally
// then runs the game to the canvas ID.
////
function Run(iD)
{
    var cnv = document.getElementById(iD);
    
    //Maps window key commands to custom Key functions
    cnv.addEventListener('keyup', function(event) { KeyInput.onKeyup(event); }, false);
    cnv.addEventListener('keydown', function(event) { KeyInput.onKeydown(event); }, false);
   
    //load resources
    cc.game.onStart = function() { 
        cc.LoaderScene.preload(g_resources, LoadInitialScene , this); 
    };
    
    //run game
    cc.game.run(iD);
};

////
// This function is the trigger used in Run()
// to boot up the first scene on display.
// This is also where I initialise any
// audio content so i don't have to copy over all scenes.
////
function LoadInitialScene()
{
    //Boot up audio content
    PlayMusic( sOrchestraArrivalMus, true, 1);
    PlaySoundEffect( sVariousBirdsFx, true, 0.05);
    
    //Accesses ChangeScene to load up the first scene
    ChangeScene( MainGame );
}
