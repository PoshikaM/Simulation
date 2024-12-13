const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let moleSquare;

for (let i = 0; i < 9; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  grid.appendChild(square);
}

function showMole() {
  if (moleSquare) moleSquare.classList.remove('mole');

  const squares = document.querySelectorAll('.square');
  const randomIndex = Math.floor(Math.random() * squares.length);
  moleSquare = squares[randomIndex];
  moleSquare.classList.add('mole');
}

function whackMole(event) {
  if (event.target === moleSquare) {
    score++;
    scoreDisplay.textContent = score;
    showMole();
  }
}

function startTimer() {
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      alert(`Game Over! Your score is ${score}`);
    }
  }, 1000);
}

document.querySelectorAll('.square').forEach((square) => {
  square.addEventListener('click', whackMole);
});

showMole();
startTimer();