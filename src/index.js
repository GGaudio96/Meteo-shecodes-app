function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function searchCity(city) {
let apiKey = "35b4b416c408f4a70ee442o1td5f0b38";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML =`${response.data.temperature.humidity}%`;
    speedElement.innerHTML =`${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = `${Math.round(temperature)}°C`;

    getForecast(response.data.city);

}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes > 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {

    let forecastElement = document.querySelector("#forecast");

    let forecastHtml = ""

    response.data.daily.forEach(function (day, index) {
        if (index > 5) {
forecastHtml = 
forecastHtml + `
 <div class="row">
                <div class="column-2"> 
                    <div class="weather-forecast-date">
                ${formatDay(day.time)}
                </div>
                    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"alt=" width="38"> 
                    <div class="weather-forecast-temperature">
                    <span class="max-temperature">
                       ${Math.round(day.temperature.maximum)}
                    </span>
                    <span class="min-temperature">
                        ${Math.round(day.temperature.minimum)}
                    </span>  
                    </div>
                  
                </div>
            </div>

`;
}
    });


    forecastElement.innerHTML = forecastHtml


 
}

function getForecast(city) {
    let apiKey = "35b4b416c408f4a70ee442o1td5f0b38";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios(apiUrl).then(displayForecast)
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

searchCity("Istanbul");