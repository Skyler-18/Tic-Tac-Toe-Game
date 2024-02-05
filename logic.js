// SELECTING ELEMENTS
let boxes = document.querySelectorAll(".box");
let mssgContainer = document.querySelector(".mssg-container");
let mssg = document.querySelector("#mssg");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");

//CHECKING THE TURN
let turnO = true;
let count = 0;

//WINNING PATTERNS
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//CLICKING EVENT ON BOXES
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});

//CHECK WINNER
const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                showWinner(pos1Value);
                return true;
            }
        }
    }
};

//SHOW WINNER
const showWinner = (winner) => {
    mssg.innerText = `Congratulations! Winner is Player '${winner}'`;
    mssgContainer.classList.remove("hide");
    disableBoxes();
}

//GAME DRAW CASE
const gameDraw = () => {
    mssg.innerText = "Game Draw";
    mssgContainer.classList.remove("hide");
    disableBoxes();
}

//NEW GAME OR RESET GAME
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    mssgContainer.classList.add("hide");
}

//DISABLE CLICK BOXES AFTER FINISH
const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};

//ENABLE CLICK BOXES WHEN NEW GAME OR RESET GAME
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
