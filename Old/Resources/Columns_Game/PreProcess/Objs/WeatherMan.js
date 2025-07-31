

////
// Weather Manager is the container
// for all of the functions in realtion
// to applying and/or getting the 
// weather results.
////
var WeatherMan = {};

////
// Returns a discrete value of the 
// current weather in Melbourne.
////
WeatherMan.updateWeather = function()
{
    var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20%28select%20woeid%20from%20geo.places%281%29%20where%20text%3D%22melbourne%2C%20vic%22%29%20and%20u%3D%22c%22&format=json&callback=';

    //Access Yahoo's weather stats
    $.getJSON( url,
    function(data, status)
    {
		if(status === "success")
			WeatherMan.temperature = parseInt(data.query.results.channel.item.condition.temp);
    });
	
	if(WeatherMan.temperature === undefined)
		WeatherMan.temperature = 0;
};

////
// Sets images depending on temp
////
WeatherMan.setForeCastImage = function()
{
    WeatherMan.updateWeather();
    var temp = WeatherMan.temperature;
    var src = null;
    
    switch(true)
    {
        case (temp >= 0 && temp <= 15):
            //src === snow
            src = sParticleSnow;
            break;
        case (temp > 15 && temp <= 30):
            //src === leaf
            src = sParticleLeaf;
            break;
        case (temp > 30 && temp <= 45):
            //src === leaf
            src = sParticleSun;
            break;
        case (temp > 45):
            //src === fire balls
            src = sParticleFireBall;
            break; 
        default:
            src = sDefaultImg;
            break;
    }
    
    return src;
};

////
// Sets colour depending on temp
////
WeatherMan.setForeCastColour = function()
{
    WeatherMan.updateWeather();
    var temp = WeatherMan.temperature;
    var colour = null;
 
    switch(true)
    {
        case (temp >= 0 && temp <= 15):
            //src === light blue
            colour = new cc.Color(102, 132, 255);
            break;
        case (temp > 15 && temp <= 30):
            //src === almond-ish
            colour = new cc.Color(225, 127, 0);
            break;
        case (temp > 30 && temp <= 45):
            //src === light yellow
            colour = new cc.Color(252, 232, 64);
            break;
        case (temp > 45):
            //src === red orange
            colour = new cc.Color(234, 63, 6);
            break; 
        default:
            colour = new cc.Color(255, 255, 255);
            break;
    }
    
    return colour;
};

////
// Sets audio depending on temp
////
WeatherMan.setForeCastAudio = function()
{
    WeatherMan.updateWeather();
    var temp = WeatherMan.temperature;
    var aud = null;
    
    switch(temp)
    {
        case temp >= 0 && temp <= 15:
            //src === snow
            return aud = PlayEffect(sfx, false);
            break;
        case temp > 15 && temp <= 30:
            //src === leaf
            return aud = PlayEffect(sfx, false);
            break;
        case temp > 30 && temp <= 45:
            //src === leaf
            return aud = PlayEffect(sfx, false);
            break;
        case temp > 30 && temp <= 45:
            //src === fire balls
            return aud = PlayEffect(sfx, false);
            break; 
        case temp > 45:
            //src === fire balls
            return aud = PlayEffect(sfx, false);
            break;
        default:
            break;
    }
};