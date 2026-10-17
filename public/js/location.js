// A newer city search must take precedence over an earlier location lookup.
window.weatherRequestId = 0;
const locationRequestId = window.weatherRequestId;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    if (locationRequestId !== window.weatherRequestId) return;
    try {
      const data = await window.weatherApi.weather(position.coords.latitude, position.coords.longitude);
      if (locationRequestId !== window.weatherRequestId) return;
      document.getElementById("temperature").textContent = `${data.temperature} ${data.unit}`;
    } catch (error) {
      if (locationRequestId !== window.weatherRequestId) return;
      document.getElementById("temperature").textContent = error.message;
    }
  }, () => {
    if (locationRequestId !== window.weatherRequestId) return;
    document.getElementById("temperature").textContent = "Unable to detect your location. Search for a city.";
  }, { timeout: 15000, maximumAge: 300000 });
} else {
  document.getElementById("temperature").textContent = "Search for a city to see its weather.";
}
