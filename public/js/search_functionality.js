const searchForm = document.getElementById("city-search");
const input = document.getElementById("city-input");
const display = document.getElementById("temperature");
const cityDisplay = document.getElementById("city-name");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const cityName = input.value.trim();
  const requestId = ++window.weatherRequestId;
  if (!cityName) {
    display.textContent = "Please enter a city name.";
    return;
  }
  cityDisplay.textContent = cityName;
  display.textContent = "Loading weather…";
  try {
    const city = await window.weatherApi.city(cityName);
    if (requestId !== window.weatherRequestId) return;
    const data = await window.weatherApi.weather(city.latitude, city.longitude);
    if (requestId !== window.weatherRequestId) return;
    cityDisplay.textContent = [city.name, city.country].filter(Boolean).join(", ");
    display.textContent = `${data.temperature} ${data.unit}`;
  } catch (error) {
    if (requestId !== window.weatherRequestId) return;
    display.textContent = error.message;
  }
});
