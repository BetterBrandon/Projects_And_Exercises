let score = document.querySelector("h1");
let pOne = document.querySelector("#pOne");
let pTwo = document.querySelector("#pTwo");
let reset = document.querySelector("#reset");
let select = document.querySelector("select")

let playerOne_count = 0, playerTwo_count = 0;
let numRounds = 0;

function startGame() {
    selectRounds();
    //keepScore();

}

// function keepScore() {
//     // select.disabled = true;
//     console.log("in keep score");
//     if (playerOne_count === numRounds) {
//         console.log("player 1 wins");
//     }
// }

function updateScore() {
    score.innerText = `${playerOne_count} - ${playerTwo_count}`;
}

reset.addEventListener("click", function (e) {
    playerOne_count = 0;
    playerTwo_count = 0;
    updateScore();
    select.disabled = false;
    select.value = "";
    //selectRounds();

})

pOne.addEventListener("click", function (e) {
    playerOne_count++;
    updateScore();
    //console.log(playerOne_count, numRounds);
    if (playerOne_count === numRounds) {
        pOne.disabled = true;
        pTwo.disabled = true;
    }
})

pTwo.addEventListener("click", function (e) {
    playerTwo_count++;
    updateScore();
    //console.log(playerTwo_count);
    if (playerTwo_count === numRounds) {
        pOne.disabled = true;
        pTwo.disabled = true;
    }
})





function selectRounds() {
    alert("Select how many rounds you would like to play!")
    pOne.disabled = true;
    pTwo.disabled = true;
    let wait = false;


    select.addEventListener("input", function (e) {
        numRounds = parseInt(select.value);
        console.log(numRounds);
        select.disabled = true;

        pOne.disabled = false;
        pTwo.disabled = false;
    })

    //return numRounds;
}


startGame();