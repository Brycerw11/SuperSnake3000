// Handles loading the Leaderboard

$(function (){

    var easyLeaderboardValue;
    var mediumLeaderboardValue;
    var hardLeaderboardValue;

    createTestLeaderboardData()

    try{
        easyLeaderboardValue = localStorage.getItem("SuperSnake3000EasyLeaderboard")
        mediumLeaderboardValue = localStorage.getItem("SuperSnake3000MediumLeaderboard")
        hardLeaderboardValue = localStorage.getItem("SuperSnake3000HardLeaderboard")
    }
    catch (error){
        $(".leaderboard-values p").text("This browser does not support LocalStorage OR LocalStorage is disable; the leaderboard is unavailable as a result.")
        return; //can't make leaderboard if can't retrieve leaderboard data
    }

    easyLeaderboardArray = easyLeaderboardValue.split(" | ")
    mediumLeaderboardArray = easyLeaderboardValue.split(" | ")
    hardLeaderboardArray = easyLeaderboardValue.split(" | ")   


    function createTestLeaderboardData(){
        localStorage.setItem("SuperSnake3000EasyLeaderboard", `Player Name 1, 20 | Player Name 2, 25`)
        localStorage.setItem("SuperSnake3000MediumLeaderboard", `Player Name 1, 20 | Player Name 2, 25`)
        localStorage.setItem("SuperSnake3000HardLeaderboard", `Player Name 1, 20 | Player Name 2, 25`)
    }
    
    function clearLeaderboardData(){
        localStorage.setItem("SuperSnake3000EasyLeaderboard", null)
        localStorage.setItem("SuperSnake3000MediumLeaderboard", null)
        localStorage.setItem("SuperSnake3000HardLeaderboard", null)
    }

})