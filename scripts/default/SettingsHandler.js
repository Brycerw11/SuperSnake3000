// handles the settings for all three gamemodes

//get gamemode
let gameMode = localStorage.getItem("SuperSnake3000-Settings-Gamemode");

$(function(){
    
    //Update page based on selected gamemode
    switch (gameMode){
        case "survival":
            $("#gamemode-title").text("Survival Mode");
            $("#gamemode-explaination").text("Run from enemies and survive as long as possible in one of three difficulty options: Easy, Medium, and Hard! Be careful though, the enemies get more difficult the longer you survive, regardless of difficulty setting.");
            createSurvivalOptions();
            break;
        default: //no valid gamemode found, return to main menu
            $("#gamemode-title").text("No selected gamemode found");
            $("#gamemode-explaination").text("No selected gamemode found");
            $("#options").append(`<h1 style="text-align: center;">Redirecting back to main menu in 3 seconds...</h1>`)
            setTimeout(function(){window.location.href = "../index.html";}, 3000)
    }

    function createSurvivalOptions(){
        primaryOptionsSectionHTML = `<div class="options-section">
            <div class="spliting-div">
            <label for="dificulty-selector">Difficulty:</label>
                <select id="dificulty-selector" name="dificulty-selector-name">
                    <option value="easy">Easy</option>
                    <option value="medium" selected>Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </div>`
        $("#options").append(`<h3 class="options-section-header">Primary Settings</h3> ${primaryOptionsSectionHTML}`)
    }
})