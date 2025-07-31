function GetIDString(id) {
    if(id === 0)
        return "Board_Curro";
    else if(id === 1)
        return "Board_Physics";
    else if(id === 2)
        return "Board_Checkers";
    else if(id === 3)
        return "Board_GenGein";
    else if(id === 4)
        return "Board_Columns";
    else if(id === 5)
        return "Board_Gravitas";
    else
        alert("Invalid ID number");
}

function GetExtendedStringForID(stringID) {
    if(stringID === "Board_Curro")
        return Curro.GetExtended();
    else if(stringID === "Board_Physics")
        return Physics.GetExtended();
    else if(stringID === "Board_Checkers")
        return Checkers.GetExtended();
    else if(stringID === "Board_GenGein")
        return GenGein.GetExtended();
    else if(stringID === "Board_Columns")
        return Columns.GetExtended();
    else if(stringID === "Board_Gravitas")
        return Gravitas.GetExtended();
    else
        alert("Invalid string ID");
}

function GetNormalStringForID(stringID) {
    if(stringID === "Board_Curro")
        return Curro.GetNormal();
    else if(stringID === "Board_Physics")
        return Physics.GetNormal();
    else if(stringID === "Board_Checkers")
        return Checkers.GetNormal();
    else if(stringID === "Board_GenGein")
        return GenGein.GetNormal();
    else if(stringID === "Board_Columns")
        return Columns.GetNormal();
    else if(stringID === "Board_Gravitas")
        return Gravitas.GetNormal();
    else
        alert("Invalid string ID");
}

function AppExtend(id) {
	
    var stringID = GetIDString(id);
    var doc = document.getElementById(stringID);
    
    var extended = GetExtendedStringForID(stringID);
    doc.innerHTML = extended;
    
    //var cont = document.body;
    //cont.scrollTop += 400;
}

function AppDeExtend(id) {
    var stringID = GetIDString(id);
    var doc = document.getElementById(stringID);
    
    var normal = GetNormalStringForID(stringID);
    doc.innerHTML = normal;
    
    //var cont = document.body;
    //cont.scrollTop -= 600;
}

// DISLAYED HTML STUFF

// ============ CURRO ==============
var Curro = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> Curro </h1>';
        com += '<img src="Resources/Images/Projects/Curro_thumb.jpg" alt="Curro" class="ProjImgPreview"/>';
        com += '<img src="Resources/Images/Projects/Curro_thumb1.jpg" alt="Curro" class="ProjImgPreview"/>';
        com += '<p>';
        com += '<b>Curro</b> is a 3D exploration platformer created in <b>Unreal Engine 4</b> over a period of <b>16 weeks.</b> <br>';
        com += 'With Curro we really wanted to capture that nostalgic experience that we (the developers)<br>';
        com += 'have experienced in our childhoods; with games such as Spyro and/or Jak and Daxter. <br>';
        com += '<b>[All gameplay intended for children of the age of 14 to 16 years of age] </b><br><br>';
        return com;
    },
    
    GetNormal : function(){
        var norm = Curro.GetCommon();
        norm += '<div class="button-normal" onClick="AppExtend(0); initCanvas();">Read More</div>';
        norm += '<br><br>';
        norm += '</p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Curro.GetCommon();
		ext += 'Within this project, I was the the project lead, program lead and co-design lead. Although<br>';
		ext += 'That was a lot on my plate, things went surprisingly well. My role within Curro was gameplay<br>';
		ext += "focused and to ensure the player's experience was memorable. I programmed all gameplay  <br>";
		ext += 'elements that are within both Curro and the bird. Not only the character movement but also <br>';
		ext += 'the possession.<br><br>';
		ext += 'Within this project I demonstrated <b>sophisticated team management, leadership ethics </b>and <br>';
		ext += 'how to re-scope when people or time gets cut.<br>';
        ext += "If you have any questions feel free to email me and I'll get back to you asap!<br><br>";
        ext += '<b>For those interested in our latest build (159.91mb)<br>';
        ext += '<a href="http://bit.do/Curro_Final-Zip" target="_blank">https://www.dropbox.com/Curro/Release/Curro06thNov.zip</a><br><br>';
        ext += 'For those interested in the source code [Unreal Engine 4.8.3]:<br></b>';
        ext += '<a href="https://github.com/Sedawrath/Curro" target="_blank">https://github.com/Sedawrath/Curro</a> <br></p><br>';
        ext += '<div class="button-extended" onClick="AppDeExtend(0); initCanvas();">Read Less</div>';
        ext += '<br><br><br>';
        return ext;
    }
};
// ============ PHYSICS ==============
var Physics = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> Phys Vs PhysX </h1>';
        com += '<img src="Resources/Images/Projects/Physics_thumb.jpg" alt="Physics" class="ProjImgPreview"/>';
        com += '<img src="Resources/Images/Projects/Physics_thumb1.jpg" alt="Physics" class="ProjImgPreview"/><p>';
        com += '<b> Phys vs PhysX </b> was a pretty interesting topic that went for about 8 weeks in development.<br>';
        com += 'This application is made 100% within my own engine <b>GenGein</b>. Such a beautiful piece. <br>';
        com += "This neat little tech' demo was my way of showing off both physics and graphics. On the left <br>";
        com += 'you see my physics engine (pink) and on the right, you see PhysX (blue). I really wish I <br>';
        com += "explored multi-threading prior to this as it would've improved the performance exponentially. <br>";
        com += "<br>";
        return com;
    },
    
    GetNormal : function(){
        var norm = Physics.GetCommon();
        norm += '<br>';
        norm += '<div class="button-normal" onClick="AppExtend(1); initCanvas();">Read More</div>';
        norm += '<br><br></p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Physics.GetCommon();
        ext += 'What you see here (on the left), is the display of several different physics actor components.<br>';
        ext += "Firstly, all the way on the right is a bridge of joints. This is the result of <b>Hooke's Law</b>.<br>";
        ext += "Hooke's Law force states that 'the force needed to extend or compress a spring by some <br>";
        ext += "distance is proportional to that distance.' To express Hooke's Law in it's simplest form,<br>";
        ext += 'it is essentially this; <b><i>F = -kX - bv</i></b>. Urgh, Maths! What does this mean!? <br>';
        ext += '<b>F</b>- The force the spring exerts. | <b>k</b> - the spring constant. (stiffness)<br>';
        ext += "<b>X</b> - the displacement of the spring from it's resting point.<br>";
        ext += '<b>b</b> - the damping value of the spring. (retension) <br>';
        ext += '<b>v</b> - the relative velocity of the particle. (direction) <br><br>';
        ext += 'Anyway, the rest on my end, is demonstrating various collision checks between spheres, <br>';
        ext += "cubes and planes. I won't get into the math on that one, but you get the idea. Considering <br>";
        ext += "I'm only running this through <b> one thread </b>, i'm actually impressed with how well it performs! <br><br>";
        ext += 'On the right is a demonstration of some of the sweet beauties in the <b>PhysX SDK (C++)</b> can do! <br>';
        ext += 'I designed it so I could demonstrate several different elements within the one room.<br>';
        ext += "Up the front in-game, you'll see floating cubes and a <b>ragdoll</b> just above. As you probably<br>";
        ext += 'assumed, yes the ragdoll falls through the wall of cubes and yes they then become dynamic. <br>';
        ext += "At the back is a <b>pyramid of cubes</b> (as shown on your right) that if you're feelin' a little <br>";
        ext += 'cheeky, can destroy by <b>shooting spheres</b> at. (you can shoot spheres in both areas) <br>';
        ext += "Then lastly, on your right of the PhysX side, you'll see a 'particle fountain' displaying <br>";
        ext += "PhysX's notorious <b>fluid simulation</b>. Sadly I ran out of time, but I'm hoping to come back <br>";
        ext += 'to run a <b>marching cubes</b> algorithm over the top to visually display the fluid. <br>';
        ext += '<br><b> All graphics shaders are featured in my SHADER tab above. </b><br>';
        ext += 'Urgh, enough talk! Go check it out yourself and spam me feedback!';
        ext += '<br><b><br>Go check out  Phys Vs PhysX (59.28mb) </b><br> (Release build and source code inside)<br>';
        ext += '<a href="https://www.dropbox.com/s/wd0siewzn8j5ruf/Phys-Vs-PhysX.zip?dl=0">https://www.dropbox.com/GenGein/PhysVsPhysX.zip</a></p>';
        ext += '<br><div class="button-extended" onClick="AppDeExtend(1); initCanvas();">Read Less</div>';
        ext += '<br><br></p>';
        return ext;
    }
};
// ============ CHECKERS ==============
var Checkers = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> Checkers </h1>';
        com += '<img src="Resources/Images/Projects/Checkers_thumb.jpg" alt="Checkers" class="ProjImgPreview"/>';
        com += '<img src="Resources/Images/Projects/Checkers_thumb1.jpg" alt="Checkers" class="ProjImgPreview"/>';
        com += '<p><b> Checkers </b> is a 3D interactive demo that was produce over a period of about 8 weeks. <br>';
        com += 'Within <i>Checkers</i>, you  play against a fairly competitive <b>AI</b> that is using a modified <br>';
        com += 'version of the <b>Monte Carlo Tree Search algorithm</b>. MCTS for short, is a  heuristic search<br>';
        com += 'algorithm of making decisions in some decision processes, most notably employed in game playing.<br>';
        return com;
    },
    
    GetNormal : function(){
        var norm = Checkers.GetCommon();
        norm += '<div class="button-normal" onClick="AppExtend(2); initCanvas();">Read More</div>';
        norm += '<br><br></p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Checkers.GetCommon();
        ext += '<br>Pretty much what I ended up doing is writing up a fairly decent AI that cycled through about <br>';
        ext += '80 playthroughs at a depth of 10 random plays, for each randomly selected move piece, per<br>';
        ext += "turn. From this, the AI then knew of the best play to approach. <br><br>";
        ext += "Aside from having AI implemented, this also was my first use of <b>FMOD's Low Level API</b>. <br>";
        ext += 'Sounds are layed out on players movements as well as having a glistening audio track in the <br>';
        ext += "background, to create a <b>gentlemen's club atmosphere</b>.<br><br>";
        ext += 'Now to the visual side of things. Here we have a <b>skybox, real-time lighting and imported<br>';
        ext += 'models with textures</b> -- All produced in my nifty little engine, <b>GenGein</b>. <br>';
        ext += 'This beautiful little piece was crafted by my good friend, <a href="https://www.artstation.com/artist/doodee"<b>Alex Kennedy</b></a>. <br>';
        ext += '<b><br>Feeling interested? Go check out the release here (59.79mb)</b><br>';
        ext += '<a href="https://www.dropbox.com/s/bzxl8unv5b9qnnn/Checkers.zip?dl=0">https://www.dropbox.com/GenGein/Checkers.zip</a><br>';
        ext += '<div class="button-extended" onClick="AppDeExtend(2); initCanvas();">Read Less</div>';
        ext += '<br><br></p>';
        return ext;
    }
};
// ============ GENGEIN ==============
var GenGein = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> GenGein Engine </h1>';
        com += '<img src="Resources/Images/Projects/GenGein_thumb.jpg" alt="GenGein" class="ProjImgPreview"/>';
        com += '<img src="Resources/Images/Projects/GenGein_thumb1.jpg" alt="GenGein" class="ProjImgPreview"/><p>';
        com += "<b> GenGein </b> is a OpenGL C++ engine that I've been working on for several months now.<br>";
        com += 'GenGein has undergone several different experiments that have proven it to <br> be a useful';
        com += 'product throughout my ongoing development. <br><br>';
        return com;
    },
    
    GetNormal : function(){
        var norm = GenGein.GetCommon();
        norm += '<div class="button-normal" onClick="AppExtend(3); initCanvas();">Read More</div>';
        norm += '<br><br>';
        norm += '</p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = GenGein.GetCommon();
        ext += 'It It currently has the potential to produce complex game systems, accurate<br>';
        ext += 'real-time physics calulations and modern graphics techniques/rendering. <br>';
        ext += 'It has been proven to produce advanced projects, as proven down below!<br><br>';
        ext += 'Please take a look at my <b>Checkers</b> and <b> Phys Vs PhysX </b> projects <br> for an overview';
        ext += 'of "what lies beneath" in GenGein.<br><br>';
        ext += "<b>If you're particularly interested; it's all open-source.";
        ext += "<br>Here's the github link (193mb) <br></b>";
        ext += "<a href='https://github.com/Sedawrath/GenGein-Engine' target='_blank'>";
        ext += 'https://github.com/Sedawrath/GenGein-Engine</a>';
        ext += '<br></p>';
        ext += '<div class="button-extended" onClick="AppDeExtend(3); initCanvas();">Read Less</div>';
        ext += '<br><br>';
        
        return ext;
    }
};
// ============ COLUMNS ==============
var Columns = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> Columns </h1>';
        com += '<img src="Resources/Images/Projects/Col_thumb.jpg" alt="GenGein" class="ProjImgPreview"/>';
        com += '<img src="Resources/Images/Projects/Col_thumb1.jpg" alt="GenGein" class="ProjImgPreview"/><p>';
        com += '<b>Columns</b> is a <i>match 3</i> inspired game where the goal is to collect as much<br>';
        com += "points as possible without running out of time and tile space. The longer you're in <br>";
        com += 'the game, the faster it takes for the columns to fall! <br><br>';
        return com;
    },
    
    GetNormal : function(){
        var norm = Columns.GetCommon();
        norm += '<div class="button-normal" onClick="AppExtend(4); initCanvas();">Read More</div>';
        norm += '<br><br>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Columns.GetCommon();
        ext += 'Columns went into development for about 5 weeks and by that point was fully functionable<br>';
        ext += 'over both mobile and PC devices. It was developed in Cocos2D Javascript Framework for <br>';
        ext += 'effective use. (Although after exploring javascript I had a game running without it) <br>';
        ext += '<br>';
        ext += 'As you can clearly tell, even as of a year ago I still loved pretty things! Pretty awesome<br>';
        ext += 'to see that carry through! Although in saying that, <b> I do not own the art content of this game</b>. <br>';
        ext += '<br>';
        ext += 'What I found really interesting with making this game was not even the game, but the<br>';
        ext += 'functions within the menu. On the mainmenu area is an in built weather API with real-time<br>';
        ext += "How awesome's that?! Not to mention scores within the game are stored into the local<br>";
        ext += 'repository visual feedback of the browser,. So, if you <b> REALLY </b> loved my game, you <br>';
        ext += 'could actually spend hours trying to beat your highscore... Hint, hint. <br>';
        ext += "<br>Oh, did I also mention you don't have to download this? Yeah, <a href='Resources/Columns_Game/Index.html' target='_blank'a>click here.</a><br>";
        ext += '<br><br>';
        ext += '<div class="button-extended" onClick="AppDeExtend(4); initCanvas();">Read Less</div>';
        ext += '<br><br>';
        return ext;
    }
};
// ============ GRAVITAS ==============
var Gravitas = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> Gravitas </h1>';
	com += '<img src="Resources/Images/Projects/Gravitas_thumb.jpg" alt="Gravitas" class="ProjImgPreview"/>';
	com += '<img src="Resources/Images/Projects/Gravitas_thumb1.jpg" alt="Gravitas" class="ProjImgPreview"/><p>';
	com += '<b>Gravitas</b> was quite a simple yet wonderful game. The main mechanic of the game is that <br>';
        com += 'you can manipulate gravity to rotate in any odd direction. This left open some pretty ';
        com += 'interesting doors along the way of development.<br><br>';
        return com;
    },
    
    GetNormal : function(){
        var norm = Gravitas.GetCommon(); 
        norm += '<div class="button-normal" onClick="AppExtend(5); initCanvas();">Read More</div>';
	norm += '<br><br>';
	norm += '</p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Gravitas.GetCommon();
        ext += 'Gravtias was developed in a period of 8 weeks and constructed by 3 programmers in C#<br>';
        ext += "Monodev. Theoretically to push out what we did if it were from scratch would've taken an<br>";
        ext += 'incredibly long time, but thanks to the wonderful physics engine, <b>Farseer Physics</b> we pushed <br>';
        ext += 'along our schedule quite fittingly. <br><br>';
        ext += 'Now, to the most interesting part about Gravitas; Thanks to Monodev for porting functionality<br>';
        ext += 'and AIE for having PS Vita dev kits, we were able to build our game onto a PS Vita.<br>';
        ext += 'Man, there really is no better feeling than playing your own game on such a device. <br><br>';
        ext += "<b>We finally found it! Check out the build and source code (2.39mb)</b><br>";
		ext += "<a href='http://bit.do/Gravitas-zip'>http://Dropbox.com/Gravitas-zip</a></p>";
        ext += '<br><br>';
        ext += '<div class="button-extended" onClick="AppDeExtend(5); initCanvas();">Read Less</div>';
	ext += '<br><br>';
	ext += '</p>';
        return ext;
    }
};