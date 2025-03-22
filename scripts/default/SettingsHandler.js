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

    const easySettings = {
        gameSize: 72,
        snakeStartLength: 3,
        snakeGrowthInterval: 7.5,
        snakeMoveSpeed: 1,
        startEnemySpawnInterval: 8,
        minEnemySpawnInterval: 5,
        borderoverflow: "Off",
    }
    const mediumSettings = {
        gameSize: 64,
        snakeStartLength: 3,
        snakeGrowthInterval: 6,
        snakeMoveSpeed: 1,
        startEnemySpawnInterval: 6,
        minEnemySpawnInterval: 3.5,
        borderoverflow: "Off",
    }
    const hardSettings = {
        gameSize: 48,
        snakeStartLength: 5,
        snakeGrowthInterval: 4.5,
        snakeMoveSpeed: 2,
        startEnemySpawnInterval: 5,
        minEnemySpawnInterval: 2,
        borderoverflow: "Off",
    }

    function createSurvivalOptions(){
        primaryOptionsSectionHTML = `<div class="options-section">
            <div class="spliting-div">
            <label for="difficulty-selector">Difficulty:</label>
                <select id="difficulty-selector" name="difficulty-selector-name">
                    <option value="Easy">Easy</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
        </div>`
        $("#options").append(`<h3 class="options-section-header">Primary Settings</h3> ${primaryOptionsSectionHTML}`)
        
        // Add all the settings that can change depending on the difficult and their default (medium) states
        $("#options").append(`<h4 id="current-difficulty-header">Current Difficulty Choice: Medium</h4>`)
        $("#options").append(`<div class="centering-div"> <ul id="current-difficulty-effects"></ul> </div>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Game Size:</div> <div>64x64</div></li>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Snake Start Length:</div> <div>3 units</div></li>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Snake Growth Interval:</div> <div>every 6s</div></li>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Snake Move Speed:</div> <div>1 u/s</div></li>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Starting Enemy Spawn Interval:</div> <div>every 7s</div></li>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Min Enemy Spawn Interval:</div> <div>every 3.5s</div></li>`)
        $("#current-difficulty-effects").append(`<li><div class="bold-line">Boder Overflow:</div> <div>Off</div></li>`)

        $("#difficulty-selector").on("change", function(){
            let currentDifficulty = document.getElementById("difficulty-selector").value

            var currentSurvivalSettings;
            switch(currentDifficulty){
                case "Easy":
                    currentSurvivalSettings = easySettings;
                    break;
                case "Medium":
                    currentSurvivalSettings = mediumSettings;
                    break;
                case "Hard":
                    currentSurvivalSettings = hardSettings;
                    break;
            }

            var targetSettingValue = `${currentSurvivalSettings.gameSize}x${currentSurvivalSettings.gameSize}`
            for(let i=0; i < 6; i++){
                $("#current-difficulty-effects li").eq(i).find("div").eq(1).text(targetSettingValue);

                switch(true){ // Update target setting text
                    case i == 0:
                        targetSettingValue = `${currentSurvivalSettings.snakeStartLength} units`;
                        break;
                    case i == 1:
                        targetSettingValue = `every ${currentSurvivalSettings.snakeGrowthInterval}s`;
                        break;
                    case i == 2:
                        targetSettingValue = `${currentSurvivalSettings.snakeMoveSpeed} u/s`;
                        break;
                    case i == 3:
                        targetSettingValue = `every ${currentSurvivalSettings.startEnemySpawnInterval}s`;
                        break;
                    case i == 4:
                        targetSettingValue = `every ${currentSurvivalSettings.minEnemySpawnInterval}s`;
                        break;
                }
            }

            $("#current-difficulty-header").text("Current Difficulty Choice: " + currentDifficulty)
        })

        $("#how-to-play-text").text("Use W, A, S, and D or the Arrow Keys to move. Your snake, the green snake, will grow automatically and the red snakes are the enemies which appear periodically. Hitting the border, enemies, or your own snake will cause the game to end.")
    }



    //create play game button
    $("#main-menu-button").on("click", function(){
        window.location.href = "../index.html";
    })
    $("#play-button").on("click", function(){
        switch(gameMode){
            case "Survival":
                localStorage.setItem("SuperSnake3000-Settings-SurvivalDifficulty", document.getElementById("difficulty-selector").value)
                break

        }

        window.location.href = "game.html";
    })
})