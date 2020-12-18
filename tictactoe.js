const ROW_LIST = ['row-1','row-2','row-3'];
const COL_LIST = ['col-1','col-2','col-3'];
const X = 'X';
const O = 'O';
var turn = 0;
var historyCount = 0;
var moveHistory = [];
var board = [
        ["","",""],
        ["","",""],
        ["","",""]
];
var savedBoard = [
    ["","",""],
    ["","",""],
    ["","",""]
];


function addMove() {
    var rowIndex = ROW_LIST.indexOf(this.parentNode.classList.item(0));
    var colIndex = COL_LIST.indexOf(this.classList.item(0));
    if( turn % 2 == 0){
        if(this.childNodes.length === 0){
            this.innerHTML = X;
            board[rowIndex][colIndex] = X;
            turn++;
        }
    }
    else{
        if(this.childNodes.length === 0){
            this.innerHTML = O;
            board[rowIndex][colIndex] = O;
            turn++;
            
        }
    }
    saveHistory(board);
    historyCount++;
    if (turn > 5){
        checkWin();
    }    
    
}

function resetGame() {
    addOnClick();
    let tiles = document.querySelectorAll("td");
    for (let tile of tiles) {
        tile.innerHTML = '';
    }
    board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    turn = 0;
    document.querySelector("span.result").innerHTML = '';   
    moveHistory = [];
    historyCount = 0;
    document.querySelector(".previous").disabled = false;
    document.querySelector(".next").disabled = false;
    document.querySelector(".next").classList.add("hidebutton");
    document.querySelector(".previous").classList.add("hidebutton");
}

function checkWin() {
    let isWin;
    let whoWon;
    
    for( let x = 0; x < 3; x++){
        if ( board[x][0] === board[x][1] && board[x][1] === board[x][2] ) {
            console.log(`horizontal${x}`);
            isWin = true;
            whoWon = board[x][0];
        }
    }
    
    for( let x = 0; x < 3; x++){
        if ( board[0][x] === board[1][x] && board[1][x] === board[2][x] ) {
            console.log(`vertical${x}`);
            isWin = true;
            whoWon = board[0][x];
        }
    }

    if( board[0][0] === board[1][1] && board[1][1] === board[2][2] ) {
        console.log('diagonal1');
        isWin = true;
        whoWon = board[1][1];
    }
    if( board[0][2] === board[1][1] && board[1][1] === board[2][0] ) {
        console.log('diagonal2');
        isWin = true;
        whoWon = board[1][1];
    }

    if (isWin === true){
        document.querySelector("span.result").innerHTML = `${whoWon} won!`; 
        removeOnClick();
        enableMoveHistory();
    }else if (turn === 9){
        document.querySelector("span.result").innerHTML = `It's a Tie!`; 
        removeOnClick();
        enableMoveHistory();
    }
 
    
    
}

function removeOnClick() {
    var tiles = document.querySelectorAll("td");
    for (let tile of tiles) {
        tile.removeEventListener("click", addMove);
    }
}

function addOnClick() {
    var tiles = document.querySelectorAll("td");
    for (let tile of tiles) {
        tile.addEventListener("click", addMove);
    }
}

function saveHistory(currentBoard){
    savedBoard = currentBoard.map(move => ({ ...move }))
    moveHistory.push(savedBoard);
}

function enableMoveHistory() {
    document.querySelector(".next").classList.remove("hidebutton");
    document.querySelector(".previous").classList.remove("hidebutton");
    turn--;
}

function previousBoard () {
    
    if (turn > 0) {
        document.querySelector(".previous").disabled = false;
        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                let row = document.querySelector(`tr.${ROW_LIST[x]}`);
                row.querySelector(`td.${COL_LIST[y]}`).innerHTML = moveHistory[turn-1][x][y];
            }
        }
        turn--;
    }  
    
    if (turn === 0){
        document.querySelector(".previous").disabled = true;
        document.querySelector(".next").disabled = false;
    }    
}

function nextBoard () {
    
    if (turn >= 0 && turn < moveHistory.length-1) {
        document.querySelector(".previous").disabled = false;
        document.querySelector(".next").disabled = false;
        for (let x = 0; x < 3; x++){
            for (let y = 0; y < 3; y++){
                let row = document.querySelector(`tr.${ROW_LIST[x]}`);
                row.querySelector(`td.${COL_LIST[y]}`).innerHTML = moveHistory[turn+1][x][y];
            }
        }
        turn++;
    } 
    if( turn === moveHistory.length-1){
        document.querySelector(".previous").disabled = false;
        document.querySelector(".next").disabled = true;
    }
} 
