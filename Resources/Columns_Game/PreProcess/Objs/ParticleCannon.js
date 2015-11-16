
////////////
// Particle Cannon
// Author: Jackson L.
////////////

var ParticleCannon = function( cannonPos, angleMin, angleMax )
{    
    this.cannon = CreateSprite( sPCannon, cannonPos.x, cannonPos.y);
    this.confettiList = [];
    this.angleMin = angleMin;
    this.angleMax = angleMax;
    this.spawnTimer = 0.0000;

    this.update = function( scene )
    {        
        this.spawnTimer -= 10;
        
        // Iterate through confetti, decaying opacity and deleting if need be.
        for(var i in this.confettiList)
        {
            if( this.confettiList[i].opacity <= 0 )
            {
                this.confettiList[i].sprite.removeFromParent(0);
                delete this.confettiList[i];
            }
            
            var spawnDir = this.angleMin + ( Math.random() * (this.angleMax - this.angleMin) );
            this.confettiList[i].update( spawnDir, this.spawnTimer/3000 );
        }
        
        if(this.spawnTimer <= 3000)
        {
            var pos = this.cannon.getPosition();
            this.createParticleBomb( scene, 10, pos );
        }
        
        if(this.spawnTimer < -100) this.spawnTimer = 3000;
    };

    this.createParticleBomb = function( scene, iter, pos)
    {
        for(var i = 0; i < iter; i++)
        {
            var piece = new ConfettiParticle( sConfetti, pos );
            piece.ctor();
            piece.draw(scene);
            this.confettiList.push( piece );
        }
    };
};