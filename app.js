import { apiKey } from "./apiKey.js";
const app ={
    init: function(){
        document.getElementById('btnGet').addEventListener('click', app.fetchWeather);
        document.getElementById('btnCurrent').addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
        let lat = document.getElementById('latitude').value;
        let lon = document.getElementById('longitude').value;
        let key = apiKey;
        let lang = 'en';
        let units = 'metric';
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=${units}`;

        // fetch the weather
        fetch(url).then(response =>{
            if(response.ok){
                return response.json();
            }else{
                throw new Error(response.statusText);
            }
        }).then(data=>{
            app.showWeather(data);
        }).catch(console.err);
    },
    getLocation: (ev) => {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 1000*60*5
        };
        navigator.geolocation.getCurrentPosition(app.showPosition, app.showError, options);
    },
    showPosition: (position) => {
        //geolocation succeeded
        document.getElementById('latitude').value = position.coords.latitude.toFixed(2);
        document.getElementById('longitude').value = position.coords.longitude.toFixed(2);
    },
    showError: (error) => {
        //geolocation failed
        console.log(error);
    },
    showWeather: (response) => {
        let weatherCard = document.getElementById('weatherCard');
        let dt = new Date(response.dt * 1000);
        let sunrise = new Date(response.sys.sunrise * 1000);
        let sunset = new Date(response.sys.sunset * 1000);

        weatherCard.innerHTML =  `<h5 >${dt.toDateString()}</h5>
        <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png" class="" alt="${response.weather[0].icon}" />
        <div class="weather__info">
            <h3>${response.weather[0].main}</h3>
            <p>High ${response.main.temp_max} Low ${response.main.temp_min} </p>
            <p>HighFeels like ${response.main.feels_like}</p>
            <p>Pressure ${response.main.pressure}</p>
            <p>Humidty ${response.main.humidity}</p>
            <p>Wind ${response.wind.speed}m/s and ${response.wind.deg}º</p>
            <p>Sunrise ${sunrise.toDateString()}</p>
            <p>Sunset ${sunset.toDateString()}</p>
        </div>`;
    }


}


app.init();