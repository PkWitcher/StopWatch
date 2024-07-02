document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const startStopButton = document.getElementById("start-stop");
  const resetButton = document.getElementById("reset");

  let isRunning = false;
  let startTime = 0;
  let elapsedTime = 0;
  let timerInterval;

  function updateDisplay(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const formattedTime =
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    display.textContent = formattedTime;
  }

  function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 100);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  startStopButton.addEventListener("click", () => {
    if (isRunning) {
      stopTimer();
      startStopButton.textContent = "Start";
    } else {
      startTimer();
      startStopButton.textContent = "Stop";
    }
    isRunning = !isRunning;
  });

  resetButton.addEventListener("click", () => {
    stopTimer();
    elapsedTime = 0;
    updateDisplay(0);
    if (isRunning) {
      startTimer();
    }
  });
});
