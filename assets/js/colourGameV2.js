// Heb het al een keer opgeschoond, het is nog steeds best nat (✖╭╮✖);

var squares = document.querySelectorAll(".square");
var restartButton = document.querySelector("#restart");
var easyButton = document.querySelector("#easyButton");
var normalButton = document.querySelector("#normalButton");
var hardButton = document.querySelector("#hardButton");
var messageDisplay = document.querySelector("#message");
var colourDisplay = document.querySelector("#colourDisplay");
var header = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
var goalColour;

// Assign a random colour to each square and give each square a click listener.
function setupSquares(){
  for(var i=0; i<squares.length; i++){
    assignRandomColour(squares[i]);
    // Add a click listener to each tile.
    squares[i].addEventListener("click", function(){
      var clickedColour = this.style.backgroundColor;
      // If the tile clicked on has the "goal colour".
      if(clickedColour === goalColour){
        messageDisplay.textContent = "Correct";
        header.style.backgroundColor = goalColour;
        changeAllColours(goalColour);
        restartButton.textContent = "Play again";
      }
      // If the tile clicked on has NOT the "goal colour".
      else{
        messageDisplay.textContent = "Try Again";
        this.style.backgroundColor = "#232323";
        restartButton.textContent = "New colours";
      }
    });
  }
}

// Change all the squares to the goal colour.
function changeAllColours(colour){
  for(var i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = colour;
  }
};

// Reset the colours of the squares when the restart button is clicked.
function restartGame(){
  goalColour = assignGoalColour(0);
  colourDisplay.textContent = goalColour;
  messageDisplay.textContent = "";
  this.textContent = "New colours";
  // If the restart button is clicked assign new random colours to the tiles and select a new goal colour.
  restartButton.addEventListener("click", function(){
    if(hardButton.classList.contains("selected")){
      for(var i=0; i<squares.length; i++){
        assignRandomColour(squares[i]);
      }
      goalColour = assignGoalColour(0);
      colourDisplay.textContent = goalColour;
      header.style.backgroundColor = "steelblue";
    }
    else if(normalButton.classList.contains("selected")){
      for(var i=0; i<squares.length-3; i++){
        assignRandomColour(squares[i]);

      }
      goalColour = assignGoalColour(3);
      colourDisplay.textContent = goalColour;
      header.style.backgroundColor = "steelblue";
    }
    else{
      for(var i=0; i<squares.length-6; i++){
        assignRandomColour(squares[i]);
      }
      goalColour = assignGoalColour(6);
      colourDisplay.textContent = goalColour;
      header.style.backgroundColor = "steelblue";
    }
  });
}

// Show and hide the appropiate amount of squares depending on the difficulty mode ->
// Add colours to these squares.
function setupModes(){
  goalColour = assignGoalColour(0);
  colourDisplay.textContent = goalColour;
  messageDisplay.textContent = "";
  this.textContent = "New colours";

  for(var i=0; i<modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      // this references the clicked on mode button.
      this.classList.add("selected");
      if(this.textContent === "Hard"){
        for(var i=0; i<squares.length; i++){
          assignRandomColour(squares[i]);
          squares[i].style.display = "block";
        }
        goalColour = assignGoalColour(0);
        colourDisplay.textContent = goalColour;
        header.style.backgroundColor = "steelblue";
      }
      else if(this.textContent === "Normal"){
        for(var i=0; i<squares.length-3; i++){
          assignRandomColour(squares[i]);
          squares[i].style.display = "block";
        }
        for(var j=6; j<squares.length; j++){
          squares[j].style.display = "none";
        }
        goalColour = assignGoalColour(3);
        colourDisplay.textContent = goalColour;
        header.style.backgroundColor = "steelblue";
      }
      else{
        for(var i=0; i<squares.length-6; i++){
          assignRandomColour(squares[i]);
        }
        for(var j=3; j<squares.length; j++){
          squares[j].style.display = "none";
        }
        goalColour = assignGoalColour(6);
        colourDisplay.textContent = goalColour;
        header.style.backgroundColor = "steelblue";
      }
    });
  }
}

// Assign a random colour to a tile.
function assignRandomColour(square){
  var max = 255;
  var min = 1;
  var r = Math.floor((Math.random() * max) + min);
  var g = Math.floor((Math.random() * max) + min);
  var b = Math.floor((Math.random() * max) + min);
  var randomColour = "rgb("+ r + ", " + g + ", " + b + ")";
  square.style.backgroundColor = randomColour;
}

// Assign a random square as the goal colour of the current session.
function assignGoalColour(x){
  var squareSize = squares.length - x;
  var randomSquare = Math.floor((Math.random() * squareSize) + 1) - 1;
  var goal = squares[randomSquare].style.backgroundColor;
  return goal;
}

// Run the game.
function main(){
  setupSquares();
  restartGame();
  setupModes();
}

main();
