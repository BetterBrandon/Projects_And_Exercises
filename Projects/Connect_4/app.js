

let body = document.querySelector("body");
let gameBoard = [];
let isPlayerOneTurn = true;
let columnLetters = ["", "A", "B", "C", "D", "E", "F", "G"];
let playerOne = { myCurrentTurn: true, numberOfChips: 21, color: "red", selector: document.querySelector("#p1-count") };
let playerTwo = { numberOfChips: 21, color: "yellow", selector: document.querySelector("#p2-count") };


// This is how the connect 4 board gets generated soley by JS
function createGameBoard() {
    let table = body.appendChild(document.createElement("table"));
    let newRow = document.createElement("tr");
    table.appendChild(newRow);

    let rowNums = [1, 2, 3, 4, 5, 6];
    let rowPositionCounter = 0;

    // Generate the column headers of A - G
    for (letter of columnLetters) {

        let cl = document.createElement("th");
        cl.innerText = letter;
        cl.classList = "board-headers";
        newRow.appendChild(cl);

        if (letter !== "")
            gameBoard[letter] = [];
    }

    newRow = document.createElement("tr");
    table.appendChild(newRow);

    // Looping through all the spaces on the board after the column headers have been placed
    let columnLetterCounter = 1;
    // Generate the row headers on the left
    for (let i = 0; i < 42; i++) {
        if (i % 7 === 0) {
            newRow = document.createElement("tr");
            table.appendChild(newRow);
            let td = document.createElement("th");
            td.innerText = rowNums[rowPositionCounter++];
            td.classList = "board-headers";
            newRow.appendChild(td);

            columnLetterCounter = 1;

        }

        // Create the individual blank spaces on the board for the chips to go into with unique ids.
        let td = document.createElement("td");
        td.id = `loc-${i}`;
        // td.innerText = i;
        td.classList = "board";

        // Putting all the chip's information for that individual spot onto the gameBoard[], which oversees the game. 
        const chipSpace = { column: columnLetters[columnLetterCounter], location: i, isTaken: false }
        gameBoard[columnLetters[columnLetterCounter]].push(chipSpace);

        // Adding event lisenters to each chip space on the board
        td.addEventListener("click", function (e) {

            if (playerOne.myCurrentTurn === true) {
                placementOfChip(chipSpace, playerOne);
                playerOne.myCurrentTurn = false;
                playerOne.numberOfChips--;
                playerOne.selector.innerText = playerOne.numberOfChips;
                // checkForWinner(playerOne);

            }
            else {
                placementOfChip(chipSpace, playerTwo);
                playerOne.myCurrentTurn = true;
                playerTwo.numberOfChips--;
                playerTwo.selector.innerText = playerTwo.numberOfChips;
                // checkForWinner(playerTwo);

            }

            // If all chips were used, and the game is a tie we then give the option to reset. 
            if (playerOne.numberOfChips === 0 && playerTwo.numberOfChips === 0) {
                // The following allows the board to "turn off" the even listener for each space
                let allTd = document.querySelectorAll("td");
                for (td of allTd)
                    td.style.pointerEvents = "none";

                asyncCall("All chips used, no winners! Hit the rest button to play again!");
                gameReset();
            }

            // Check for all the possible solutions to winning
            checkForColumnWinner();
            checkForRowWinner();
            checkForDiagonalWinner();
        })
        // Append each chip space to the row of the table
        newRow.appendChild(td);
        columnLetterCounter++;
    }
}

function checkForDiagonalWinner() {
    let row = 6;
    let col = 7;
    let connectFourWinner = { count: 0, color: "" };

    for (let line = 1; line <= (row + col - 1); line++) {
        let start_col = max(0, line - row);
        let count = min(line, (col - start_col), row);

        connectFourWinner.count = 0;
        connectFourWinner.color - "";

        // This iteration checks diagonally going A1, A2, B1, A3, B2, C1, so on
        // Going from top left to bottom right
        for (let j = 0; j < count; j++) {
            let currentChip = gameBoard[columnLetters[start_col + j + 1]][min(row, line) - j - 1];

            if (currentChip.isTaken === false) {
                connectFourWinner.count = 0;
            }
            else {
                updateCurrentWinner(connectFourWinner, currentChip);
            }
        }

        // Once we complete the first iteration and there is no winner, reset the connectFourWinner object for next iteration
        connectFourWinner.count = 0;
        connectFourWinner.color - "";

        // This iteration checks diagonally going A6, A5, B6, A4, B5, C6, so on 
        // Going from bottom left to top right
        for (j = 0; j < count; j++) {
            let currentChip = gameBoard[columnLetters[start_col + j + 1]][max(row - line, 0) + j];
            if (currentChip.isTaken === false) {
                connectFourWinner.count = 0;
            }
            else {
                updateCurrentWinner(connectFourWinner, currentChip);
            }
        }
    }

}

// min and max are helper functions for checking the diagonal score of the game
function min(a, b) {
    return (a < b) ? a : b;
}

function _min(a, b, c) {
    return min(min(a, b), c);
}

function max(a, b) {
    return (a > b) ? a : b;
}

function checkForRowWinner() {
    let connectFourWinner = { count: 0, color: "" };

    for (let i = 5; i >= 0; i--) {
        for (letter of columnLetters) {
            // Skip the space in the top left corner of the board
            if (letter === "")
                continue;

            let currentChip = gameBoard[letter][i];

            // Outer loop checks the rows, inner loop goes by column. 
            // If there is an empty space in the row, we restart the count
            if (currentChip.isTaken === false) {
                connectFourWinner.count = 0;
            }
            else {
                updateCurrentWinner(connectFourWinner, currentChip);
            }

        }
    }
}

function checkForColumnWinner() {
    let connectFourWinner = { count: 0, color: "" };

    // Outer loop goes by column, inner loop goes by row starting at 6 working up 
    for (letter of columnLetters) {
        if (letter === "")
            continue;

        let currentCol = gameBoard[letter];
        for (let i = 5; i >= 0; i--) {
            let currentChip = currentCol[i];

            // To speed up the process, if there is not a chip in the column that is taken by player 1 or 2. 
            // And it's less than 4 in a column. It skips to check the next column and restarts the count
            if (currentChip.isTaken === false) {
                connectFourWinner.count = 0;
                break;
            }

            else {
                updateCurrentWinner(connectFourWinner, currentChip);
            }
        }
    }
}

// This function checks if there are 4 chip spaces in a row either diagonally, by row, or by column
async function updateCurrentWinner(connectFourWinner, currentChip) {
    if (connectFourWinner.color === currentChip.colorTaken) {
        connectFourWinner.count++;
    }
    else {
        connectFourWinner.color = currentChip.colorTaken;
        connectFourWinner.count = 1;
    }

    if (connectFourWinner.count === 4) {
        let result = "";

        // This stops the players from dropping more chips on the board.
        // Allows players to look at how the winner won before resetting the game. 
        let allTd = document.querySelectorAll("td");
        for (td of allTd)
            td.style.pointerEvents = "none";


        if (connectFourWinner.color === playerOne.color) {
            result = "Player One is the winner! Hit the reset button for a new game!";
        }
        else {
            result = "Player Two is the winner! Hit the reset button for a new game!";
        }
        // Created an async call so the chip can fall, then declare the winner. 
        // Otherwise the alert would trigger before the chip would fall on the board
        asyncCall(result);

        gameReset();

    }
}

// The reset button is loaded initally but hidden until either a player wins the game or a tie (all chips used) is announced. 
function gameReset() {
    // This allows the button to show on the page
    let resetButton = document.querySelector("#resetButton");
    resetButton.removeAttribute("hidden");

    resetButton.addEventListener("click", function () {
        // Once we click the button, we hide it so players can not reset mid game
        resetButton.setAttribute("hidden", "hidden");

        // Removing the table allows to clear the the gameboard
        let table = document.querySelector("table");
        table.remove();

        // Reset the number of player chips, and by default have player 1 start the game
        playerOne.numberOfChips = 21;
        playerOne.selector.innerText = 21
        playerOne.myCurrentTurn = true;
        playerTwo.numberOfChips = 21;
        playerTwo.selector.innerText = 21;

        // Recreate the gameboard
        createGameBoard();
    })
}

// Helper functions for async function
function resolve(msg) {
    return new Promise(resolve => {
        setTimeout(() => {
            alert(msg);
        }, 200);
    });
}

async function asyncCall(msg) {
    await resolve(msg);
}


// When a player selects any position in a column, we start from row 6 working up to place chips
function placementOfChip(position, player) {

    let currentCol = gameBoard[position.column];
    for (let i = 5; i >= 0; i--) {
        let currentChip = currentCol[i];
        // In the column, if there is an available free space it will be taken by the current player's color chip
        if (currentChip.isTaken === false) {
            let chipSpace = document.querySelector(`#loc-${currentChip.location}`);
            chipSpace.style.backgroundColor = player.color;
            currentChip.isTaken = true;
            currentChip.colorTaken = player.color;
            break;
        }
    }
}

createGameBoard();