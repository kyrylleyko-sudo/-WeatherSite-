const apiKey = "ВАШ_API_KEY";
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } else {
    document.getElementById("cityName").textContent = "Місто не знайдено 😢";
    document.getElementById("temperature").textContent = "";
    document.getElementById("description").textContent = "";
    document.getElementById("weatherIcon").src = "";
  }
}
