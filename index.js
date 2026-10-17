import express from "express";
import axios from "axios";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/weather", async (req, res) => {
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`, //get weather data using access
    );
    var temperature = response.data.current.temperature_2m;
    var unit = response.data.current_units.temperature_2m;
    res.json({
      temperature,
      unit,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("API Failed");
  }
});

app.get("/search", async (req, res) => {
  var cityName = req.query.city;
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`,
    ); //to convert search into latitude and longitude
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    var latitude = response.data.results[0].latitude;
    var longitude = response.data.results[0].longitude;
    const weatherData = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
    ); //to get data from api using that latitude and longitude

    var unit = weatherData.data.current_units.temperature_2m;
    var temperature = weatherData.data.current.temperature_2m;
    res.json({
      temperature,
      unit,
    });
  } catch (error) {
    console.error("API URL:", error.config?.url);
    console.error("API status:", error.response?.status);
    res.status(500).send("API Failed");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
