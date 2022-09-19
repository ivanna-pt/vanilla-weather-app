let cityInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let currentBtn = document.querySelector("#current-btn");
let city = '';

let dataService = {
    url: 'https://api.openweathermap.org/data/2.5/',
    apiKey: '343d33d71141f1623d91c8c8aab91982',
    city: '',
    lon: '',
    lat: '',

    get cityWeather() {
        return fetch(this.url + "weather?q=" + this.city + "&appid=" + this.apiKey + "&units=metric")
            .then(response => response.json())
    },

    get cityForecast(){
        return fetch(this.url + "onecall?" + "lat=" + this.lat + "&lon=" + this.lon + "&exclude=current,minutely,hourly" +  "&appid=" + this.apiKey + "&units=metric")
            .then(response => response.json())
    },

    get currentLocationWeather() {
        return fetch( this.url + "weather?" + "lat=" + this.lat + "&lon=" + this.lon +"&appid=" + this.apiKey + "&units=metric")
            .then(response => response.json())
    }
}

function handleSubmit(event){
    dataService.city = document.querySelector("#search-input").value;
    dataService.cityWeather.then(response => {
        let newWeather = new Weather(response);
        newWeather.displayWeather();
        return response;
    })
        .then(response => {
        dataService.lat = response.coord.lat;
        dataService.lon = response.coord.lon;
        return dataService;
    })
        .then(dataService => dataService.cityForecast)
        .then(response => console.log(response));
    console.log(dataService);
    // this.dataService.cityForecast.then(()=> console.log(dataService.cityForecast));
    document.querySelector("#search-input").value = "";
}

function showPosition(position){

}

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
    document.querySelector("#search-input").value = "";
}

searchBtn.addEventListener("click", handleSubmit);
cityInput.addEventListener("keydown", function (e){
    if (e.code === "Enter") handleSubmit();
});
currentBtn.addEventListener("click", getCurrentLocation);

class Weather {
    constructor(value) {
        this.city = value.name;
        this.temperature = value.main.temp;
        this.description = value.weather[0].main;
        this.humidity = value.main.humidity;
        this.windspeed = value.wind.speed;
        this.pressure = value.main.pressure;
        this.realFeel = value.main.feels_like;
        this.iconID = value.weather[0].id;
    };

    displayWeather() {
        document.querySelector("#city").innerHTML = this.city;
        document.querySelector("#temperature").innerHTML = Math.round(this.temperature);
        document.querySelector(".weather__description").innerHTML = this.description;
        document.querySelector("#real-feel").innerHTML = Math.round(this.realFeel);
        document.querySelector("#wind").innerHTML = Math.round(this.windspeed);
        document.querySelector("#humidity").innerHTML = this.humidity;
        document.querySelector("#pressure").innerHTML = this.pressure;
    };

    changeIcon (img){
        let icon = findIcon(this.iconID);
        let attributeValue = `img/${icon}n.png`;
        img.setAttribute("src", attributeValue);
    };
}


//Toggle Units
const fahrenheitBtn = document.querySelector('#fahrenheit-btn');
const celsiusBtn = document.querySelector('#celsius-btn');
const unitSwitch = document.querySelector('.weather__unit-switch');

unitSwitch.addEventListener('click', toggleUnits);

function toggleUnits(e){
    if (e.target.id === 'celsius-btn'){
        fahrenheitBtn.classList.remove('active');
        celsiusBtn.classList.add('active');
    } else if (e.target.id === 'fahrenheit-btn') {
        celsiusBtn.classList.remove('active');
        fahrenheitBtn.classList.add('active');
    }
}
