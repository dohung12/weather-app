import "./style.css";
import displayCurrent from "./displayCurrentControl";

const form = document.querySelector("form");
const input = document.querySelector("input");
const currentWeatherContainer = document.querySelector(".current-weather");

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=089669fece331a258cf56a3771f30bb9&units=metric`;
  const response = await fetch(url, { mode: "cors" });

  return response.json();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(input.value).then((data) => {
    console.log(data, typeof data);
    const currentWeather = displayCurrent(data);
    currentWeatherContainer.appendChild(currentWeather);
  });
  form.reset();
});
