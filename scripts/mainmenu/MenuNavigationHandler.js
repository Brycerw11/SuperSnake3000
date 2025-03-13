//give buttons functionality
$(function (){

    $("#battle-mode-button").hide(1); // hide buttons for gamemodes that don't exist yet
    $("#freeplay-button").hide(1); // hide buttons for gamemodes that don't exist yet

    $("#survival-mode-button").on("click", function(){
        localStorage.setItem("SuperSnake3000-Settings-Gamemode", "survival")
        window.location.href = "pages/options.html";
    })

})