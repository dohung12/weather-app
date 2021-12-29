/* eslint-disable no-unused-vars */
import { addDays, addHours, format, startOfHour } from "date-fns";

const currentContainer = document.querySelector(".current-weather");
const hourlyContainer = document.querySelector(".hourly-weather");
const tmrContainer = document.querySelector(".tmr-weather");

function displayTemp(num) {
  return `${num}°C`;
}

function displayWeatherIcon(iconCode, size) {
  return `http://openweathermap.org/img/wn/${iconCode}${size}.png`;
}

function displayCurrent(current) {
  function displayCurrentMain(temp, icon, description) {
    const div = document.createElement("div");

    const h2 = document.createElement("h2");
    h2.className = "temp";
    h2.textContent = displayTemp(temp);

    const p = document.createElement("p");
    p.className = "description";
    p.textContent = description;

    const img = document.createElement("img");
    img.src = displayWeatherIcon(icon, "@2x");

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(img);
    return div;
  }
  function displayCurrentMiscInfo(pressure, visibility, humidity) {
    function displayInfo(category, info, unit) {
      const div = document.createElement("div");
      const h4 = document.createElement("h4");
      h4.className = category;
      h4.textContent = category;

      const p = document.createElement("p");
      p.textContent = info + unit;

      div.appendChild(h4);
      div.appendChild(p);
      return div;
    }

    const div = document.createElement("div");
    div.className = "misc-info";

    const pressureInfo = displayInfo("pressure", pressure, "mb");
    const visibilityInfo = displayInfo("visibility", visibility / 1000, "km");
    const humidityInfo = displayInfo("humidity", humidity, "%");

    div.appendChild(pressureInfo);
    div.appendChild(visibilityInfo);
    div.appendChild(humidityInfo);

    return div;
  }
  const { temp, humidity, pressure, visibility } = current;
  const { description, icon } = current.weather[0];

  const div = document.createElement("div");
  const currentMain = displayCurrentMain(temp, icon, description);
  const currentMisc = displayCurrentMiscInfo(pressure, visibility, humidity);
  div.appendChild(currentMain);
  div.appendChild(currentMisc);

  return div;
}

function displayHourlyWeather(hourly) {
  function display1Hour(obj, gapToCurrent) {
    const { temp } = obj;
    const { icon, description } = obj.weather[0];
    const hour = startOfHour(addHours(new Date(), gapToCurrent));
    // const time = format(hour, "E, MMM dd HH");
    const time = format(hour, "PPpp");
    const div = document.createElement("div");

    const timeDisplay = document.createElement("p");
    timeDisplay.textContent = time;
    const p = document.createElement("p");
    p.textContent = displayTemp(temp);
    const img = document.createElement("img");
    img.src = displayWeatherIcon(icon, "");

    const desc = document.createElement("p");
    desc.textContent = description;

    div.appendChild(timeDisplay);
    div.appendChild(p);
    div.appendChild(img);
    div.appendChild(desc);
    return div;
  }
  const div = document.createElement("div");

  for (let i = 0; i < 5; i += 1) {
    div.appendChild(display1Hour(hourly[i], i + 1));
  }

  return div;
}

function displayNextDay(nextday) {
  function displayTmrTemp(tempObj) {
    function createTimeBlock(temp, when) {
      const div = document.createElement("div");

      const h4 = document.createElement("h4");
      h4.textContent = displayTemp(temp);

      const p = document.createElement("p");
      p.textContent = when;

      div.appendChild(h4);
      div.appendChild(p);

      return div;
    }

    const div = document.createElement("div");
    div.className = "tmr-temp";

    const morn = createTimeBlock(tempObj.morn, "morning");
    const day = createTimeBlock(tempObj.day, "Day");
    const eve = createTimeBlock(tempObj.eve, "everning");
    const night = createTimeBlock(tempObj.night, "night");

    div.appendChild(morn);
    div.appendChild(day);
    div.appendChild(eve);
    div.appendChild(night);

    return div;
  }

  function displayTmrGeneral() {
    const div = document.createElement("div");
    div.className = "tmr-general";
    const h2 = document.createElement("h2");
    h2.textContent = "Tomorrow";

    const p1 = document.createElement("p");
    p1.textContent = displayTemp(nextday.temp.max);

    const p2 = document.createElement("p");
    p2.textContent = displayTemp(nextday.temp.min);

    const p3 = document.createElement("p");
    p3.textContent = nextday.weather[0].description;

    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);

    return div;
  }

  const tmrTemp = displayTmrTemp(nextday.temp);
  const tmrGeneral = displayTmrGeneral();

  return [tmrTemp, tmrGeneral];
}

export default function displayWeather(dataJSON) {
  const current = displayCurrent(dataJSON.current);
  currentContainer.appendChild(current);

  const hourly = displayHourlyWeather(dataJSON.hourly);
  hourlyContainer.appendChild(hourly);

  const tmr = displayNextDay(dataJSON.daily[0]);
  tmrContainer.appendChild(tmr[0]);
  tmrContainer.appendChild(tmr[1]);
  console.log(dataJSON);
}
