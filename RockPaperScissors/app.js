// 1. Select buttons
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');

// 2. Variables for scores
let playerScore = 0;
let computerScore = 0;

// 3. Function to generate computer's choice
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// 4. Function to decide the winner
function decideWinner(player, computer) {
  if (player === computer) {
    return 'It\'s a tie!';
  } else if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) {
    return 'You Win!';
  } else {
    return 'Computer Wins!';
  }
}

// 5. Function to handle user input and update UI
function handleUserChoice(choice) {
  const computerChoice = getComputerChoice();
  const result = decideWinner(choice, computerChoice);

  // Display results and update scores
  document.getElementById('result').textContent = `
    You chose: ${choice}, Computer chose: ${computerChoice}.
    Result: ${result}
  `;

  if (result === 'You Win!') playerScore++;
  else if (result === 'Computer Wins!') computerScore++;

  // Update scores on the screen
  document.getElementById('score').textContent = `
    Player: ${playerScore} | Computer: ${computerScore}
  `;
}

// 6. Event listeners for user choices
rockBtn.addEventListener('click', () => handleUserChoice('Rock'));
paperBtn.addEventListener('click', () => handleUserChoice('Paper'));
scissorsBtn.addEventListener('click', () => handleUserChoice('Scissors'));

// 7. Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;

  // Reset UI elements
  document.getElementById('score').textContent = 'Player: 0 | Computer: 0';
  document.getElementById('result').textContent = 'Choose your move!';
});