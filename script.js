const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    errorMessage.textContent = "";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (error) {
    weatherInfo.classList.add("hidden");
    errorMessage.textContent = error.message;
  }
}

function displayWeather(data) {

  weatherInfo.classList.remove("hidden");

  cityName.textContent = `${data.name}, ${data.sys.country}`;

  temperature.textContent =
    `${Math.round(data.main.temp)}°C`;

  description.textContent =
    data.weather[0].description;

  humidity.textContent =
    `${data.main.humidity}%`;

  wind.textContent =
    `${data.wind.speed} km/h`;

  const iconCode = data.weather[0].icon;

  weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  changeBackground(data.weather[0].main);
}

function changeBackground(weather) {

  const body = document.body;

  switch(weather.toLowerCase()) {

    case "clear":
      body.style.background =
        "linear-gradient(135deg, #f6d365, #fda085)";
      break;

    case "clouds":
      body.style.background =
        "linear-gradient(135deg, #bdc3c7, #2c3e50)";
      break;

    case "rain":
      body.style.background =
        "linear-gradient(135deg, #4b79a1, #283e51)";
      break;

    case "snow":
      body.style.background =
        "linear-gradient(135deg, #e6dada, #274046)";
      break;

    default:
      body.style.background =
        "linear-gradient(135deg, #4facfe, #00f2fe)";
  }
}