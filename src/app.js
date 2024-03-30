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

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml += `<div class="row">
          <div class="col-2">
            <div class="forecast_date">${day}</div>
            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
              alt="icon_thu"
              width="60"
            />
            <div class="forecast_temperatures">
              <span class="forecast_temperature_max"> 18 </span>
              <span class="forecast_temperature_min"> 12 </span>
            </div>
          </div>
        </div>`;
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
displayForecast();
