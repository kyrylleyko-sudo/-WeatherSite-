const API_KEY = "72d89fbe9e8d8c21255e6f84765f7f34";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Введіть назву міста!");

    const weatherBox = document.getElementById("weather");
    const forecastBox = document.getElementById("forecast");

    const urlWeather =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`;

    const urlForecast =
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ua&appid=${API_KEY}`;

    try {
        const weatherData = await fetch(urlWeather).then(r => r.json());
        const forecastData = await fetch(urlForecast).then(r => r.json());

        if (weatherData.cod !== 200) {
            weatherBox.innerHTML = `<p>Місто не знайдено!</p>`;
            return;
        }
        weatherBox.innerHTML = `
            <h2>${weatherData.name}</h2>
            
            <div class="current-weather-info"> 
                
                <div class="main-data"> 
                    <img class="icon" src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Погодна іконка"> 
                    <p class="current-temp">${Math.round(weatherData.main.temp)}°C</p> 
                </div>
                
                <div class="details-column">
                    <p><b>Відчувається як:</b> ${Math.round(weatherData.main.feels_like)}°C</p>
                    <p><b>Опис:</b> ${weatherData.weather[0].description}</p>
                    <p><b>Вітер:</b> ${weatherData.wind.speed} м/с</p>
                </div>
            </div>
        `;
        forecastBox.innerHTML = "";
        const filtered = forecastData.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        filtered.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("uk-UA", {
                weekday: "short",
                day: "numeric",
                month: "numeric"
            });

            forecastBox.innerHTML += `
                <div class="day">
                    <p>${date}</p>
                    <img class="icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                    <p>${Math.round(day.main.temp)}°C</p>
                </div>
            `;
        });

    } catch (error) {
        weatherBox.innerHTML = "<p>Помилка при отриманні даних...</p>";
        console.error(error);
    }
}


