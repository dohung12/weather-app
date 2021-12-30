/* eslint-disable no-unused-vars */
import { addDays, addHours, format, startOfHour } from "date-fns";
import getCity from "./getCity";

const currentContainer = document.querySelector(".current-weather");
const hourlyContainer = document.querySelector(".hourly-weather");
const sideBarContainer = document.querySelector(".side-bar");
const dayFormat = "MMM dd, p";

function displayTemp(num) {
  return `${num}°C`;
}

function displayWeatherIcon(iconCode, size) {
  return `http://openweathermap.org/img/wn/${iconCode}${size}.png`;
}

// DISPLAY CURRENT'S SUPPORT FUNCTION
function displayCurrentHeader(name, country) {
  const p = document.createElement("p");
  p.textContent = format(new Date(), dayFormat);
  const h4 = document.createElement("h4");
  h4.textContent = `${name}, ${country}`;
  h4.className = "location";
  return [p, h4];
}
function displayCurrentMain(temp, icon) {
  const div = document.createElement("div");
  div.className = "current";
  const h2 = document.createElement("h2");
  h2.className = "temp";
  h2.textContent = displayTemp(temp);

  const img = document.createElement("img");
  img.src = displayWeatherIcon(icon, "@2x");

  div.appendChild(img);
  div.appendChild(h2);

  return div;
}
function displayInfo(category, info, unit) {
  const p = document.createElement("p");
  p.className = category;
  p.textContent = `${category}: ${info}${unit}`;
  return p;
}
function displayCurrentMiscInfo(
  pressure,
  visibility,
  humidity,
  description,
  feelsLike,
  sunrise,
  sunset
) {
  const div = document.createElement("div");
  div.className = "misc-info";

  const sunriseTime = format(new Date(sunrise * 1000), "p");
  const sunriseP = displayInfo("sunrise", sunriseTime, "");
  const sunsetTime = format(new Date(sunset * 1000), "p");
  const sunsetP = displayInfo("sunset", sunsetTime, "");

  const pressureInfo = displayInfo("pressure", pressure, "mb");
  const visibilityInfo = displayInfo("visibility", visibility / 1000, "km");
  const humidityInfo = displayInfo("humidity", humidity, "%");

  const h5 = document.createElement("h5");
  h5.className = "description";
  h5.textContent = `Feels like ${displayTemp(feelsLike)}. ${description}`;

  div.appendChild(h5);
  div.appendChild(pressureInfo);
  div.appendChild(visibilityInfo);
  div.appendChild(humidityInfo);
  div.appendChild(sunriseP);
  div.appendChild(sunsetP);

  return div;
}
function displayCurrent(current, city) {
  const { name, country } = city;
  const { sunrise, sunset, temp, humidity, pressure, visibility } = current;
  const { description, icon } = current.weather[0];
  const feelsLike = current.feels_like;

  const currentHeader = displayCurrentHeader(name, country);
  const currentMain = displayCurrentMain(temp, icon);
  const currentMisc = displayCurrentMiscInfo(
    pressure,
    visibility,
    humidity,
    description,
    feelsLike,
    sunrise,
    sunset
  );

  return [currentHeader[0], currentHeader[1], currentMain, currentMisc];
}

// DISPLAY HOURLY WEATHER
function display1Hour(obj, gapToCurrent) {
  const { temp } = obj;
  const { icon, description } = obj.weather[0];

  const hour = startOfHour(addHours(new Date(), gapToCurrent));
  const time = format(hour, dayFormat);
  const timeDisplay = document.createElement("p");
  timeDisplay.textContent = time;

  const p = document.createElement("p");
  p.className = "hourly-temp";
  p.textContent = displayTemp(temp);

  const img = document.createElement("img");
  img.src = displayWeatherIcon(icon, "");

  const desc = document.createElement("p");
  desc.textContent = description;

  const div = document.createElement("div");
  const infoDiv = document.createElement("div");
  infoDiv.className = "hourly-info";

  const tempDiv = document.createElement("div");
  tempDiv.className = "temp-div";
  tempDiv.appendChild(p);
  tempDiv.appendChild(img);
  infoDiv.appendChild(tempDiv);
  infoDiv.appendChild(desc);

  div.className = "hourly";
  div.appendChild(timeDisplay);
  div.appendChild(infoDiv);
  return div;
}
function displayHourlyWeather(hourly) {
  const h2 = document.createElement("h2");
  h2.textContent = "5-hour forecast";

  const localArr = [h2];
  for (let i = 0; i < 5; i += 1) {
    localArr.push(display1Hour(hourly[i], i + 1));
  }

  return localArr;
}

// DISPLAY SIDEBAR
function displayUvi(uvi) {
  const div = document.createElement("div");
  div.className = "uvi";
  let category;
  let color;
  if (uvi <= 2) {
    category = "low";
    color = "rgb(40, 149, 0)";
  } else if (uvi <= 5) {
    category = "moderate";
    color = "rgb(247, 228, 0)";
  } else if (uvi <= 7) {
    category = "high";
    color = "rgb(248, 89, 0)";
  } else if (uvi <= 10) {
    category = "very high";
    color = "rgb(216, 0, 29)";
  } else {
    category = "extreme";
    color = "rgb(107, 73, 200)";
  }

  const i = document.createElement("i");
  i.setAttribute("class", "fas fa-sun");

  const div1 = document.createElement("div");
  div1.className = "uvi-text";
  const uviP = document.createElement("p");
  uviP.textContent = `${uvi} UVI`;

  const categoryP = document.createElement("p");
  categoryP.textContent = category;
  categoryP.style.backgroundColor = color;

  div1.appendChild(uviP);
  div1.appendChild(categoryP);

  const div2 = document.createElement("div");
  div2.className = "uvi-info";
  const desc = document.createElement("p");
  desc.textContent = `${category} risk from UV rays`;

  div2.appendChild(div1);
  div2.appendChild(desc);

  div.appendChild(i);

  div.appendChild(div2);
  return div;
}
function display1Day(dayObj, gapFromToday) {
  const div = document.createElement("div");
  div.className = "next-1-day";
  const { max, min } = dayObj.temp;
  const { icon, main } = dayObj.weather[0];

  const img = document.createElement("img");
  img.src = displayWeatherIcon(icon, "");

  const div1 = document.createElement("div");

  const day = format(addDays(new Date(), gapFromToday), "MMM dd");
  const dayP = document.createElement("p");
  dayP.textContent = day;
  const mainP = document.createElement("h5");
  mainP.textContent = main;
  div1.appendChild(dayP);
  div1.appendChild(mainP);

  const tempP = document.createElement("p");
  tempP.textContent = `${Math.round(max)}°/${Math.round(min)}°`;

  div.appendChild(img);
  div.appendChild(div1);

  div.appendChild(tempP);
  return div;
}
function displayNextDays(daily, numDay) {
  const div = document.createElement("div");
  div.className = "next-day";
  const header = document.createElement("h5");
  header.textContent = "Weather Prediction";
  div.appendChild(header);
  for (let i = 0; i < numDay; i += 1) {
    div.appendChild(display1Day(daily[i], i + 1));
  }
  return div;
}
function displaySidebar(dataJSON) {
  const { uvi } = dataJSON.current;

  const uviDiv = displayUvi(uvi);
  const nextDays = displayNextDays(dataJSON.daily, 3);

  return [uviDiv, nextDays];
}
export default function displayWeather(dataJSON) {
  const { lat, lon } = dataJSON;
  currentContainer.innerHTML = "";
  hourlyContainer.innerHTML = "";
  sideBarContainer.innerHTML = "";

  (async () => {
    const city = await getCity(lat, lon);
    const current = displayCurrent(dataJSON.current, city[0]);
    current.forEach((element) => {
      currentContainer.appendChild(element);
    });
  })();

  const hourly = displayHourlyWeather(dataJSON.hourly);
  hourly.forEach((element) => {
    hourlyContainer.appendChild(element);
  });

  const sidebar = displaySidebar(dataJSON);
  sidebar.forEach((element) => {
    sideBarContainer.appendChild(element);
  });
}
