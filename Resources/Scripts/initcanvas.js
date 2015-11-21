//==== BUG LIST ====//
// 
// - Upon the 'read less' button -> document does not condence.
// - readmore buttons dont resize on mobile
//====================//

var settings;

window.addEventListener('load', function(){
    initCanvas(settings);
});

window.addEventListener('resize', function(){
    initCanvas(settings);
});
 
function initCanvas(settings){
    settings = loadSettings(settings);
    //init trianglify
    var pattern = Trianglify(settings);
    //add trianglify to #backgroundCanvas
    pattern.canvas(document.getElementById('backgroundCanvas'));
}

function loadSettings(settings){
   
   var width = document.documentElement.offsetWidth; 
   var height = document.documentElement.offsetHeight; 
   
    var settings = {
      cell_size: 75,
      variance: 0.75,
      x_colors: 'Spectral',
      y_colors: 'match_x',
      palette: Trianglify.colorbrewer,
      color_space: 'lab',
      color_function: false,
      stroke_width: 1.51,
      width: width,
      height: height
    };
 
    return settings;
}