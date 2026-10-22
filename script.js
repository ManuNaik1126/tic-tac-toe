let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let scoreO = 0, scoreX = 0;
let scoreOEl = document.getElementById("score-o");
let scoreXEl = document.getElementById("score-x");
let themeToggle = document.querySelector(".theme-toggle");

let isPlayerO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const winMessages = [
  "Well played!",
  "That was intense!",
  "Victory is sweet!",
  "Impressive strategy!",
  "You nailed it!"
];

const playSound = (id) => {
  const sound = document.getElementById(id);
  if (sound) sound.play();
};

const showWinner = (winner, combo) => {
  // playSound("win-sound");
  const message = `🎉 Winner: ${winner}\n${winMessages[Math.floor(Math.random() * winMessages.length)]}`;
  msg.innerText = message;
  msgContainer.classList.add("show");

  combo.forEach(i => boxes[i].style.backgroundColor = "gold");

  if (winner === "O") {
    scoreO++;
    scoreOEl.innerText = scoreO;
  } else {
    scoreX++;
    scoreXEl.innerText = scoreX;
  }

  disableBoxes();
};

const gameDraw = () => {
  // playSound("draw-sound");
  msg.innerText = "It's a Draw! 🤝";
  msgContainer.classList.add("show");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "rgb(6, 244, 200)";
  });
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return true;
    }
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // playSound("click-sound");
    if (isPlayerO) {
      box.innerText = "O";
      box.style.color = "blue";
    } else {
      box.innerText = "X";
      box.style.color = "red";
    }
    box.disabled = true;
    isPlayerO = !isPlayerO;
    count++;

    const isWin = checkWinner();
    if (count === 9 && !isWin) {
      gameDraw();
    }
  });
});

const resetGame = () => {
  isPlayerO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.remove("show");
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
