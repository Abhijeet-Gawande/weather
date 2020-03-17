// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// Creating vars

const iconElement = document.querySelector(".weather-icon");

const tempElement = document.querySelector(".temperature-value");

const descElement = document.querySelector(".temperature-description p");

const locationElement = document.querySelector(".location p");

const notificationElement = document.querySelector(".notification");

//App data

const weather = {};
weather.temperature = {
    unit: "celsius"
}

// const and vars

const KELVIN = 273;

// API Key

const key = "7c12aecd6ec369d0837c27a5e42d4bf0";

// Browser Supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Your web browser does not support Geolocation!</p>";
}

// Creating function setPosiion

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Displaying error if geolocation service is not working!

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Please allow location access !</p>`;
}
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    // Fetching the values from API

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.IconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}
// Creating function for displaying the weather

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.IconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
// Temp Convertor
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}
// User clicks on temperature
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);


        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "Fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});