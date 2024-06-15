const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const details = document.querySelector('.details');

search.addEventListener('click', () => {
    const APIKey = 'enter you API Key';
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city name}&units=metric&appid=${'APIKey'}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                alert('City not found!');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.details .humidity span');
            const windSpeed = document.querySelector('.details .windspeed span');
            const weatherMain = json.weather[0].main;

            switch (weatherMain) {
                case 'Clear':
                    image.src = 'icons/sunny.png';
                    break;
                case 'Rain':
                    image.src = 'icons/rainy.png';
                    break;
                case 'Snow':
                    image.src = 'icons/snowy.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'icons/misty.png'; 
                    break;
                default:
                    image.src = 'icons/cloudy.png';
                    break;
            }

            temperature.textContent = `${Math.round(json.main.temp)}°C`;
            description.textContent = `${json.weather[0].description}`;
            humidity.textContent = `${json.main.humidity}%`;
            windSpeed.textContent = `${json.wind.speed} m/s`;

            weatherBox.style.display = '';
            details.style.display = '';
        })
        .catch(err => {
            console.error('Error fetching weather data:', err);
            alert('Failed to fetch weather data.');
        });
});
