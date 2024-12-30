const inputText = document.getElementById("input-text");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart");
let textElement = "";
let startTime = null;
let interval = null;

// Fetch a random text usingAPI
async function fetchAndDisplayData() {
  try {
    // Replace with your actual API URL
    const Url = "https://dummyjson.com/todos/random";

    // Fetch data from the API
    const response = await fetch(Url);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response data as JSON
    const data = await response.json();

    // Get the text element
    textElement = document.getElementById("text-to-copy");

    // Display the data in the text element
    textElement.textContent = `${data.todo}`;
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
      if (inputText.value === textElement.textContent) {
        stopTimer();
        alert(
          `Félicitations ! Vous avez terminé en ${timerDisplay.textContent}`
        );
      }
    });

    restartButton.addEventListener("click", resetTest);
  } catch (error) {
    // Handle errors (e.g., network problems, invalid API)
    console.error("Error fetching data:", error);

    // Display an error message in the text element
    const textElement = document.getElementById("text-to-copy");
    textElement.textContent = "Failed to load data. Please try again later.";
  }
}

// Call the function when the page loads
fetchAndDisplayData();
