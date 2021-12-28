/* eslint-disable no-unused-vars */

function createCurrentMain(temp, weather, iconURL) {
  const div = document.createElement("div");
  div.className = "current-main";

  const tempText = document.createElement("h2");
  tempText.innerHTML = `${temp}&deg;C`;
  tempText.className = "current-temp";
  const weatherText = document.createElement("p");
  weatherText.textContent = weather;
  const weatherIcon = document.createElement("img");
  weatherIcon.src = iconURL;

  div.appendChild(tempText);
  div.appendChild(weatherText);
  div.appendChild(weatherIcon);
  return div;
}

function createMiscInfo(category, info, unit) {
  const div = document.createElement("div");
  div.className = category;

  const header = document.createElement("h4");
  header.textContent = category;
  const text = document.createElement("p");
  text.textContent = info + unit;

  div.appendChild(header);
  div.appendChild(text);
  return div;
}

function createCurrentMisc(humidity, visibility, pressure) {
  const div = document.createElement("div");
  div.className = "current-misc";
  const humidityItem = createMiscInfo("humidity", humidity, "%");
  const visibilityItem = createMiscInfo("visibility", visibility / 1000, "km");
  const pressureItem = createMiscInfo("pressure", pressure, "mb");

  div.appendChild(humidityItem);
  div.appendChild(visibilityItem);
  div.appendChild(pressureItem);

  return div;
}

export default function displayCurrent(data) {
  const { humidity, temp, pressure } = data.main;

  const { visibility } = data;
  const { lat, lon } = data.coord;

  const weather = data.weather[0].description;
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const div = document.createElement("div");
  div.className = "current-display";

  const currentMain = createCurrentMain(temp, weather, iconURL);

  const currentMisc = createCurrentMisc(humidity, visibility, pressure);

  div.appendChild(currentMain);
  div.appendChild(currentMisc);

  return div;
}
