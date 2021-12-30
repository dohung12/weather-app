import "./style.css";
import getData from "./getData";
import displayWeather from "./displayData";

import "core-js/stable";
import "regenerator-runtime/runtime";

const form = document.querySelector("form");
const input = document.querySelector("input");

async function getGeoCoding(cityName) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=089669fece331a258cf56a3771f30bb9`;
  const response = await fetch(url, { mode: "cors" });

  return response.json();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getGeoCoding(input.value).then((data) => {
    const { lat, lon } = data[0];

    getData(lat, lon).then(displayWeather);
  });
  form.reset();
});

// default display Hanoi's weather when first load page
document.addEventListener(
  "DOMContentLoaded",
  getData(21.0294, 105.8544).then(displayWeather)
);
