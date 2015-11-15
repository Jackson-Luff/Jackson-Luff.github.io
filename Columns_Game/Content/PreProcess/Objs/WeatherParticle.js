
////
// This is an indivudal leaf particle object
// it holds many traits and performs various
// random behaviours.
// 
// The particles will randomly move at a random
// speed and a random direction (the direction
// is between Pi and 2Pi.
////
var WeatherParticle = function( a_x, a_y)
{    
    //Individual traits:
    // source, colour, sprite, opacity, scale, 
    // tintBehaviour, direction, speed, 
    // deterioration speed and unique velocity.
    this.src = WeatherMan.setForeCastImage();
    this.colour = WeatherMan.setForeCastColour();
    this.sprite = CreateSprite( this.src , a_x, a_y);
    this.sprite.opacity = (Math.random() * 155) + 100;
    this.sprite.setScale((Math.random() * 1) + 0.25 );
    this.sprite.runAction( cc.TintTo.create(1.5, this.colour.r, this.colour.g, this.colour.b) );
    this.dir =  Math.random() * -((Math.PI + Math.PI / 16) - Math.PI / 32);
    this.speed = (((Math.random() * 10) + 2) + Math.random() * WeatherMan.temperature/10);
    this.deterSpeed = (Math.random() * 2) + 0.5;
    this.vel = null;
    
    this.update = function()
    {
        var nextPos = this.sprite.getPosition();
        
        //Accelerate at that random speed and direction
        this.vel = cc.p(Math.cos(this.dir) * this.speed,
                        Math.sin(this.dir) * this.speed);
        
        nextPos.x += this.vel.x;
        nextPos.y += this.vel.y;
       
        //Apply next position
        this.setPosition(nextPos);
        
        //subtract opacity from sprite
        if(this.sprite.opacity > 0)
            this.sprite.opacity -= this.deterSpeed;
    };
    
    //Override current position of particle.
    //(Mainly used for readability)
    this.setPosition = function(a_pos)
    {
        return this.sprite.setPosition(a_pos);
    };
    
    //Retrieve position
    //(Mainly used for readability)
    this.getPosition = function()
    {
        return this.sprite.getPosition();
    };
};