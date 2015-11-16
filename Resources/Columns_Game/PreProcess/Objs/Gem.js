

////
// Standard Gem Object.
// Holds its source texture, 
// a source randomiser, 
// reference values to its index
// in the global 'gemGrid' and a sprite object.
// It also has an update function
// that converts the index values to position values
// and applies them every frame.
// 
// (for efficency i wouldn't need to apply it every
//  frame but hey, it's just for this assessment)
////
var Gem = function(a_indexX, a_indexY, size)
{
    this.uniqueSRC = null;
    this.alive = true;
    
    this.randSrc = function()
    {
        var randNum = Math.floor((Math.random() * 6) + 1);
        
        switch(randNum)
        {
            case 1:
                this.uniqueSRC = sPurpleDiamondGem;
                break;
            case 2:
                this.uniqueSRC = sBlueDiamondGem;
                break;
            case 3:
                this.uniqueSRC = sOrangeSquareGem;
                break;
            case 4:
                this.uniqueSRC = sPinkHeartGem;
                break;
            case 5:
                this.uniqueSRC = sYellowLemonGem;
                break;
            case 6:
                this.uniqueSRC = sGreenHexagonGem;
                break;
            default:
                this.uniqueSRC =  sDefaultImg;
                break;
        }
    };
 
    this.indexX = Math.floor(a_indexX);
    this.indexY = Math.floor(a_indexY);
    
    this.randSrc();
    
    var pos = GridToScreen(a_indexX, a_indexY, size);
    this.sprite = CreateSprite( this.uniqueSRC , pos.x, pos.y);
    
    this.update = function()
    {
        //Allows for resetting of position
        var pos = GridToScreen(this.indexX, this.indexY, size);
        this.sprite.setPosition( pos );
        
        //Allows for texture switching
        this.sprite.setTexture( this.uniqueSRC );
    };
    
    this.move = function(x, y)
    {
        //check if valid
        var arr = gemGrid[x];
        if(arr === undefined)
            return false;
        var gem = arr[y];
        if(gem !== null)
            return false;
        
        //grid pos
        gemGrid[this.indexX][this.indexY] = null;
        this.indexX = x;
        this.indexY = y;
        gemGrid[this.indexX][this.indexY] = this;
        
        //world pos
        var pos = GridToScreen(this.indexX, this.indexY, size);
        this.sprite.setPosition( pos );
        return true;
    };
};
