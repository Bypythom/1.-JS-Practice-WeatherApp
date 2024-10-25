const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener('click', () => {
    console.log('Button clicked');
    if(searchBox.value.trim() === ''){
        alert("Please enter a city name");
        return
    }
});

const apiKey = "YOUR_API_KEY";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&q=`;

async function checkWeather(city){
    const response = await fetch(apiURL + city);
    var data = await response.json();

    console.log(data);

    document.querySelector(".cityName").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.querySelector(".windSpeed").innerHTML = "Wind: " + Math.round(data.wind.speed) + " km/h";

    //adjusting image to weather condition
    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/SunCloudyIcon.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/SunIcon.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/RainIcon.png";
    } else if (data.weather[0].main === "Snow") {
        weatherIcon.src = "images/SnowIcon.png";
    } else {
        weatherIcon.src = "images/DefaultWeatherIcon.png"; 
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
