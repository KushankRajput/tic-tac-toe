const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""]; //all boxes are blank
    // //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });

    //it is make empty (all the game) in the backend
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame()


function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //for UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position)=>{
        //sare bozes non-empty hone chaihiye or sari values same honi chaiye
        if ((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
        && (gameGrid[position[0]] === gameGrid[position[1]]) &&  (gameGrid[position[1]] === gameGrid[position[2]])){
    
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }else{
                answer="O"
            }
            //disable pointer events  (it will stop game while someone wins)
            boxes.forEach((box)=>{
                box.style.pointerEvents="none"
            }) 

            //now we know who is the Winner
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }
    })    
        //now we have a winner so we need to show "new game" button
        if (answer !==""){
            gameInfo.innerText=`${answer} Wins`;
            newGameBtn.classList.add("active")
            return;
        }

        //check when there is a tie
        let fillCount=0;
        gameGrid.forEach((box)=>{
            if (box !==""){
                fillCount++; //here the value of fill count will be 9
            }
        })
        //now board is fill and game tied
        if (fillCount ===9){
            gameInfo.innerText="Game Tied !"
            newGameBtn.classList.add("active");
        }
}


function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none"  //for making cursor pointer of nonempty value
        //swap turn
        swapTurn();
        //check if someone already win
        checkGameOver();
    }

}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);//this index will tell that on which box we have clicked
    })
})


//when we click on the newGameBtn ,everything must be clear as starting game
newGameBtn.addEventListener("click",initGame)