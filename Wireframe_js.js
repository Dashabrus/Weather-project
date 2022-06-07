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
let minutes = now.getMinutes();
dateTime.innerHTML = `${day}, ${date}.${month} ${hours}:${minutes}`;

function showWeather(response) {
  let city = document.querySelector("#heading");
  city.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureValue = document.querySelector("#current-Number");
  temperatureValue.innerHTML = temperature;
  let feelsLike = document.querySelector(".feels");
  feelsLike.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}° C`;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let highest = Math.round(response.data.main.temp_max);
  let lowest = Math.round(response.data.main.temp_min);
  let hl = document.querySelector(".hl");
  hl.innerHTML = `H:${highest}° L:${lowest}°`;
  let description = document.querySelector(".description");
  description.innerHTML = `"${
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1)
  }"`;
  let emojiiElement = document.querySelector(`.emojii_main`);
  if (response.data.weather[0].description === `clear sky`) {
    emojiiElement.innerHTML = `☀️`;
  } else if (response.data.weather[0].description === `few clouds`) {
    emojiiElement.innerHTML = `🌤`;
  } else if (response.data.weather[0].description === `scattered clouds`) {
    emojiiElement.innerHTML = `⛅️`;
  } else if (response.data.weather[0].description === `broken clouds`) {
    emojiiElement.innerHTML = `🌥`;
  } else if (response.data.weather[0].description === `overcast clouds`) {
    emojiiElement.innerHTML = `☁️`;
  } else if (
    response.data.weather[0].description === `thunderstorm with rain` ||
    `thunderstorm with heavy rain` ||
    `thunderstorm with drizzle` ||
    `hunderstorm with heavy drizzle`
  ) {
    emojiiElement.innerHTML = `⛈`;
  } else if (
    response.data.weather[0].description === `light rain` ||
    `moderate rain` ||
    `heavy intensity rain` ||
    `very heavy rain` ||
    `extreme rain`
  ) {
    emojiiElement.innerHTML = `🌦`;
  } else if (
    response.data.weather[0].description === `freezing rain` ||
    `sleet` ||
    `light shower sleet` ||
    `shower sleet` ||
    `light rain and snow` ||
    `rain and snow`
  ) {
    emojiiElement.innerHTML = `🌨`;
  } else if (
    response.data.weather[0].description === ` light snow ` ||
    `snow` ||
    `heavy snow` ||
    `light shower snow` ||
    `shower snow` ||
    `heavy shower snow`
  ) {
    emojiiElement.innerHTML = `❄️`;
  } else if (
    response.data.weather[0].description === `thunderstorm with light rain` ||
    `light thunderstorm` ||
    `thunderstorm` ||
    `heavy thunderstorm` ||
    `ragged thunderstorm` ||
    `thunderstorm with light drizzle`
  ) {
    emojiiElement.innerHTML = `🌩`;
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
  } else {
    emojiiElement.innerHTML = `🌪`;
  }
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

searchCity("Kyiv");

//let temp = 18;
//function changeF(event) {
//event.preventDefault();
//let fahrenheit = Math.round(temp * 1.8 + 32);
//let numberF = document.querySelector("#current-Number");
//numberF.innerHTML = `${fahrenheit}`;}
//let fahrenheitButton = document.querySelector("#farenheit");
//fahrenheitButton.addEventListener("click", changeF);

//function changeC(event) {
//event.preventDefault();
//let celsius = temp;
//let numberC = document.querySelector("#current-Number");
//numberC.innerHTML = `${celsius}`;}
//let celsiusButton = document.querySelector("#celsius");
//celsiusButton.addEventListener("click", changeC);
