$(window).ready(function()
{
    $("#Shader_ProGen").hover(
        function()
        {
            initCanvas();
            $("#ProGen_Img").attr("src", "Resources/Images/Shaders/ProGen_25.gif");
        },
        function()
        {
            $("#ProGen_Img").attr("src", "Resources/Images/Projects/GenGein_thumb1.jpg");
        }
    );
    
    /// ================== INTERACTIVE TEXTURS CHUNK =======================
    
    $("#Shader_InteractV1").hover(
        function()
        {
            initCanvas();
            $("#InteractV1_Img").attr("src", "Resources/Images/Shaders/InteractV1_25.gif");
        },
        function()
        {
            $("#InteractV1_Img").attr("src", "Resources/Images/Shaders/InteractV1.jpg");
        }
    );
    
    $("#Shader_InteractV2").hover(
        function()
        {
            initCanvas();
            $("#InteractV2_Img").attr("src", "Resources/Images/Shaders/InteractV2_25.gif");
        },
        function()
        {
            $("#InteractV2_Img").attr("src", "Resources/Images/Shaders/InteractV2.jpg");
        }
    );
    
    $("#Shader_InteractV3").hover(
        function()
        {
            initCanvas();
            $("#InteractV3_Img").attr("src", "Resources/Images/Shaders/InteractV3_25.gif");
        },
        function()
        {
            $("#InteractV3_Img").attr("src", "Resources/Images/Shaders/InteractV3.jpg");
        }
    );
    
    $("#Shader_InteractV4").hover(
        function()
        {
            initCanvas();
            $("#InteractV4_Img").attr("src", "Resources/Images/Shaders/InteractV4_25.gif");
        },
        function()
        {
            $("#InteractV4_Img").attr("src", "Resources/Images/Shaders/InteractV4.jpg");
        }
    );
    
    /// ================== PARTICLES CHUNK =======================
    
    $("#Shader_Particles_Spiral").hover(
        function()
        {
            initCanvas();
            $("#Particles_Spiral_Img").attr("src", "Resources/Images/Shaders/Particles_Spiral_25.gif");
        },
        function()
        {
            $("#Particles_Spiral_Img").attr("src", "Resources/Images/Shaders/Particles_Spiral.jpg");
        }
    );
    
    $("#Shader_Particles_Morph").hover(
        function()
        {
            initCanvas();
            $("#Particles_Morph_Img").attr("src", "Resources/Images/Shaders/Particles_Morph_25.gif");
        },
        function()
        {
            $("#Particles_Morph_Img").attr("src", "Resources/Images/Shaders/Particles_Morph.jpg");
        }
    );
    
    /// ================== MISC CHUNK =======================
    
    $("#Shader_Water").hover(
        function()
        {
            initCanvas();
            $("#Water_Img").attr("src", "Resources/Images/Shaders/Water_25.gif");
        },
        function()
        {
            $("#Water_Img").attr("src", "Resources/Images/Shaders/Water.jpg");
        }
    );
    
    $("#Shader_WatchDogs").hover(
        function()
        {
            initCanvas();
            $("#WatchDogs_Img").attr("src", "Resources/Images/Shaders/WatchDogs_25.gif");
        },
        function()
        {
            $("#WatchDogs_Img").attr("src", "Resources/Images/Shaders/WatchDogs.jpg");
        }
    );
});