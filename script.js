let homeTeam = 0;
let guestTeam = 0;
let timeInterval;
let hour = 0;
let minutes = 0;
let seconds = 0;

const data = {
  startButton: document.getElementById("start-button"),
  finishButton: document.getElementById("finish-button"),
  openResultsWindowLink: document.getElementById("open-window"),
  closeResultsWindowBtn: document.getElementById("close-button"),
  resultsWindow: document.querySelector(".results-window"),
  resultsTable: document.getElementById("results-table"),
  timerTime: document.getElementById("timer"),
  home: document.getElementById("home-add-scores"),
  guest: document.getElementById("guest-add-scores"),
  scoreHome: document.getElementById("score-home"),
  scoreGuest: document.getElementById("score-guest"),
  homeHighlight: document.getElementById("home-highlight"),
  guestHighlight: document.getElementById("guest-highlight"),
  boderWinner: "2px solid #f94f6d",
  boderEqual: "2px solid #53a8b6",
  removeBoder: "none",
};

data.startButton.addEventListener("click", () => {
  startTimer();
});

data.finishButton.addEventListener("click", () => {
  clearInterval(timeInterval);
  saveDataToTheList(data.timerTime.textContent);
  homeTeam = 0;
  guestTeam = 0;
  showScore(data.scoreHome, homeTeam);
  showScore(data.scoreGuest, guestTeam);
  highlightWinner();
  resetTime();
});

data.openResultsWindowLink.addEventListener("click", (event) => {
  event.preventDefault();
  data.resultsWindow.style.display = "flex";
});

data.closeResultsWindowBtn.addEventListener("click", () => {
  data.resultsWindow.style.display = "none";
});

data.home.addEventListener("click", (event) => {
  event.preventDefault();
  homeTeam += addPoints(event.target.dataset.id);
  showScore(data.scoreHome, homeTeam);
  highlightWinner();
});

data.guest.addEventListener("click", (event) => {
  event.preventDefault();
  guestTeam += addPoints(event.target.dataset.id);
  showScore(data.scoreGuest, guestTeam);
  highlightWinner();
});

function addPoints(points) {
  if (points === "one") return 1;
  if (points === "two") return 2;
  if (points === "three") return 3;
  else return 0;
}

function showScore(score, teamScore) {
  score.textContent = teamScore;
}

function highlightWinner() {
  if (homeTeam > guestTeam) {
    data.homeHighlight.style.border = data.boderWinner;
    data.guestHighlight.style.border = data.removeBoder;
  }
  if (guestTeam > homeTeam) {
    data.homeHighlight.style.border = data.removeBoder;
    data.guestHighlight.style.border = data.boderWinner;
  }
  if (homeTeam === guestTeam) {
    data.homeHighlight.style.border = data.boderEqual;
    data.guestHighlight.style.border = data.boderEqual;
  }
  if (homeTeam === 0 || guestTeam === 0) {
    data.homeHighlight.style.border = data.removeBoder;
    data.guestHighlight.style.border = data.removeBoder;
  }
}

function saveDataToTheList(time) {
  checkNumberOfItemsInList();
  if (time !== "00:00" && (homeTeam !== 0 || guestTeam !== 0)) {
    let tr = document.createElement("tr");
    data.resultsTable.appendChild(tr);
    tr.innerHTML = `
    <td>${homeTeam}</td>
    <td>${guestTeam}</td>
    <td>${time}</td>
  `;
  }
}

function checkNumberOfItemsInList() {
  if (data.resultsTable.children.length === 11) {
    data.resultsTable.removeChild(data.resultsTable.children[1]);
  }
}

function startTimer() {
  timeInterval = setInterval(function () {
    data.timerTime.textContent =
      (hour ? hour + ":" : "") +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    seconds++;

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes == 60) {
      hour++;
      minutes = 0;
    }
  }, 1000);
}

function resetTime() {
  clearInterval(timeInterval);
  hour = 0;
  minutes = 0;
  seconds = 0;
  data.timerTime.textContent = "00:00";
}
