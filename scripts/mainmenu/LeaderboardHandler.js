// Handles loading the Leaderboard

$(function (){

    var easyLeaderboardValue;
    var mediumLeaderboardValue;
    var hardLeaderboardValue;

    // createTestLeaderboardData()
    // clearLeaderboardData();

    try{
        localStorage.setItem("SuperSnakeTest-1234567890", 1234567890);
        localStorage.removeItem("SuperSnakeTest-1234567890");
    }
    catch (error){
        $(".leaderboard-values p").text("This browser does not support LocalStorage OR LocalStorage is disabled; the leaderboard is unavailable as a result.")
        return; //can't make leaderboard if can't retrieve leaderboard data
    }

    //must support local storage, so retrive the data
    easyLeaderboardValue = localStorage.getItem("SuperSnake3000EasyLeaderboard")
    mediumLeaderboardValue = localStorage.getItem("SuperSnake3000MediumLeaderboard")
    hardLeaderboardValue = localStorage.getItem("SuperSnake3000HardLeaderboard")

    //The local storage data structure for the Leaderboards:
    // "firstPlacesName, firstPlaceScore | secondPlacesName, secondPlaceScore | ... and so on "

    //Add easy leaderboard's values
    var position = 1;
    if (easyLeaderboardValue != null){
        $("#easy-leaderboard .leaderboard-values").html("") //clear out current values / placeholder

        easyLeaderboardValue.split(" | ").forEach((element) => {
            var currentData = element.split(", "); //current data will be an array set up like: [playerName, playerScore]
    
            let playerNameLabel = `<div>${position}. <span class="player-name">${currentData[0]}</span></div>`
            let scoreLabel = `<div>${currentData[1]}s</div>`
            $("#easy-leaderboard .leaderboard-values").append(`<li> ${playerNameLabel} ${scoreLabel} </li>`)
    
            position++;
        });
    }

    //add medium leaderboard's values
    position = 1;
    if (mediumLeaderboardValue != null){
        $("#medium-leaderboard .leaderboard-values").html("") //clear out current values / placeholder

        mediumLeaderboardValue.split(" | ").forEach((element) => {
            var currentData = element.split(", "); //current data will be an array set up like: [playerName, playerScore]
    
            let playerNameLabel = `<div>${position}. <span class="player-name">${currentData[0]}</span></div>`
            let scoreLabel = `<div>${currentData[1]}s</div>`
            $("#medium-leaderboard .leaderboard-values").append(`<li> ${playerNameLabel} ${scoreLabel} </li>`)
    
            position++;
        });
    }

    //add hard leaderboard's values
    position = 1;
    if (hardLeaderboardValue != null){
        $("#hard-leaderboard .leaderboard-values").html("") //clear out current values or placeholder

        hardLeaderboardValue.split(" | ").forEach((element) => {
            var currentData = element.split(", "); //current data will be an array set up like: [playerName, playerScore]
    
            let playerNameLabel = `<div>${position}. <span class="player-name">${currentData[0]}</span></div>`
            let scoreLabel = `<div>${currentData[1]}s</div>`
            $("#hard-leaderboard .leaderboard-values").append(`<li> ${playerNameLabel} ${scoreLabel} </li>`)
    
            position++;
        });
    }

    $(".leaderboard-title").on("dblclick", function(){

        //confirm they want to reset the leaderboard by making them type "reset"
        if ( prompt(`Type "reset" to confirm resetting the leaderboard`).toLowerCase() == "reset"){

            $(this).parent().find(".leaderboard-values").html(`<p>There are no entries in this leaderboard</p>`)
            let targetLeaderboard = $(this).text()
            localStorage.removeItem("SuperSnake3000" + targetLeaderboard + "Leaderboard") //clear leaderboard in local storage
        }
    })

    function createTestLeaderboardData(){
        localStorage.setItem("SuperSnake3000EasyLeaderboard", `Player Name 1, 20.3 | Player Name 2, 25.3`)
        localStorage.setItem("SuperSnake3000MediumLeaderboard", `Player Name 1, 30.7 | Player Name 2, 35.5`)
        localStorage.setItem("SuperSnake3000HardLeaderboard", `Player Name 1, 40.1 | Player Name 2, 45.9`)
    }
    
    function clearLeaderboardData(){
        localStorage.removeItem("SuperSnake3000EasyLeaderboard")
        localStorage.removeItem("SuperSnake3000MediumLeaderboard")
        localStorage.removeItem("SuperSnake3000HardLeaderboard")
    }

})