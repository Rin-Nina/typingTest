const textToCopy = document.getElementById("text-to-copy").innerText;
const inputText = document.getElementById("input-text");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let startTime = null;
let interval = null;

// Fetch a random text usingAPI
// async function fetchRandomText() {
//   try {
//     // const response = await fetch("https://dummyjson.com/todos/random");
//     const response = await fetch("https://dummyjson.com/todos/1")
//       .then((res) => res.json())
//       .then(console.log);
//     const data = await response.json();
//     console.log(data[0]);
//     randomText = data[0]; // API returns an array of sentences
//     textToCopy.textContent = randomText;
//   } catch (error) {
//     console.error("Error fetching random text:", error);
//     textToCopy.textContent = "Failed to load text. Please try again.";
//   }
// }
//Format time in HH:MM:SS
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000);
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

// Start the timer
function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 100);
  }
}

// Stop the timer
function stopTimer() {
  clearInterval(interval);
  interval = null;
}

// Reset the test
function resetTest() {
  stopTimer();
  startTime = null;
  timerDisplay.textContent = "00:00:00";
  inputText.value = "";
}

// Event listeners
inputText.addEventListener("input", () => {
  startTimer();

  // Stop the timer when text matches
  if (inputText.value === textToCopy) {
    stopTimer();
    alert(`Félicitations ! Vous avez terminé en ${timerDisplay.textContent}`);
  }
});

restartButton.addEventListener("click", resetTest);
