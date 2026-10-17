var searchForm = document.getElementById("city-search");
var input = document.getElementById("city-input");
var display = document.getElementById("temperature");
var cityDisplay = document.getElementById("city-name");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    var userInput = input.value;
    var response = await fetch(`/search?city=${encodeURIComponent(userInput)}`);

    if (!response.ok) {
      if (response.status === 404) {
        cityDisplay.textContent = "Search Failed"
        display.textContent = "City Not Found";
        return;
      }

      if (response.status === 500) {
        display.textContent = "Weather API failed";
        return;
      }

      display.textContent = "Something went wrong";
      return;
    }

    var data = await response.json();
    var temperature = data.temperature;
    var unit = data.unit;

    display.textContent = `${temperature} ${unit}`;
    cityDisplay.textContent = userInput.trim();

  } catch (error) {
    display.textContent = "Unable to fetch weather. Please try again.";
    console.error(error);
  }
});