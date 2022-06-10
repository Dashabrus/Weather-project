let now = new Date();
let dateTime = document.querySelector(".currentdt");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateTime.innerHTML = `${day}, ${date}.${month} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showWeather(response) {
  let city = document.querySelector("#heading");
  let temperatureValue = document.querySelector("#current-Number");
  let feelsLike = document.querySelector(".feels");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#windSpeed");
  let highest = Math.round(response.data.main.temp_max);
  let lowest = Math.round(response.data.main.temp_min);
  let hl = document.querySelector(".hl");
  let description = document.querySelector(".description");

  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}° C`;
  temperatureValue.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  hl.innerHTML = `H:${highest}° L:${lowest}°`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  city.innerHTML = `${response.data.name}`;
  description.innerHTML = `"${
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1)
  }"`;
  celsiusTemp = Math.round(response.data.main.temp);

  let emojiiElement = document.querySelector(`.emojii_main`);
  emojiiElement.innerHTML = getEmojii(response.data);
  getForecast(response.data.coord);
}

function getEmojii(response) {
  if (response.weather[0].description === `clear sky`) {
    return `☀️`;
  } else if (response.weather[0].description === `few clouds`) {
    return `🌤`;
  } else if (response.weather[0].description === `scattered clouds`) {
    return `⛅️`;
  } else if (response.weather[0].description === `broken clouds`) {
    return `🌥`;
  } else if (response.weather[0].description === `overcast clouds`) {
    return `☁️`;
  } else if (
    response.weather[0].description === `thunderstorm with rain` ||
    response.weather[0].description === `thunderstorm with heavy rain` ||
    response.weather[0].description === `thunderstorm with drizzle` ||
    response.weather[0].description === `hunderstorm with heavy drizzle`
  ) {
    return `⛈`;
  } else if (
    response.weather[0].description === `light rain` ||
    response.weather[0].description === `moderate rain` ||
    response.weather[0].description === `heavy intensity rain` ||
    response.weather[0].description === `very heavy rain` ||
    response.weather[0].description === `extreme rain`
  ) {
    return `🌦`;
  } else if (
    response.weather[0].description === `freezing rain` ||
    response.weather[0].description === `sleet` ||
    response.weather[0].description === `light shower sleet` ||
    response.weather[0].description === `shower sleet` ||
    response.weather[0].description === `light rain and snow` ||
    response.weather[0].description === `rain and snow`
  ) {
    return `🌨`;
  } else if (
    response.weather[0].description === ` light snow ` ||
    response.weather[0].description === `snow` ||
    response.weather[0].description === `heavy snow` ||
    response.weather[0].description === `light shower snow` ||
    response.weather[0].description === `shower snow` ||
    response.weather[0].description === `heavy shower snow`
  ) {
    return `❄️`;
  } else if (
    response.weather[0].description === `thunderstorm with light rain` ||
    response.weather[0].description === `light thunderstorm` ||
    response.weather[0].description === `thunderstorm` ||
    response.weather[0].description === `heavy thunderstorm` ||
    response.weather[0].description === `ragged thunderstorm` ||
    response.weather[0].description === `thunderstorm with light drizzle`
  ) {
    return `🌩`;
  } else if (
    response.weather[0].description === `mist` ||
    response.weather[0].description === `smoke` ||
    response.weather[0].description === `haze` ||
    response.weather[0].description === `sand/ dust whirls` ||
    response.weather[0].description === `fog` ||
    response.weather[0].description === `sand` ||
    response.weather[0].description === `dust` ||
    response.weather[0].description === `volcanic ash`
  ) {
    return `🌫`;
  } else if (
    response.weather[0].description === `light intensity drizzle` ||
    response.weather[0].description === `drizzle` ||
    response.weather[0].description === `heavy intensity drizzle` ||
    response.weather[0].description === `light intensity drizzle rain` ||
    response.weather[0].description === `drizzle rain` ||
    response.weather[0].description === `heavy intensity drizzle rain` ||
    response.weather[0].description === `shower rain and drizzle` ||
    response.weather[0].description === `heavy shower rain and drizzle` ||
    response.weather[0].description === `shower drizzle` ||
    response.weather[0].description === `light intensity shower rain` ||
    response.weather[0].description === `shower rain` ||
    response.weather[0].description === `heavy intensity shower rain` ||
    response.weather[0].description === `ragged shower rain`
  ) {
    return `🌧`;
  } else {
    return `🌪`;
  }
}

function displayForecast(responce) {
  let forecast = responce.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class='col'> <div class ="card" style="width: 8rem"> <p class = "emojii">${getEmojii(
          forecastDay
        )}</p> <div class="card-body"<p class = "card-text"> H: ${Math.round(
          forecastDay.temp.max
        )}° <br/> L: ${Math.round(forecastDay.temp.min)}° <br/> ${formatDay(
          forecastDay.dt
        )} </p> </div></div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "6a809824c32cedbbe5da28815dd90f96";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast, getEmojii);
}

function searchCity(city) {
  let apiKey = "6a809824c32cedbbe5da28815dd90f96";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather, getEmojii);
}

function submitting(event) {
  event.preventDefault();
  let city = document.querySelector("#formInput").value;
  searchCity(city);
}

let form = document.querySelector(".city-form");
form.addEventListener("submit", submitting);

function positionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6a809824c32cedbbe5da28815dd90f96";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionTemp);
}

let button = document.querySelector(".currentLocation");
button.addEventListener("click", getCurrentPosition);

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-Number");
  celsiusButton.classList.remove("active");
  celsiusButton.removeAttribute("active");
  fahrenheitButton.classList.add("active");
  let fahrenheitTemperature = Math.round(celsiusTemp * 1.8 + 32);
  tempElement.innerHTML = fahrenheitTemperature;
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-Number");
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  tempElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

searchCity("Kyiv");
