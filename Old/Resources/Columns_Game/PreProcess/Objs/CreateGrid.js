
////
// Creates a 2D array that is used 
// as the background grid in game.
// It also has a visual representation
// of the grid via sprites
////
var CreateGrid = function( width, height, cellWidth, cellHeight )
{
    var spriteArr = [];
    this.cellSize = cc.p(cellWidth, cellHeight);
    
    for(var y = 0; (y * cellHeight) <= height - (cellHeight * 1); y++)
    {
        for(var x = 0; (x * cellWidth) <= width - cellHeight; x++)
        {
            //Create positioning
            var pos = cc.p((x * cellWidth) + cellWidth  / 2,
                           (y * cellHeight)+ cellHeight / 2 );
            
            //Apply positioning to sprites
            spriteArr.push(CreateSprite( sCell, pos.x, pos.y));
           
        }  
    }
    
    for(var i in spriteArr)
    {
        var scaleX = cellWidth / spriteArr[i].width;
        var scaleY = cellHeight / spriteArr[i].height;
        spriteArr[i].setScale(scaleX, scaleY);
    }
    
    
    this.draw = function(scene)
    {
        for(var i = 0; i < spriteArr.length; i++)
        {
            scene.addChild( spriteArr[i], 0);
        }
    };
};
