
////
// Resizing canvas depending on window size
////
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('load', resizeCanvas, false);

function resizeCanvas() {

    var canvas = document.getElementById('mainCanvas');
    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = ((window.innerHeight) / window.innerWidth);
    var width;
    var height;

    if (windowRatio < canvasRatio) {
        height = window.innerHeight;
        height = height / canvasRatio;
    } else {
        width = window.innerWidth;
        width = width * canvasRatio;
    }

    canvas.style.width = width * + 'px';
    canvas.style.height = height * + 'px';
};

// Size of the canvas. (can only be declared in scenes)
size = null;

// Global 2D gem holding array.
gemGrid = [];

////
// Wraps the Cocos2d sprite object 
// with centered functionality
////
var CreateSprite = function( a_url, a_x, a_y )
{
    var sprite = new cc.Sprite( a_url );
    sprite.setAnchorPoint(0.5, 0.5);
    sprite.setPosition( a_x, a_y );
    return sprite;
};

////
// Wraps the Cocos2d font object 
// with centered, colour and size
////
var CreateFont = function( WhatItSays, fontStyle, size,  a_x, a_y, colour)
{
    var label = cc.LabelTTF.create(WhatItSays, fontStyle, size);
    label.setAnchorPoint(0.5, 0.5);
    label.setPosition( a_x, a_y );
    label.setFontFillColor(colour);
    return label;
};

////
// Wraps Cocos2d's button object
// with scaling and one line of code
////
var CreateButton = function( firstSprite, secSprite, func, x, y, scale)
{
    var button = cc.MenuItemSprite.create(
        new cc.Sprite(firstSprite),
        new cc.Sprite(secSprite),
        func, this);
        
    button.setPosition(x, y);
    button.setScale(scale);
    return button;
};

////
// fills the global gem grid with undefined data
////
PopulateGemGrid = function( size, cellSize )
{ 
    for(var x = 0; (x * cellSize.x) <= size.width - cellSize.x; x++)
    {
        gemGrid[x] = [];
        for(var y = 0; (y * cellSize.y) <= size.height - cellSize.y; y++)
        {
            gemGrid[x][y] = null;
        }
    }
};

////
// This is a BubbleSort algorithm 
// that will sort from lowest to height.
// This BubbleSort is used for non-object
// data. (e.g. ints, floats, strings, etc)
////
var BubbleSort = function(arr)
{
    for(var i = 0; i < arr.length - 1; i++)
    {
        for(var j = 0; j < arr.length - 1; j++)
        {
            if( arr[j] < arr[j + 1] )
            {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    
    return arr;
};

var BubbleSortObjArr = function(arr, compareMe)
{
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < arr.length - 1; i++) 
        {
            var curr = arr[i][compareMe];
            var next = arr[i + 1][compareMe];

            if (curr > next)
            {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    
    return arr;
};

////
// ChangeScene() gets a chunk of lines that
// was ugly and simplifies the input and outcome.
// It will ask for a base object and then 
// applies it to an extension function of
// Cocos2d's Scene function. It also intialises
// scheduleUpdate, and then runs that scene. 
////
function ChangeScene( newSceneBase )
{
    var nextScene = cc.Scene.extend( newSceneBase );
    var nxtSceneExtend = new nextScene();
    nxtSceneExtend.scheduleUpdate();
    cc.director.runScene( nxtSceneExtend ); 
};

//Apply
function ChangeSceneWTrans( newSceneBase, enumTrans )
{
    var nextScene = cc.Scene.extend( newSceneBase );
    var nxtSceneExtend = new nextScene();
    nxtSceneExtend.scheduleUpdate();
    
    switch(enumTrans)
    {
        case 'MoveTop':
            cc.director.runScene( cc.TransitionMoveInT.create(2,nxtSceneExtend,true)); 
            break;
        case 'MoveBot':
            cc.director.runScene( cc.TransitionMoveInB.create(2,nxtSceneExtend,true)); 
            break;
        case 'MoveLeft':
            cc.director.runScene( cc.TransitionMoveInL.create(2,nxtSceneExtend,true)); 
            break;
        //Other random transitions
        case 'TransFade':
            cc.director.runScene( cc.TransitionFade.create(2,nxtSceneExtend,true)); 
            break;
        case 'TransCrossFade':
            cc.director.runScene( cc.TransitionCrossFade.create(2,nxtSceneExtend,true)); 
            break;
        case 'TransPageTurn':
            cc.director.runScene( cc.TransitionCrossFade.create(2,nxtSceneExtend,true)); 
            break;
        case 'TransCrossFade':
            cc.director.runScene( cc.TransitionCrossFade.create(2,nxtSceneExtend,true)); 
            break;
            
        case 'SlideTop':
            cc.director.runScene( cc.TransitionSlideInT.create(2,nxtSceneExtend,true)); 
            break;
        case 'SlideBot':
            cc.director.runScene( cc.TransitionSlideInB.create(2,nxtSceneExtend,true)); 
            break;
        case 'SlideLeft':
            cc.director.runScene( cc.TransitionSlideInL.create(2,nxtSceneExtend,true)); 
            break;
        case 'SlideRight':
            cc.director.runScene( cc.TransitionSlideInR.create(2,nxtSceneExtend,true)); 
            break;
        default:
            cc.director.runScene( nxtSceneExtend ); 
            break;
    }
    
}

////
// This function will scale the canvas 
// - dynamically changing the size of the canvas due to
// size of the window. (Could break game - Yet to try)
////
function ScaleCanvas()
{
    var canvas =document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");
    var scaleX = 1216 / context.width;
    var scaleY = 768 / context.height;
    //Scale elements within the canvas
    context.scale(scaleX, scaleY);
    
    //Change width and height
    canvas.width = 1216 * scaleX;
    canvas.height = 768 * scaleY;
};

////
// Wraps the cc.audioEngine.playMusic() 
// function. this simplifies the code 
// length and readability.
////
function PlayMusic( src, bool )
{
    //Plays music with custom source 
    //and also allows looping functionality
    var musID = cc.audioEngine.playMusic( src , bool);
    return musID;
}

////
// Wraps the cc.audioEngine.playEffect()
// function due to it's length and also 
// allows for volume control and looping
// functionality.
// (e.g. very useful for background sfx)
////
function PlaySoundEffect( src, bool, vol )
{
    var sfxID = cc.audioEngine.playEffect( src , bool);
    cc.audioEngine._effects[sfxID].volume = vol;
    return sfxID;
}

////
// Converts index values to position values
// depending on the cellSize
////
var GridToScreen = function(ix, iy, cellSize)
{
    // multiply to apply pixel conversion
    var x = ix * cellSize.x;
    var y = iy * cellSize.y;
    
    //apply centering
    x += cellSize.x / 2;
    y += cellSize.y / 2;
    
    //return converted point
    return cc.p(x, y);
};

////
// Converts position values to index values
// depending on the cellSize
////
var ScreenToGrid = function(x, y, cellSize)
{
    // undo centering
    var ix = x - cellSize.x / 2;
    var iy = y - cellSize.y / 2;
    
    // divide to get index values
    ix /= cellSize.x;
    iy /= cellSize.y;

    //return converted point
    return cc.p(ix, iy);
};