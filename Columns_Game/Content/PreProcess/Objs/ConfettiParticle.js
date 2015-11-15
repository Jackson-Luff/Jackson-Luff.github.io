
// Confetti Particles applied to Particle Cannon

var ConfettiParticle = function( type, pos )
{
    this.initialPos = pos;
    this.sprite = CreateSprite( type, pos.x, pos.y);
    this.sprite.setPosition( pos );
    
    var applyColour = function( sprite )
    {
        var R, G, B;
       
        do
        {
            R = 255 * (Math.random()).toFixed();
            G = 255 * (Math.random()).toFixed();
            B = 255 * (Math.random()).toFixed();
        }
        while( (R + G + B) === 0 | (R + G + B) === 765 );

        var colour = new cc.Color(R, G, B);
        sprite.setColor(colour);
    };
    
    this.ctor = function()
    { 
       applyColour( this.sprite );
    };
    
    this.update = function(spawnDir, timer)
    {
        //direction is perfect. 
        var dirVector = cc.p(50 * Math.cos(spawnDir), 50 * Math.sin(spawnDir));
        var distX = this.sprite.getPositionX() - this.initialPos.x;
        var distY = this.sprite.getPositionY() - this.initialPos.y;
        var dist = cc.p(distX, distY);
        //Now for timing. We want to compare the distance beween the particle
        //and the spawnpoint, so that we can apply increased/decreased movement
        //fast at first and then slower as the distance increases
        
        this.sprite.setPositionX( this.sprite.getPositionX() + dirVector.x ); 
        this.sprite.setPositionY( this.sprite.getPositionY() + dirVector.y ); 

        this.sprite.opacity -= 10;
    };
    
    this.draw = function( scene )
    {
        scene.addChild( this.sprite, 0);
    };
};