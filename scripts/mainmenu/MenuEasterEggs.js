//fun easter egg on main menu when game title is clicked

$(function (){

    $("#game-title").on("click", function(){

        let snake = `<div id="menu-snake" class="hidden">
            <div class="snake-part"></div>
            <div class="snake-part"></div>
            <div class="snake-part"></div>
            <div class="snake-part"></div>
        </div>`;

        if ($("#menu-snake").length){ //if there is already a snake
            return; //end function so no repeat animation
        }

        $("body").append(snake)

        titleBoundingRect = document.getElementById("game-title").getBoundingClientRect()
        $("#menu-snake").css({
            "top": titleBoundingRect.y,
            "margin-left": window.innerWidth + 5,
            "height": titleBoundingRect.height,
        })

        $("#menu-snake").removeClass("hidden").animate({
            "margin-left": -100, //animate snake from right of screen to left
            
        }, 5500, "linear", function(){
            $("#menu-snake").remove(); //remove snake upon completion of animation
        })

    })

})