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
  let emojiis = document.querySelector(`.emojii`);
  if (response.data.weather[0].description === `clear sky`) {
    emojiiElement.innerHTML = `☀️`;
    emojiis = `☀️`;
  } else if (response.data.weather[0].description === `few clouds`) {
    emojiiElement.innerHTML = `🌤`;
    emojiis = `🌤`;
  } else if (response.data.weather[0].description === `scattered clouds`) {
    emojiiElement.innerHTML = `⛅️`;
    emojiis = `⛅️`;
  } else if (response.data.weather[0].description === `broken clouds`) {
    emojiiElement.innerHTML = `🌥`;
    emojiis = `🌥`;
  } else if (response.data.weather[0].description === `overcast clouds`) {
    emojiiElement.innerHTML = `☁️`;
    emojiis = `☁️`;
  } else if (
    response.data.weather[0].description === `thunderstorm with rain` ||
    `thunderstorm with heavy rain` ||
    `thunderstorm with drizzle` ||
    `hunderstorm with heavy drizzle`
  ) {
    emojiiElement.innerHTML = `⛈`;
    emojiis = `⛈`;
  } else if (
    response.data.weather[0].description === `light rain` ||
    `moderate rain` ||
    `heavy intensity rain` ||
    `very heavy rain` ||
    `extreme rain`
  ) {
    emojiiElement.innerHTML = `🌦`;
    emojiis = `🌦`;
  } else if (
    response.data.weather[0].description === `freezing rain` ||
    `sleet` ||
    `light shower sleet` ||
    `shower sleet` ||
    `light rain and snow` ||
    `rain and snow`
  ) {
    emojiiElement.innerHTML = `🌨`;
    emojiis = `🌨`;
  } else if (
    response.data.weather[0].description === ` light snow ` ||
    `snow` ||
    `heavy snow` ||
    `light shower snow` ||
    `shower snow` ||
    `heavy shower snow`
  ) {
    emojiiElement.innerHTML = `❄️`;
    emojiis = `❄️`;
  } else if (
    response.data.weather[0].description === `thunderstorm with light rain` ||
    `light thunderstorm` ||
    `thunderstorm` ||
    `heavy thunderstorm` ||
    `ragged thunderstorm` ||
    `thunderstorm with light drizzle`
  ) {
    emojiiElement.innerHTML = `🌩`;
    emojiis = `🌩`;
  } else if (
    response.data.weather[0].description === `mist` ||
    `smoke` ||
    `haze` ||
    `sand/ dust whirls` ||
    `fog` ||
    `sand` ||
    `dust` ||
    `volcanic ash`
  ) {
    emojiiElement.innerHTML = `🌫`;
    emojiis = `🌫`;
  } else if (
    response.data.weather[0].description === `light intensity drizzle` ||
    `drizzle` ||
    `heavy intensity drizzle` ||
    `light intensity drizzle rain` ||
    `drizzle rain` ||
    `heavy intensity drizzle rain` ||
    `shower rain and drizzle` ||
    `heavy shower rain and drizzle` ||
    `shower drizzle` ||
    `light intensity shower rain` ||
    `shower rain` ||
    `heavy intensity shower rain` ||
    `ragged shower rain`
  ) {
    emojiiElement.innerHTML = `🌧`;
    emojiis.fore = `🌧`;
  } else {
    emojiiElement.innerHTML = `🌪`;
    emojiis = `🌪`;
  }

  function displayForecast(responce) {
    let forecast = responce.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class='col'> <div class ="card" style="width: 8rem"> <p class = "emojii">${emojiis}</p> <div class="card-body"<p class = "card-text"> H: ${Math.round(
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
    axios.get(apiUrl).then(displayForecast);
  }
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "6a809824c32cedbbe5da28815dd90f96";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
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
  celsiusButton.removeAttribute();
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
