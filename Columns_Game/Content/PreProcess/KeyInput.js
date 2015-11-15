

// Key input event handling
KeyInput = 
{
    _pressed: {},
    _waspressed: {},
    
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    ESCAPE: 27,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    
    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    
    wasDown: function (keyCode) {
         return this._waspressed[keyCode];
     },
     
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
        this._waspressed[event.keyCode] = true;
    },
    
    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    },
    
    updateKeys: function()
    {
        this._waspressed = [];
    }
};