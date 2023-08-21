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

let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']];

function click(b, i, j) {
    b.innerHTML = currentPlayer;
    board[i][j] = currentPlayer;

    checkPlayerWin('X');
    checkPlayerWin('0');

    if (currentPlayer == 'X') {
        currentPlayer = '0';
    } else if (currentPlayer == '0') {
        currentPlayer = 'X';
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

function checkPlayerWin(player) {
    //горизонталь
    for(let i = 0; i<3; i++) {
        if(board[i][0] == player && board[i][1] == player && board[i][2] == player) {
            message.innerHTML = `Player ${player} won`;
            return;
        }
    }
    //вертикаль
    for(let i = 0; i<3; i++) {
        if(board[0][i] == player && board[1][i] == player && board[2][i] == player) {
            message.innerHTML = `Player ${player} won`;
            return;
        }
    }
    //диагональ
    if(board[0][0] == player && board[1][1] == player && board[2][2] == player) {
        message.innerHTML = `Player ${player} won`;
        return;
    }
    if(board[0][2] == player && board[1][1] == player && board[2][0] == player) {
        message.innerHTML = `Player ${player} won`;
        return;
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
}
document.getElementById('new-game').addEventListener('click', newGame);