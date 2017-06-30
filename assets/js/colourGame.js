var squares = document.querySelectorAll(".square");
var restartButton = document.querySelector("#restart");
var easyButton = document.querySelector("#easyButton");
var normalButton = document.querySelector("#normalButton");
var hardButton = document.querySelector("#hardButton");

function main(){
  for(var i=0; i<squares.length; i++){
    assignRandomColour(squares[i]);
    // Add a click listener to each tile.
    squares[i].addEventListener("click", function(){
      var clickedColour = this.style.backgroundColor;
      // If the tile clicked on has the "goal colour".
      if(clickedColour === goalColour){
        document.querySelector("#message").textContent = "Correct";
        document.querySelector("h1").style.backgroundColor = goalColour;
        for(var j=0; j<squares.length; j++){
          squares[j].style.backgroundColor = goalColour;
        }
        restartButton.textContent = "Play again";
      }
      // If the tile clicked on has NOT the "goal colour".
      else{
        document.querySelector("#message").textContent = "Try Again";
        this.style.backgroundColor = "#232323";
        restartButton.textContent = "New colours";
      }
    });
  }
  // Display the RGB value of the goal colour.
  var goalColour = assignGoalColourHard();
  var colourDisplay = document.querySelector("#colourDisplay");
  colourDisplay.textContent = goalColour;

  // If the restart button is clicked assign new random colours to the tiles and select a new goal colour.
  restartButton.addEventListener("click", function(){
    // If the mode is set on hard ->
    if(hardButton.classList.contains("selected")){
      for(var i=0; i<squares.length; i++){
        assignRandomColour(squares[i]);
      }
      goalColour = assignGoalColourHard();
      colourDisplay = document.querySelector("#colourDisplay");
      colourDisplay.textContent = goalColour;
      document.querySelector("h1").style.backgroundColor = "steelblue";
    }
    // If the mode is set on easy ->
    else{
      for(var i=0; i<squares.length; i++){
        assignRandomColour(squares[i]);
      }
      goalColour = assignGoalColourEasy();
      colourDisplay = document.querySelector("#colourDisplay");
      colourDisplay.textContent = goalColour;
      document.querySelector("h1").style.backgroundColor = "steelblue";
    }
  });

  // If the easy mode is selected.
  easyButton.addEventListener("click", function(){
    hardButton.classList.remove("selected");
    normalButton.classList.remove("selected");
    easyButton.classList.add("selected");
    for(var i=0; i<squares.length-6; i++){
      assignRandomColour(squares[i]);
    }
    for(var j=3; j<squares.length; j++){
      squares[j].style.display = "none";
    }
    goalColour = assignGoalColourEasy();
    colourDisplay = document.querySelector("#colourDisplay");
    colourDisplay.textContent = goalColour;
    document.querySelector("h1").style.backgroundColor = "steelblue";
  });

  // If the normal mode is selected.
  normalButton.addEventListener("click", function(){
    hardButton.classList.remove("selected");
    normalButton.classList.add("selected");
    easyButton.classList.remove("selected");
    for(var i=0; i<squares.length-3; i++){
      assignRandomColour(squares[i]);
    }
    for(var j=6; j<squares.length; j++){
      if(squares[j].style.display === "none"){
        squares[j].style.display = "block";
      }
      else{
        squares[j].style.display = "none";
      }
    }
    goalColour = assignGoalColourEasy();
    colourDisplay = document.querySelector("#colourDisplay");
    colourDisplay.textContent = goalColour;
    document.querySelector("h1").style.backgroundColor = "steelblue";
  });

  // If the hard mode is selected.
  hardButton.addEventListener("click", function(){
    hardButton.classList.add("selected");
    normalButton.classList.remove("selected");
    easyButton.classList.remove("selected");
    for(var i=0; i<squares.length; i++){
      assignRandomColour(squares[i]);
      squares[i].style.display = "block";
    }
    goalColour = assignGoalColourHard();
    colourDisplay = document.querySelector("#colourDisplay");
    colourDisplay.textContent = goalColour;
    document.querySelector("h1").style.backgroundColor = "steelblue";
  });
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

// Assign the goal colour for hard mode (one of 9 tiles).
function assignGoalColourHard(){
  var squareSize = squares.length;
  var randomSquare = Math.floor((Math.random() * squareSize) + 1) - 1;
  var goalColour = squares[randomSquare].style.backgroundColor;
  return goalColour;
}
// Assign the goal colour for normal mode (one of 6 tiles).
function assignGoalColourNormal(){
  var squareSize = squares.length - 3;
  var randomSquare = Math.floor((Math.random() * squareSize) + 1) - 1;
  var goalColour = squares[randomSquare].style.backgroundColor;
  return goalColour;
}
// Assign the goal colour for easy mode (one of 3 tiles).
function assignGoalColourEasy(){
  var squareSize = squares.length - 6;
  var randomSquare = Math.floor((Math.random() * squareSize) + 1) - 1;
  var goalColour = squares[randomSquare].style.backgroundColor;
  return goalColour;
}

main();
