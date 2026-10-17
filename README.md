# 🌤️ SkyCast — Weather App

SkyCast is a simple, responsive weather application that allows users to check the current temperature in their location or search for weather information in cities around the world.

Built using **Node.js, Express.js, Axios, EJS, and the Open-Meteo API**, SkyCast provides weather information through a clean, modern interface.

## ✨ Features

- **Current Location Weather:** Automatically detects the user's location (with permission) and displays the current temperature.
- **City Search:** Search for a city to retrieve its current temperature.
- **Temperature Units:** Displays temperature using the unit returned by the weather API.
- **Error Handling:** Handles invalid city searches, location permission errors, and API failures.
- **Responsive Design:** Works across desktop and mobile screen sizes.
- **Modern Interface:** Dark-themed dashboard with a clean weather display.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend functionality |
| Node.js | JavaScript runtime |
| Express.js | Backend server and routing |
| EJS | Server-side HTML templating |
| Axios | HTTP requests to external APIs |
| Open-Meteo | Weather and geocoding data |

## 🌐 APIs Used

**Open-Meteo Weather Forecast API**

Retrieves the current temperature using latitude and longitude.

https://open-meteo.com/en/docs

**Open-Meteo Geocoding API**

Converts a city name into geographical coordinates for weather lookups.

https://open-meteo.com/en/docs/geocoding-api

Both APIs can be used without an API key for non-commercial use, subject to Open-Meteo's terms.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git (optional)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/risen62/SkyCast.git
```

**2. Navigate to the project directory**

```bash
cd SkyCast
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the application**

```bash
node index.js
```

**5. Open your browser**

Visit:

http://localhost:3000

Allow location access if you want SkyCast to display the temperature for your current location.

## 📖 How to Use

1. Open SkyCast in your browser.
2. Allow location permission to view the current temperature for your location.
3. Alternatively, enter a city name in the search bar.
4. Click **Search** to retrieve that city's temperature.
5. If a city cannot be found, SkyCast displays an error message.

## 📂 Project Structure

```text
SkyCast/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── location.js
│       └── search_functionality.js
├── views/
│   └── index.ejs
├── index.js
├── package.json
├── .gitignore
└── README.md
```

## 📱 Responsive Design

SkyCast features a responsive layout designed for desktop and mobile devices, including compact mobile screens.

## 🔮 Future Improvements

Potential improvements include:

- Displaying weather conditions and icons.
- Adding multi-day forecasts.
- Supporting manual temperature unit selection.
- Improving city search with location suggestions.

## 👨‍💻 Author

Developed by **Samiullah Khan** as part of a Web Development Bootcamp capstone project.

**GitHub:** https://github.com/risen62

## 📄 License

No license has been specified for this project.