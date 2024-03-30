function UpadateWeatherData(response) {
  if (response.data.status == "not_found") {
    alert("Error: city not found");
    return;
  }
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = FormatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather_app_icon"/>`;

  getForecast(response.data.city);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (date.getDay() == 6) {
    return days[0];
  }
  return days[date.getDay() + 1];
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
function getForecast(city) {
  let apiKey = "ed03b85af3afdd1609b1odt4bf2f3bbf";
  let unit = "metric";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="row">
          <div class="col">
            <div class="forecast_date">${formatDay(day.time)}</div>
            <img
              src="${day.condition.icon_url}"
              alt="icon"
              width="60"
            />
            <div class="forecast_temperatures">
              <span class="forecast_temperature_max"> <strong> ${Math.round(
                day.temperature.maximum
              )}°<strong/> </span>
              <span class="forecast_temperature_min"> ${Math.round(
                day.temperature.minimum
              )}° </span>
            </div>
          </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchSubmit);

searchCity("Asuncion");
