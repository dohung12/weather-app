export default async function getData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alert&appid=089669fece331a258cf56a3771f30bb9&units=metric`;

  const data = await fetch(url, { mode: "cors" });

  return data.json();
}
