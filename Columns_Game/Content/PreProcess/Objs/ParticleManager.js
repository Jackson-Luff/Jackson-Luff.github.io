//#PROJECT- CAN'T HAVE A GAME WITHOUT PARTICLES!!
//#PROJECT- CAN'T HAVE A GAME WITHOUT PARTICLES!!
//#PROJECT- CAN'T HAVE A GAME WITHOUT PARTICLES!!
//#PROJECT- CAN'T HAVE A GAME WITHOUT PARTICLES!!
//#PROJECT- CAN'T HAVE A GAME WITHOUT PARTICLES!! 

////
// This is the particle manager.
// It holds a dynamic list of particles
// and manages their deletion detection,
// movements and behaviours.
// 
// The spawning of the particles is designed
// to be an arch way.
////
ParticleManager =  function(a_x, a_y, type)
{
    this.CoolDownTime = 0;
    this.CoolDownMaxTime = 0.5;
    this.particleList = [];
    this.spawnPos = cc.p(a_x, a_y);
    this.type = type;
    
    ////
    // Manager particles:
    // - Update their movements,
    // - Add them due to timescale
    // - if out of screen dimension 
    //      (multiplied by 1.5) then delete
    ////
    this.update = function(scene, size)
    {
        var tempX = null;
        var tempY = null;
        
        if(this.type === 'WEATHER')
        {
            //Creating the arch way effect
            var spawnDirr = Math.random() * (Math.PI + Math.PI / 16) - Math.PI / 32;
            var tempSpawn = cc.p(Math.cos(spawnDirr), Math.sin(spawnDirr));
            tempX = this.spawnPos.x + (this.spawnPos.x * tempSpawn.x) * 1.3;
            tempY = this.spawnPos.y + (this.spawnPos.y * tempSpawn.y) * 1.5;
            
            this.CoolDownTime += 10;
        
            //if CoolDown exceeds limit - Add particle and reset timer
            if( this.CoolDownTime > this.CoolDownMaxTime)       
            {
                this.AddParticle( scene, new WeatherParticle( tempX, tempY));
                this.CoolDownTime = 0;
            }
        }
        
        for(var i in this.particleList)
        {
            //Temp references for every particle (position, opacity)
            var piecePos = this.particleList[i].getPosition();
            var pieceOpac = null;
            
            if(this.type === 'WEATHER')
            {
                //Update particle individal behaviours
                this.particleList[i].update();
                pieceOpac = this.particleList[i].sprite.opacity;
            }
            if(this.type === 'FONT')
            {
                pieceOpac = this.particleList[i].opacity;
                this.particleList[i].setPositionY( this.particleList[i].getPositionY() + 3);
                this.particleList[i].opacity -= 3;
            }
            
            //delete particle if it exceeds either of these behaviours
            if(   piecePos.x < -size.width / 2
               || piecePos.x > size.width * 1.15
               || piecePos.y < - size.hieght / 2
               //changing this multiple will allow more particles
               || piecePos.y > size.height * 1.1
               || pieceOpac <= 1)
            {
                if(this.type === 'WEATHER')
                {
                    //remove from parent removes particle from drawing
                    this.particleList[i].sprite.removeFromParent(0);
                }
                else if(this.type === 'FONT')
                {
                    this.particleList[i].removeFromParent(0);
                }
                delete this.particleList[i];
            }
        }
        
    };
    
    ////
    // This function stores a particle in the 
    // particle list as well as draws that particle
    // to screen via a screen reference.
    ////
    this.AddParticle = function( scene, particle)
    {
        //pushs obj to the end of the array
        this.particleList.push( particle );
        
        if(this.type === 'WEATHER')
        {
            scene.addChild(particle.sprite, 1);
        }
        else if(this.type === 'FONT')
        {
            scene.addChild(particle, 1);
        }
    };
};
