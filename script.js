const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let winningCombo = [];

function updateStatus(message) {
  statusText.textContent = message;
}

function setCellState(cell, index) {
  cell.textContent = board[index];
  cell.disabled = true;

  if (board[index] === 'X') {
    cell.classList.add('x-mark');
  } else if (board[index] === 'O') {
    cell.classList.add('o-mark');
  }
}

function checkWinner() {
  for (const combo of winPatterns) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningCombo = combo;
      return board[a];
    }
  }

  winningCombo = [];
  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (!gameActive || board[index]) {
    return;
  }

  board[index] = currentPlayer;
  setCellState(cell, index);

  const winningPlayer = checkWinner();

  if (winningPlayer) {
    gameActive = false;
    winningCombo.forEach((cellIndex) => {
      cells[cellIndex].classList.add('winning');
    });
    updateStatus(`Player ${winningPlayer} wins!`);
    return;
  }

  if (board.every((value) => value !== '')) {
    gameActive = false;
    updateStatus("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function resetBoard() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  winningCombo = [];

  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x-mark', 'o-mark', 'winning');
  });

  updateStatus("Player X's turn");
}

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetBoard);

updateStatus("Player X's turn");
