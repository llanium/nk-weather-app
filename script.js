document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("main");
  const startBtn = document.getElementById("startBtn");
  const cityList = document.getElementById("cityList");
  const nkMap = document.getElementById("nkMap");
  const mapModal = document.getElementById("mapModal");
  const closeModal = document.getElementById("closeModal");

  // 시작 버튼
  startBtn.onclick = () => {
    splash.classList.remove("active");
    main.classList.add("active");
    loadWeather();
  };

  async function loadWeather() {
    const cities = [
      // 직할시
      { name: "평양", lat: 39.0392, lon: 125.7625 },

      // 특별시
      { name: "남포", lat: 38.7375, lon: 125.4070 },
      { name: "라선", lat: 42.2569, lon: 130.2972 },

      // 도 소재지
      { name: "함흥", lat: 39.9917, lon: 127.6186 },
      { name: "청진", lat: 41.7956, lon: 129.7758 },
      { name: "사리원", lat: 38.5072, lon: 125.7556 },
      { name: "해주", lat: 38.0406, lon: 125.7144 },
      { name: "강계", lat: 40.9695, lon: 126.5852 },
      { name: "혜산", lat: 41.4017, lon: 128.1778 },
      { name: "원산", lat: 39.1528, lon: 127.4436 },

      // 주요 도시
      { name: "개성", lat: 37.9708, lon: 126.5544 },
      { name: "신의주", lat: 40.1006, lon: 124.3981 },
      { name: "회령", lat: 42.4413, lon: 129.7460 },
      { name: "김책", lat: 40.6681, lon: 129.1942 },
      { name: "문천", lat: 39.3811, lon: 127.2517 },
      { name: "안주", lat: 39.6183, lon: 125.6647 },
      { name: "정주", lat: 39.6931, lon: 125.2103 },
      { name: "구성", lat: 39.9833, lon: 125.0500 },
      { name: "선천", lat: 39.6986, lon: 124.7281 },
      { name: "덕천", lat: 39.8222, lon: 125.3983 },
      { name: "단천", lat: 40.4608, lon: 128.8991 }
    ];

    cityList.innerHTML = "";

    for (const city of cities) {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
        );
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

  // 지도 확대 모달
  nkMap.onclick = () => {
    mapModal.style.display = "flex";
  };

  closeModal.onclick = () => {
    mapModal.style.display = "none";
  };
});