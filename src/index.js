import "./style.css";

const form = document.querySelector("form");
const input = document.querySelector("input");

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=089669fece331a258cf56a3771f30bb9`;
  const response = await fetch(url, { mode: "cors" });

  console.log(response.json());
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(input.value);
  form.reset();
});
