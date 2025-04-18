// Wait for document to be ready before execution
$(function(){

    // Hide scores before game has started
    $(".start-hidden").slideUp();

    var gameHeight;
    var gameInterval;
    
    
    let snakeDirection = "None";
    var lastMove = "None";

    let snakeHeadPos = [25, 25];
    var snakeState = [[25, 25]];
    var applePos = [0, 0];
    var survivalTime = 0;
    var snakeLength = 1;

    // Handle Button Presses
    $("body").on("keydown", function(event){
        switch(event.code){
            // Up Direction
            case "ArrowUp":
                if(lastMove == "Down"){break;}

                snakeDirection = "Up";
                break;
            case "KeyW":
                if(lastMove == "Down"){break;}

                snakeDirection = "Up";
                break;
            // Right Direction
            case "ArrowRight":
                if(lastMove == "Left"){break;}

                snakeDirection = "Right";
                break;
            case "KeyD":
                if(lastMove == "Left"){break;}

                snakeDirection = "Right";
                break;
            // Down Direction
            case "ArrowDown":
                if(lastMove == "Up"){break;}

                snakeDirection = "Down";
                break;
            case "KeyS":
                if(lastMove == "Up"){break;}

                snakeDirection = "Down";
                break;
            // Left Direction
            case "ArrowLeft":
                if(lastMove == "Right"){break;}

                snakeDirection = "Left";
                break;
            case "KeyA":
                if(lastMove == "Right"){break;}

                snakeDirection = "Left";
                break;
        }
    })

    function endGame(causeOfDeath="the border"){
        clearInterval(gameInterval);

        // Get final Time
        let timeText = (survivalTime /10).toString();
        // If the time is a whole number, add the decimal point for clarity
        if(timeText[timeText.length -2] != "."){
            timeText = timeText + ".0"
        }
        timeText = timeText + "s"

        let formattedSnakeLength;

        // Get final snake length with proper units
        if(snakeLength == 1){
            formattedSnakeLength = `${snakeLength} unit`;
        }
        else{
            formattedSnakeLength = `${snakeLength} units`
        }

        let finalScoresHTML = `<h2>Your Final Scores:</h2> <h3>Final Snake Length: ${formattedSnakeLength}</h3> <h3>Total Survival Time: ${timeText}</h3>`;
        let gameGridHTML = `<div style="text-align:center;"> <h1 style="margin-bottom:0.25rem;">You Lose!</h1> <h4 style="margin-top:0.25rem;">You died to ${causeOfDeath}</h4> <hr> ${finalScoresHTML} <br><hr><br> <p>Press the "Start Game" button above to restart the game.</p> </div>`

        $("#game-grid").html(gameGridHTML)
        $("#game-grid").css({"background-color": "black", "color": "white"});
        $("#game-grid h3").css("margin", "0.2rem")
        $("#game-grid hr").css({"margin": "auto", "width": "50%"})

        $("#score-section").slideUp(100);
        $("#game-control-buttons-container").slideDown(100);
    }

    function drawGameState(){
        // Reset all pixels to black
        $("#game-grid .col").css("background-color", "black");

        // Draw Apple
        $(`#game-grid #row-${applePos[0]} #col-${applePos[1]}`).css("background-color", "red");

        // Draw Snake
        for (segment of snakeState){
            $(`#game-grid #row-${segment[0]} #col-${segment[1]}`).css("background-color", "green");
        }

        // Update the score headers
        if(snakeLength == 1){
            $("#length-score-header").text(`Snake Length: ${snakeLength} unit`)
        }
        else{
            $("#length-score-header").text(`Snake Length: ${snakeLength} units`)
        }


        let timeText = (survivalTime /10).toString();
        // If the time is a whole number, add the decimal point for clarity
        if(timeText[timeText.length -2] != "."){
            timeText = timeText + ".0"
        }
        $("#time-score-header").text(`Survival Time: ${timeText}s`)
    }

    // gameUpdate is called every fifth of a second (200ms)
    function gameUpdate(){

        // Find and store the position that the snake is trying to move to
        //      The snake pos is stored as: [y, x]
        switch(snakeDirection){
            case "Up":
                snakeHeadPos[0]--;
                break;
            case "Right":
                snakeHeadPos[1]++;
                break;
            case "Down":
                snakeHeadPos[0]++;
                break;
            case "Left":
                snakeHeadPos[1]--;
                break;
            default:
                // No valid direction given so don't so anything
                drawGameState();
                return;
        }

        lastMove = snakeDirection;

        if(snakeHeadPos[0] >= 50 || snakeHeadPos[1] >= 50 || snakeHeadPos[0] < 0 || snakeHeadPos[1] < 0){
            // If player hits border
            console.log(`You hit border: ${snakeHeadPos}`);
            endGame("the border");
            return;
        }

        for(segment of snakeState){            
            // Check to see if snake ran into itself
            if(segment[0] == snakeHeadPos[0] && segment[1] == snakeHeadPos[1]){
                // If player hits snake
                console.log(`You hit yourself: \n Head Pos:${snakeHeadPos}\n Segment: ${segment}`);
                console.table(snakeState)
                endGame("yourself");
                return;
            }
        } 
        
        let hasHitApple = false;
        // Check to see if snake hit apple
        if(snakeHeadPos[0] == applePos[0] && snakeHeadPos[1] == applePos[1]){
            hasHitApple = true;

            //reset apple pos
            while(true){
                applePos = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)]

                let isAppleCollision = false;
                for(segment of snakeState){                  
                    if(segment == applePos){
                        isAppleCollision = true;
                    }
                } 

                if(!isAppleCollision){
                    break;
                }
            }

            // Increase the snake length score
            snakeLength++;
        }

        // add new snake segment into snake state (at end of array)
        snakeState.push(Array.from(snakeHeadPos));
        
        // snake grows by not removing oldest snake segment after eating an apple
        if(!hasHitApple){
            snakeState.shift();// remove oldest snake segment
        }

        survivalTime += 2; // survival time is a fixed point number so this adds .2
        drawGameState();
    }

    $("#start-button").on("click", function(){

        $("#game-control-buttons-container").slideUp(150);

        // Set the sides of the game-grid to 75% of the window width or height depending on which is smaller.
        // The game grid is a square so the height is also the width
        gameHeight = 0.75 * Math.min(window.innerWidth, window.innerHeight);

        // Ensure the score section has the same width as the game-grid
        $("#score-section").css("width", gameHeight)

        //Animate the game-grid to the proper size and content
        $("#game-grid").fadeOut(100) //animate old content away
        setTimeout(function(){
            //Set new content
            let newHTML = "";

            // Create 50 rows
            for(let i=0; i < 50; i++){
                newHTML += `<div id="row-${i}" class="row">`

                // Create 50 columns in each row
                for(let j=0; j < 50; j++){
                    // Create 50 columns in each row
                    newHTML += `<div id="col-${j}" class="col"></div>`

                }

                newHTML += "</div>" //Close the row div
            }

            $("#game-grid").html(newHTML) //Set new HTML

            $("#game-grid .row").css({
                "display": "flex"
            })
            $("#game-grid .col").css({
                "width": gameHeight/50,
                "height": gameHeight/50,
                "background-color": "#000000"
            })
            $("#game-grid").css({
                "width": `${gameHeight}px`,
                "height": `${gameHeight}px`,
                "padding": "0.05rem"
            })

            
        }, 125)

        setTimeout(function(){
            $("#game-grid").fadeIn(500); 
        }, 175)

        // Start game after animation finishes
        setTimeout(function (){   
            snakeDirection = "None";
            lastMove = "None";

            // Set starting positions for things
            snakeHeadPos = [25, 25];
            snakeState = [[25, 25]];
            applePos = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)];

            snakeLength = 1;
            survivalTime = 0;

            $("#score-section").slideDown();

            gameInterval = setInterval(gameUpdate, 200);
        }, 700)
    })

    $("#htp-button").on("click", function(){
        let htpIntroText = "Survive as long as possible without hitting the border or yourself while eating as many apples as possible to grow longer to try to take up all 250 spaces of the 50x50 grid!"
        let htpLayoutText = "This version of snake takes place in 50 by 50 grid with a total of 250 spaces. You are a green snake who starts with a length of 1 unit who gains an additional unit of length by eating a red apple. Your snake always starts in the middle of the grid, but the apple's position is randomized."
        let htpControlsText = "You can use either W, A, S, and D to move up, left, down, and right respectively or the arrow keys the move in the same direction the key faces. "
        
        $("#game-grid").html(`<div style="margin: 0 5%;"> <p style="text-indent:0rem;">${htpIntroText}</p> <h3>Layout</h3> <p>${htpLayoutText}</p> <h3>Controls</h3> <p>${htpControlsText}</p> </div>`)
        $("#game-grid p").css("text-indent", "1.5rem")
        $("#game-grid p").eq(0).css("text-indent", "0")
    })

})