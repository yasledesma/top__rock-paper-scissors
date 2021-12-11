// computerPlay Function:
// This function should randomly return the strings "Rock", "Paper", or "Scissors".

// 1.  Desclare a local variable that takes a random number, multiplies it by 9, and adds 1. Now you have a variable
//      that gives you a random number between 1 and 9.
// 2. Use any loop to iterate through these 9 numbers. (1 <= n > 3) returns "Rock!", (4 <= n >= 6) returns "Paper!",
//    and (7 <= n >= 9) return "Scissors!"

function computerPlay() {
  let random = Math.floor(Math.random() * 9) + 1;

  if (random <= 9 && random >= 7) return `scissors`;
  else if (random <= 6 && random >= 4) return `paper`;
	return `rock`;
}

// singleRound Function:
// This functions should play a single round of RPS, user vs computer.

// 1. It should take two parameters, playerSelection and computerSelection, so you'll have to make (global) variables for both.
//    Make playerSelection case insensitive with makeLowerCase().
// 2. The first function should take a numerical promt from the user, and the second one should take a random number
//    with computerPlay ().
// 3. It should calculate which thing wins against which.
// 4. Once the calculation is done, it should add 1 point to either or both playerPoints and computerPoints globals.
// 5. The function should return a string literal with a win-lose statement for the user.

const makeLowerCase = (string) => string.toLowerCase();  // 1. 

let playerPoints = 0;
let computerPoints = 0;

let finalResult = () => {
  if (playerPoints > computerPoints) return `You won!`;
  else if (playerPoints < computerPoints) return `You lose!`;
  return `It's a tie!`;
};

// game Function:

// Write a NEW function called game(). Use the previous function inside of this one to 
// play a 5 round game that keeps score and reports a winner or loser at the end.
// A functions that calls round(playerSelection, computerSelection) 5 times and returns the winner of the game!

// 1. Create a game() function that takes no parameter.
// 2. Create a constant to store 5, a result variable to store playRound(), and an array variable to store each round's result.
// 3. Inside it, create a loop that starts at 0 and goes up to 5 (not included).
// 4. Inside the loop, create the playerSelection and computerSelection variables, run the playRound() function inside result, 
//    push result into the array.
// 5. Make a point counter function that resturn a win statement (e.g. "You win!" / "You lose") and print it out to the console.

// function playGame() {
//   const NUMBER_OF_ROUNDS = 5;
//   let result;
//   let array = [];

//   for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
//     let computerSelection = computerPlay();
//     let playerSelection = prompt(`What's your pick?`);

//     result = singleRound(playerSelection, computerSelection);
//     array.push(result);
    
//     console.log(array.slice(-1));
//   }
//   return console.log(`${finalResult()} You got ${playerPoints} points against the cumputer's ${computerPoints} points.`);
// }

// playGame();

// DOM //
// 1. How will the UI look?
//    1.1. An "Start Game" button that desapears or turns into dots when the game starts.
//    1.2. The "What's your pick?" message, and the result of each successive single round message will be displayed 
//         inside the .rounds container.
//    1.3. When the user clicks a button, the respective choice is inputed to the playGame() function.
//    1.4. The score is updated as each round is played.
//    1.5. When the round ends, the play button apears again with a text that says "Play Again", and starts a new game when is clicked.
//         It also desapears or enters a transition state, just to turn into play again later once the round ends.

// 2. Refactor your functions so instead of taking a text input in the form of an user prompt, the user inputs her choice by
//    clicking a button, or pressing it.
//    2.1. computerPlay().
//    2.2. singleRound().
//    2.3. playGame().
const choices = document.querySelectorAll(".choice");
const playerScore = document.querySelector(".score__player");
const computerScore = document.querySelector(".score__computer");
const rounds = document.querySelector(".rounds");

choices.forEach((choice) => addEventListener("click", singleRound));

// Refactor singleRound() to accept e.event.textContent as playerSelection. Break it into smaller functions if in doubt.
function singleRound(e) {
  let computerSelection = computerPlay();
  let playerSelection = e.target.textContent;

  decidePoints(playerSelection, computerSelection);

  playerScore.innerHTML = `Your score is: ${playerPoints} points.`;
  computerScore.innerHTML = `The bot score is: ${computerPoints} points.`
}

function decidePoints(playerSelection, computerSelection) {
  let partialResult;
  let roundsChild;
  playerSelection = makeLowerCase(playerSelection);

  if (
    (playerSelection === `rock` && computerSelection === `scissors`) ||
    (playerSelection === `paper` && computerSelection === `rock`) ||
    (playerSelection === `scissors` && computerSelection === `paper`)
  ) {
    playerPoints++;
    partialResult = `You win! ${playerSelection[0].toUpperCase() + playerSelection.slice(1,)} beats ${computerSelection}!`;
    roundsChild = document.createTextNode(partialResult);
    rounds.appendChild(roundsChild);
  } else if (
    (playerSelection === `rock` && computerSelection === `paper`) ||
    (playerSelection === `paper` && computerSelection === `scissors`) ||
    (playerSelection === `scissors` && computerSelection === `rock`)
  ) {
    computerPoints++;
    partialResult = `You lose! ${computerSelection[0].toUpperCase() + computerSelection.slice(1,)} beats ${playerSelection}!`;
    roundsChild = document.createTextNode(partialResult);
    rounds.appendChild(roundsChild);
  } else if ( playerSelection === computerSelection) {
    playerPoints++;
    computerPoints++;
    partialResult = `It's a tie! Try again`;
    roundsChild = document.createTextNode(partialResult);
    rounds.appendChild(roundsChild);
  } else {
    computerPoints++;
    partialResult = `Wrong! That's not an option. Point for the computer!`;
    roundsChild = document.createTextNode(partialResult);
    rounds.appendChild(roundsChild);
  }
}

function endGame() {
  if(playerScore > 5 || computerScore > 5) {
    return;
  }
}