
////
// Touch input event handling
////

var HoriSense = 4;
var VertSense = 4;

var TouchState = 
{
    BEGAN : 0, 
    STILL : 1,
    MOVED  : 2,
    ENDED : 3,
    NONE  : 4
};

function Touch()
{
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.state = TouchState.NONE;
}

TouchInput = {};

TouchInput.touches = [];
TouchInput.listener = null;
TouchInput.scene = null;
TouchInput.vec = cc.p(0,0);

TouchInput.init = function( scene )
{
    this.listener = cc.EventListener.create(
    {
        event : cc.EventListener.TOUCH_ALL_AT_ONCE,
        swallowTouches : false,
        onTouchesBegan : TouchInput._onTouchesBegan,
        onTouchesMoved : TouchInput._onTouchesMoved,
        onTouchesEnded : TouchInput._onTouchesEnded,
        onTouchesCancelled : TouchInput._onTouchesCancelled
    });
    
    this.changeScene(scene);
};

TouchInput.changeScene = function(scene)
{
    if(this.scene !== null)
        cc.eventManager.removeListener(this.listener);
    this.scene = scene;
    cc.eventManager.addListener(this.listener, this.scene);
    this.touches = [];
};

TouchInput.update = function()
{
    for(var i in this.touches)
    {
        if( this.touches[i].state === TouchState.BEGAN ||
            this.touches[i].state === TouchState.MOVED)
        {
            this.touches[i].state = TouchState.STILL;
        }
    }
    
    this.vec = cc.p(0,0);
};

TouchInput.touchCount = function()
{
    return this.touches.length;
};

TouchInput.getTouches = function()
{
    return this.touches;
};

TouchInput.getTouch = function(id)
{
    if(this.touches[id] === undefined)
        return TouchState.NONE;
    
    return this.touches[id].state;
};

TouchInput._onTouchesBegan = function(touches)
{
    for(var i = 0; i < touches.length; ++i)
        TouchInput._updateTouch(touches[i], TouchState.BEGAN);
};

TouchInput._onTouchesMoved = function(touches)
{
    for(var i = 0; i < touches.length; ++i)
        TouchInput._updateTouch(touches[i], TouchState.MOVED);
};

TouchInput._onTouchesEnded = function(touches)
{
    for(var i = 0; i < touches.length; ++i)
        TouchInput._updateTouch(touches[i], TouchState.ENDED);
};

TouchInput._onTouchesCancelled = function(touches)
{
    for(var i = 0; i < touches.length; ++i)
        TouchInput._updateTouch(touches[i], TouchState.NONE);
};

TouchInput._updateTouch = function(touch, state)
{
    var id = touch.getID();
    if(this.touches[id] === undefined)
        this.touches[id] = new Touch();
    
    this.touches[id].x = touch.getLocationX();
    this.touches[id].y = touch.getLocationY();
    this.touches[id].dx = touch.getDelta().x;
    this.touches[id].dy = touch.getDelta().y;
    this.touches[id].state = state;
};


TouchInput.calDir = function()
{
    var touch = this.getTouches()[0];
    var deadZone = 5;
    if(touch !== undefined)
    {
        //apply touch delta coords to vector
        this.vec.x += touch.dx;
        this.vec.y += touch.dy;

        //Integer values of the vector div'd by sensitivity
        var dx = Math.floor(this.vec.x / HoriSense);
        var dy = Math.floor(this.vec.y / VertSense);

        //Always has to be greater than or less than 0
        //for obvious directional swiping
        if(dx !== 0)
        {
            if(dx > deadZone)
                return "right";
            if(dx < -deadZone)
                return "left";
        }

        //Always has to be greater than or less than 0
        //for obvious directional swiping
        if(dy !== 0)
        {
            if(dy > deadZone)
                return "up";
            
            if(dy < -deadZone)
                return "down";
        }
        
        
        return "none";
    }
    
    return "undefined, bro!";
};