const gameBoard = document.querySelector('#game-board');
const resetButton = document.querySelector('#reset-btn');
const currentPlayerDisplay = document.querySelector('#current-player');
const playerOneScoreDisplay = document.querySelector('#player-one-score');
const playerTwoScoreDisplay = document.querySelector('#player-two-score');

const columns = 7;
const rows = 6;
let currentPlayer = 1;
let playerOneScore = 0;
let playerTwoScore = 0;

for (let i = 0; i < columns * rows; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  gameBoard.appendChild(cell);
}

const cells = Array.from(document.querySelectorAll('.cell'));

function dropPiece(columnIndex) {
  for (let i = rows - 1; i >= 0; i--) {
    const cellIndex = i * columns + columnIndex;
    if (!cells[cellIndex].classList.contains('taken')) {
      cells[cellIndex].classList.add(
        'taken',
        currentPlayer === 1 ? 'player-one' : 'player-two'
      );
      if (checkBoard()) {
        currentPlayer === 1 ? playerOneScore++ : playerTwoScore++;
        updateScore();
        setTimeout(() => {
          alert(`Player ${currentPlayer} Wins!`);
          resetGame();
        }, 100);
        return;
      } else if (cells.every(cell => cell.classList.contains('taken'))) {
        setTimeout(() => {
          alert('It\'s a Draw!');
          resetGame();
        }, 100);
        return;
      } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.textContent = `Player ${
          currentPlayer === 1 ? 'One' : 'Two'
        }'s Turn`;
      }
      return;
    }
  }
  alert('Column is full!');
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    const columnIndex = index % columns;
    dropPiece(columnIndex);
  });
});

function checkBoard() {
  const winningArrays = [
    ...Array(rows).flatMap((_, r) =>
      Array(columns - 3).map((_, c) => [
        r * columns + c,
        r * columns + c + 1,
        r * columns + c + 2,
        r * columns + c + 3,
      ])
    ),
    ...Array(columns).flatMap((_, c) =>
      Array(rows - 3).map((_, r) => [
        r * columns + c,
        (r + 1) * columns + c,
        (r + 2) * columns + c,
        (r + 3) * columns + c,
      ])
    ),
    ...Array(rows - 3).flatMap((_, r) =>
      Array(columns - 3).map((_, c) => [
        r * columns + c,
        (r + 1) * columns + c + 1,
        (r + 2) * columns + c + 2,
        (r + 3) * columns + c + 3,
      ])
    ),
    ...Array(rows - 3).flatMap((_, r) =>
      Array(columns - 3).map((_, c) => [
        r * columns + c + 3,
        (r + 1) * columns + c + 2,
        (r + 2) * columns + c + 1,
        (r + 3) * columns + c,
      ])
    ),
  ];

  for (const [a, b, c, d] of winningArrays) {
    if (
      cells[a].classList.contains(
        currentPlayer === 1 ? 'player-one' : 'player-two'
      ) &&
      cells[b].classList.contains(
        currentPlayer === 1 ? 'player-one' : 'player-two'
      ) &&
      cells[c].classList.contains(
        currentPlayer === 1 ? 'player-one' : 'player-two'
      ) &&
      cells[d].classList.contains(
        currentPlayer === 1 ? 'player-one' : 'player-two'
      )
    ) {
      return true;
    }
  }
  return false;
}

function updateScore() {
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
}

function resetGame() {
  cells.forEach(cell => cell.classList.remove('taken', 'player-one', 'player-two'));
  currentPlayer = 1;
  currentPlayerDisplay.textContent = "Player One's Turn";
}

resetButton.addEventListener('click', resetGame);