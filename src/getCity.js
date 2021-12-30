export default async function getCity(lat, lon) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=089669fece331a258cf56a3771f30bb9`;

  const data = await fetch(url, { mode: "cors" });

  return data.json();
}
