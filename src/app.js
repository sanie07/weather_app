function UpadateWeatherData(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = FormatDate(date);
}

function FormatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let minutos = 0;
  if (date.getMinutes() < 10) {
    minutos = `0${date.getMinutes()}`;
  } else {
    minutos = date.getMinutes();
  }
  let output = `${days[date.getDay()]} ${date.getHours()}:${minutos}`;
  return output;
}

function searchCity(city) {
  let apiKey = "ed03b85af3afdd1609b1odt4bf2f3bbf";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(UpadateWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchSubmit);

searchCity("Asuncion");
