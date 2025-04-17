// Wait for document to be ready before execution
$(function(){

    var gameHeight;
    // var gameState = [];
    var gameInterval;
    
    
    let snakeDirection = "None";
    var lastMove = "None";

    let snakeHeadPos = [25, 25];
    var snakeState = [[25, 25]];
    var applePos = [0, 0];
    var survivalTime = 0;

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

    function endGame(){
        clearInterval(gameInterval);

        $("#game-grid").html(`<div class="centering-div"> <h2>You Lose!</h2> </div>`)
        $("#game-grid").css("background-color", "black");
        $("#game-grid h2").css("color", "white")
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
    }

    // gameUpdate is called every fifth of a second (200ms)
    function gameUpdate(){

        // The snake pos is stored as: [y, x]
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
            endGame();
            return;
        }

        for(segment of snakeState){            
            // Check to see if snake ran into itself
            if(segment[0] == snakeHeadPos[0] && segment[1] == snakeHeadPos[1]){
                // If player hits snake
                console.log(`You hit yourself: \n Head Pos:${snakeHeadPos}\n Segment: ${segment}`);
                console.table(snakeState)
                endGame();
                return;
            }
        } 
        
        // console.log(`Collision check:\nTime: ${survivalTime}\nApple Pos:${applePos}\nSnake Head Pos: ${snakeHeadPos}`)
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
            console.log(`Updated Apple Pos: ${applePos}`)
        }

        // add new snake segment into snake state (at end of array)
        snakeState.push(Array.from(snakeHeadPos));
        
        // snake grows by not removing oldest snake segment after eating an apple
        if(!hasHitApple){
            snakeState.shift();// remove oldest snake segment

            // console.log(`Removed: ${snakeState.shift()}`) 
        }

        drawGameState();
        survivalTime += 0.2;
    }

    $("#start-button").on("click", function(){

        $("#game-control-buttons-container").slideUp(150);

        //set the sides of the game-grid to 75% of the window width or height depending on which is smaller.
        gameHeight = 0.75 * Math.min(window.innerWidth, window.innerHeight);
        console.log(`Win Width is ${window.innerWidth}px`)
        console.log(`Win Height is ${window.innerHeight}px`)
        console.log(`Game Grid Size is ${gameHeight}x${gameHeight}px`)

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

            snakeHeadPos = [25, 25];
            snakeState = [[25, 25]];
            applePos = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)];

            survivalTime = 0;

            gameInterval = setInterval(gameUpdate, 200);
        }, 700)
    })

})