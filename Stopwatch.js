let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  return (
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    (milliseconds < 10 ? "0" : "") + milliseconds
  );
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startPauseBtn.textContent = "Pause";
  startPauseBtn.classList.add("pause");
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  startPauseBtn.textContent = "Start";
  startPauseBtn.classList.remove("pause");
}

function resetStopwatch() {
  clearInterval(timerInterval);
  display.textContent = "00:00.00";
  elapsedTime = 0;
  lapsList.innerHTML = "";
  startPauseBtn.textContent = "Start";
  startPauseBtn.classList.remove("pause");
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function recordLap() {
  const lapTime = document.createElement("li");
  lapTime.textContent = formatTime(elapsedTime);
  lapsList.appendChild(lapTime);
}

startPauseBtn.addEventListener("click", function() {
  if (timerInterval) {
    pauseStopwatch();
    timerInterval = null;
  } else {
    startStopwatch();
  }
});

resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
