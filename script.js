const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', handleClick));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick() {
  const index = this.getAttribute('data-index');

  if (gameBoard[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    running = false;
  } else if (!gameBoard.includes("")) {
    statusText.textContent = `It's a draw!`;
    running = false;
  } else {
    switchPlayer();
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

