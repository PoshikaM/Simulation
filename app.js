// 1.Adding JavaScript: Handling User Input
// Select buttons
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');

// Function to handle user's choice
function handleUserChoice(choice){
  console.log(`User chose: ${choice}`);
}

// 2.Adding computer input (Random Choice)
rockBtn.addEventListener('click', () => handleUserChoice('Rock'));
paperBtn.addEventListener('click', () => handleUserChoice('Paper'));
scissorsBtn.addEventListener('click', () => handleUserChoice('Scissors'));

function getComputerChoice(){
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    console.log(`Computer chose: ${computerChoice}`);
    return computerChoice;
}
getComputerChoice();
  
function handleUserChoice(choice){
    console.log(`User chose: ${choice}`);
    const computerChoice = getComputerChoice();
    // Placeholder for deciding the winner
    document.getElementById('result').textContent = `User: ${choice}, Computer: ${computerChoice}`;
}  