const inputResult = document.querySelector(".winner-result");
const displayWinner = document.querySelector(".winner");
const rollButton = document.querySelector(".roll-btn");
const firstPlayerCon = document.querySelector(".first-player-container");
const secondPlayerCon = document.querySelector(".second-player-container");
const resetBtn = document.querySelector(".reset-button");

const style = document.createElement("style");

let playerScore1 = 0;
let playerScore2 = 0;
let player1Playing = true;
let countPlayer1 = 0;
let countPlayer2 = 0;

rollButton.addEventListener("click", (event) => {
  if (player1Playing) {
    if (countPlayer1 < 4) {
      // Gives a value to the dice
      const roll = Math.floor(Math.random() * 6) + 1;

      // Displaying the dice image
      const diceImg = document.createElement("img");
      diceImg.src = `images/dice${roll}.svg`;
      firstPlayerCon.appendChild(diceImg);

      // Updates the player score, gives the turn to the other player and updates the counter
      playerScore1 = playerScore1 + roll;
      player1Playing = !player1Playing;
      countPlayer1++;

      // Indicates the players turn
      style.textContent =
        ".player1-title::after{ width: 100%; } .player2-title::after{ width: 0; }";
      document.head.appendChild(style);
    }
  } else {
    if (countPlayer2 < 4) {
      const roll = Math.floor(Math.random() * 6) + 1;

      const diceImg = document.createElement("img");
      diceImg.src = `images/dice${roll}.svg`;
      secondPlayerCon.appendChild(diceImg);

      playerScore2 = playerScore2 + roll;
      player1Playing = !player1Playing;
      countPlayer2++;

      style.textContent =
        ".player1-title::after{ width: 0; } .player2-title::after{ width: 100%; }";
      document.head.appendChild(style);
    }
  }

  // Displaying the winner
  if (countPlayer1 === 4 && countPlayer2 === 4) {
    // Checks if Player1's score is higher
    if (playerScore1 > playerScore2) {
      displayWinner.innerHTML =
        displayWinner.innerHTML +
        " " +
        firstPlayerCon.children[0].innerHTML +
        " " +
        ":)";
      displayWinner.style.color = "blue";
      // Displaying the score of the winner in the input element
      inputResult.value = playerScore1;
      // Checks if Player2's score is higher
    } else if (playerScore1 < playerScore2) {
      displayWinner.innerHTML =
        displayWinner.innerHTML +
        " " +
        secondPlayerCon.children[0].innerHTML +
        " " +
        ":(";
      displayWinner.style.color = "red";
      // Displaying the score of the winner in the input element
      inputResult.value = playerScore2;
      // Checks if it's a tie
    } else {
      inputResult.value = playerScore1;
      displayWinner.innerHTML = displayWinner.innerHTML + " " + "Tie :/";
      displayWinner.style.color = "gray";
    }
    // It makes is so you can't display the winner multiple times
    countPlayer1++;
    rollButton.disabled = true
    setTimeout(() => {
      resetBtn.classList.add("active-reset-btn");
    }, 1500);
  }
});

// Resets the game
resetBtn.addEventListener("click", () => {
  // Reloads the window
  window.location.reload();
});
