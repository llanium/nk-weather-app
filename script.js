const cities = [
  { name: "평양", lat: 39.0392, lon: 125.7625 },
  { name: "함흥", lat: 39.9917, lon: 127.6186 },
  { name: "청진", lat: 41.7956, lon: 129.7758 },
  { name: "신의주", lat: 40.1006, lon: 124.3981 },
  { name: "원산", lat: 39.1528, lon: 127.4436 }
];

const splash = document.getElementById("splash");
const main = document.getElementById("main");
const startBtn = document.getElementById("startBtn");
const cityList = document.getElementById("cityList");

startBtn.onclick = () => {
  splash.classList.remove("active");
  main.classList.add("active");
  loadWeather();
};

async function loadWeather() {
  cityList.innerHTML = "";
  for (const city of cities) {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
      const data = await res.json();
      const w = data.current_weather;

      const div = document.createElement("div");
      div.className = "city-card";
      div.innerHTML = `
        <h3>★ ${city.name}</h3>
        <p>기온: ${w.temperature}℃</p>
        <p>풍속: ${w.windspeed} m/s</p>
      `;
      cityList.appendChild(div);
    } catch (e) {
      const div = document.createElement("div");
      div.className = "city-card";
      div.innerHTML = `
        <h3>★ ${city.name}</h3>
        <p>자료를 불러올 수 없습니다</p>
      `;
      cityList.appendChild(div);
    }
  }
}

/* Map Modal */
const nkMap = document.getElementById("nkMap");
const mapModal = document.getElementById("mapModal");
const closeModal = document.getElementById("closeModal");

nkMap.onclick = () => {
  mapModal.style.display = "block";
};

closeModal.onclick = () => {
  mapModal.style.display = "none";
};