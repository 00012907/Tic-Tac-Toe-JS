const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const message = document.querySelector(".message");
const winningMsgText = document.querySelector(".winningMessageText");
const restartBtn = document.querySelector(".restartBtn");

const player_x_class = "x";
const player_o_class = "circle";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];
let isPlayer_o_turn = false;

startGame();
restartBtn.addEventListener("click", startGame);

function startGame() {
  isPlayer_o_turn = false;

  cells.forEach((cell) => {
    cell.classList.remove(player_x_class);
    cell.classList.remove(player_o_class);
    cell.removeEventListener("click", handleCellClick);

    cell.addEventListener("click", handleCellClick, {
      once: true,
    });
  });
  setBoardHoverClass();
  message.classList.remove("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isPlayer_o_turn = !isPlayer_o_turn;
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayer_o_turn ? player_o_class : player_x_class;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMsgText.innerHTML = "It is a DRAW!";
  } else {
    winningMsgText.innerHTML = `Player with ${
      isPlayer_o_turn ? "O's" : "X's"
    } wins !`;
  }
  setTimeout(() => {
    message.classList.add("show");
  }, 500);
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(player_x_class) ||
      cell.classList.contains(player_o_class)
    );
  });
}

function setBoardHoverClass() {
  board.classList.remove(player_x_class);
  board.classList.remove(player_o_class);

  if (isPlayer_o_turn) {
    board.classList.add(player_o_class);
  } else {
    board.classList.add(player_x_class);
  }
}
