function GetIDString(id) {
    if(id === 0)
        return "Board_Curro";
    else if(id === 1)
        return "Board_GenGein";
    else if(id === 2)
        return "Board_Columns";
    else if(id === 3)
        return "Board_Gravitas";
    else
        alert("Invalid ID number");
}

function GetExtendedStringForID(stringID) {
    if(stringID === "Board_Curro")
        return Curro.GetExtended();
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
        norm += '<div class="button-normal" onClick="AppExtend(0)">Read More</div>';
        norm += '<br><br>';
        norm += '</p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Curro.GetCommon();
        ext += 'Curro awakens from timeless sleep and into a beautifully mysterious world, overgrown with <br>';
        ext += 'natural wonders and curiosity. "Curro!" - said The Grand Tree. "Wahh..? Hello?" - Said Curro <br><br>';
        ext += 'Soon after, Curro sets off on a quest given by The Grand Tree, to revitalize this sick and forsaken <br>';
        ext += 'world.<b>Eco-orbs</b> are scattered wondrously throughout the land. At first deceivingly pointless, <br>';
        ext += 'but upon voyaging, Curro soon realises <b>shrines</b> need orbs to infuse the world with health.<br><br>';
        ext += 'There are three shrines. Each shrine activated increases the spirit of The Grand Tree. As you <br>';
        ext += 'heal The Grand Tree, he will reward you along your way by unveiling land, unleashing birds<br>';
        ext += 'And.. Wait for it... Wait for it... Activate amazing matinee shots of the island.<br><br>';
        ext += "It's hard for me to put in to words, so why don't you go check it out yourself! There's links <br>";
        ext += 'down below where you can access the latest build of the game, as well as the source code. <br>';
        ext += "If you have any questions feel free to email me and I'll get back to you asap!<br><br>";
        ext += '<div id="HyperLinks">'
        ext += 'For those interested in our latest build [Friday 06th Nov]:<br>';
        ext += '<a href="http://bit.ly/1lpHb8w" target="_blank">https://www.dropbox.com/Curro/Release/Curro06thNov.zip</a><br><br>';
        ext += 'For those interested in the source code [Unreal Engine 4.8.3]:<br>';
        ext += '<a href="https://github.com/Sedawrath/Curro" target="_blank">https://github.com/Sedawrath/Curro</a> <br></p>';
        ext += '</div><br>'
        ext += '<div class="button-extended" onClick="AppDeExtend(0)">Read Less</div>';
        ext += '<br><br><br>';
        return ext;
    }
};
// ============ GENGEIN ==============
var GenGein = {
    
    GetCommon : function(){
        var com = "";
        com += '<h1> GenGein Engine </h1>'
        com += '<img src="Resources/Images/Projects/GenGein_thumb.jpg" alt="GenGein" class="ProjImgPreview"/>';
        com += '<img src="Resources/Images/Projects/GenGein_thumb1.jpg" alt="GenGein" class="ProjImgPreview"/><p>';
        com += "<b> GenGein </b> is a OpenGL C++ engine that I've been working on for several months now.<br>";
        com += 'GenGein has undergone several different experiments that have proven it to <br> be a useful';
        com += 'product throughout my ongoing development. <br><br><br>';
        return com;
    },
    
    GetNormal : function(){
        var norm = GenGein.GetCommon();
        norm += '<div class="button-normal" onClick="AppExtend(1)">Read More</div>';
        norm += '<br><br>';
        norm += '</p>'
        return norm;
    },
    
    GetExtended : function(){
        var ext = GenGein.GetCommon();
        ext += 'It It currently has the potential to produce complex game systems, accurate<br>';
        ext += 'real-time physics calulations and modern graphics techniques/rendering. <br>';
        ext += 'It has been proven to produce advanced projects, as proven down below!<br><br>';
        ext += 'Please take a look at my <b>Checkers</b> and <b> Phys Vs PhysX </b> projects <br> for an overview';
        ext += 'of "what lies beneath" in GenGein.<br><br>';
        ext += "<div id='HyperLinks'>";
        ext += "If you're particularly interested; it's all open-source.";
        ext += "Here's the github link:<br>";
        ext += "<a href='https://github.com/Sedawrath/GenGein-Engine' target='_blank'>";
        ext += 'https://github.com/Sedawrath/GenGein-Engine';
        ext += '</div></a>';
        ext += '<div class="button-extended" onClick="AppDeExtend(1)">Read Less</div>';
        ext += '<br><br>';
        ext += '</p>';
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
        com += "<b>Columns</b> is a 'match 3' game that allowed me to explore different programming languages.<br>";
        com += 'Those including JavaScript (Cocos2D Framework), JQuery, HTML and CSS. This project          <br>';
        com += 'lasted for about 5 weeks and is also compatible on mobile devices. Columns also stores  <br>';
        com += 'highscores locally and has a built in live weather API.<br><br>';
         return com;
    },
    
    GetNormal : function(){
        var norm = Columns.GetCommon();
        norm += '<div class="button-normal" onClick="AppExtend(2)">Read More</div>';
        norm += '<br><br></p>'
        return norm;
    },
    
    GetExtended : function(){
        var ext = Columns.GetCommon();
        ext += '<div class="button-extended" onClick="AppDeExtend(2)">Read Less</div>';
        ext += '<br><br></p>'
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
	com += 'The concept of <i>Gravitas</i> is simple. Alter the direction of gravity to explore the worlds ';
	com += "in search for the destination, only hoping to avoid the turrets. It's written in C# Monogame";
	com += "with the physics engine 'Farseer Physics'.";
	com += 'Gravitas is compatible on both PC and PS Vita [Development build] thanks to PlayStation Mobile.';
         return com;
    },
    
    GetNormal : function(){
        var norm = Gravitas.GetCommon();
        norm += '<br><br>';
        norm += '<div class="button-normal" onClick="AppExtend(3)">Read More</div>';
	norm += '<br><br>';
	norm += '</p>';
        return norm;
    },
    
    GetExtended : function(){
        var ext = Gravitas.GetCommon();
        ext += '<br><br>';
        ext += '<div class="button-extended" onClick="AppDeExtend(3)">Read Less</div>';
	ext += '<br><br>';
	ext += '</p>';
        return ext;
    }
};