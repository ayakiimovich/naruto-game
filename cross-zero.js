const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const b4 = document.getElementById('b4');
const b5 = document.getElementById('b5');
const b6 = document.getElementById('b6');
const b7 = document.getElementById('b7');
const b8 = document.getElementById('b8');
const b9 = document.getElementById('b9');

const message = document.getElementById('message');

// const image = document.getElementById('xwon');

let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];

let cells = [
    [b1, b2, b3],
    [b4, b5, b6],
    [b7, b8, b9]];


let isFirstClick = true;
let isGameOver = false;
let isPlayerWin = false;

function click(b, i, j) {
    if (board[i][j] !== '') {
        return;
    }
    if(isGameOver) {
        return;
    }

    img(b, currentPlayer);
    board[i][j] = currentPlayer;

    if (isFirstClick) {
        isFirstClick = false;
        audioClick();
    }

    checkPlayerWin('X');
    checkPlayerWin('0');
    checkDraw();

    if (currentPlayer == 'X') {
        currentPlayer = '0';
    } else if (currentPlayer == '0') {
        currentPlayer = 'X';
    }
    setTimeout(makeBot, 500)
}

function img (b, currentPlayer) {
    if (currentPlayer == 'X') {
        var img = new Image();
        img.src = 'sasuke.jpg';
        img.width = 80;
        img.height = 80;
        b.appendChild(img);
    } else if (currentPlayer == '0') {
        var img = new Image();
        img.src = 'uzumaki2.jpg';
        img.width = 80;
        img.height = 80;
        b.appendChild(img);
    }
}

b1.addEventListener('click', () => click(b1, 0, 0));
b2.addEventListener('click', () => click(b2, 0, 1));
b3.addEventListener('click', () => click(b3, 0, 2));
b4.addEventListener('click', () => click(b4, 1, 0));
b5.addEventListener('click', () => click(b5, 1, 1));
b6.addEventListener('click', () => click(b6, 1, 2));
b7.addEventListener('click', () => click(b7, 2, 0));
b8.addEventListener('click', () => click(b8, 2, 1));
b9.addEventListener('click', () => click(b9, 2, 2));

function makeBot() {
    if (currentPlayer === '0') {
        const emptyCells = [];
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] === '') {
                    emptyCells.push({
                        boardCell: cells[i][j],
                        row: i, 
                        column: j
                    });
                }
            }
        }
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botCell = emptyCells[randomIndex];
        click(botCell.boardCell, botCell.row, botCell.column);
    }
}

function checkPlayerWin(player) {
    //горизонталь
    for(let i = 0; i<3; i++) {
        if(board[i][0] == player && board[i][1] == player && board[i][2] == player) {
            playerWon(player);
            return;
        } 
    }
    //вертикаль
    for(let i = 0; i<3; i++) {
        if(board[0][i] == player && board[1][i] == player && board[2][i] == player) {
            playerWon(player);
            return;
        }
    }
    //диагональ
    if(board[0][0] == player && board[1][1] == player && board[2][2] == player) {
        playerWon(player);
        return;
    }
    if(board[0][2] == player && board[1][1] == player && board[2][0] == player) {
        playerWon(player);
        return;
    } 
}

function playerWon(player) {
    message.innerHTML = `${player} won`;
    if (player == 'X') {
        var img = new Image();
        img.src = 'xwon.png';
        img.setAttribute('id', 'xwon');
        // img.style.width = 500;
        // img.style.height = 'auto';
        // img.style.position = 'fixed';
        // img.style.top = 80; 
        document.body.appendChild(img);
    }
    isGameOver = true;
    isPlayerWin = true;
}

function checkDraw() {
   if(isPlayerWin != true) {
        let step = 0;
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] != '') {
                step++;
                }
             }
        }
    if (step >= 8) {
        message.innerHTML = 'Try again!';
        isGameOver = true;
    }
 }
}

function newGame() {
    currentPlayer = 'X';
    board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];
    message.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).innerHTML = '';
    }
    isGameOver = false;
    var image = document.getElementById('xwon');
    image.parentNode.removeChild(image);
}
document.getElementById('new-game').addEventListener('click', newGame);

function audioClick () {
    var audio = new Audio();
    audio.src = 'naruto.mp3';
    audio.autoplay = true;
}

