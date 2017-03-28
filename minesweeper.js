document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

// Stretch Goal 1 - Automatic board generation

// Function generates a random number between 0 and 1
function randomNumber() {
  return Math.round(Math.random());
}

// Function to lay mines
// Lays one mine randomly
// Needs some work
function layMines(board) {
  randNumber = Math.floor(Math.random() * 16) + 1;
  for(var i = 0; i < board.cells.length; i++ ) {
    board.cells[randNumber].isMine = true;
  }
  return board;
}


// Generates a random board
function newBoard() {
  var board = {};
  board['cells'] = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      board.cells.push({row: i, col: j, isMine: false, hidden: true});
    }
  }
  layMines(board);
  return board;
}

// Resets game
function resetGame() {
  boardHtml = document.getElementsByClassName('board');
  boardHtml[0].innerHTML = " ";
  startGame();
}

// Checks for the BOOM!
function checkBoom() {
  var mainDiv = document.getElementById("message");
  var messageTag = mainDiv.getElementsByTagName("p");
  if (messageTag[0] === "<p>BOOM!</p>") {
    var audio = document.getElementsByTagName("audio")[2];
    audio.play();
  }
}


function startGame () {
  board = newBoard();

  lib.initBoard();
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
  // Event listener to check for rest game button being clicked
  var e = document.getElementById("resetGame");
  e.addEventListener("click", resetGame, false);

  for(var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {

    for(var i = 0; i < board.cells.length; i++) {
      if(board.cells[i].isMine === true && board.cells[i].isMarked === true) {
        // We have a marked mine
      } else if (board.cells[i].hidden !== true) {
        // Cell is hidden
      } else {
        // We either have an unmarked mine or a hidden cell, so return out.
        // This will force the checkForWin function to end and will not trigger
        // the win condition outside of the for loop.
        return;
      }
    }

    // We win! So display message
    var audio = document.getElementsByTagName("audio")[0];
    audio.play();
    lib.displayMessage('You win!');

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for(var i = 0; i < surroundingCells.length; i++) {
    if(surroundingCells[i].isMine == true) {
      count++;
    }
  }
  return count;
}
