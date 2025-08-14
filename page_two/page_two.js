function abrirPopup(tipo) {
  const containerCeremonia = document.getElementById("container-popup-ceremonia");
  const containerCelebracion = document.getElementById("container-popup-celebracion");

  if (!containerCeremonia || !containerCelebracion) {
    console.error("No se encontraron los contenedores de popup.");
    return;
  }

  containerCeremonia.style.display = tipo === "ceremonia" ? "flex" : "none";
  containerCelebracion.style.display = tipo === "celebracion" ? "flex" : "none";
}

function cerrarPopup() {
  const containerCeremonia = document.getElementById("container-popup-ceremonia");
  const containerCelebracion = document.getElementById("container-popup-celebracion");

  if (!containerCeremonia || !containerCelebracion) {
    console.error("No se encontraron los contenedores de popup.");
    return;
  }

  containerCeremonia.style.display = "none";
  containerCelebracion.style.display = "none";
}

const endDate = new Date("2025-10-04T18:00:00").getTime();
const countdownItems = document.querySelectorAll(".contdown-item-title");

function updateCountdown() {
  const now = Date.now();
  const distance = endDate - now;

  if (distance <= 0) {
    countdownItems.forEach(item => item.innerText = "00");
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownItems[0].innerText = days.toString().padStart(2, "0");
  countdownItems[1].innerText = hours.toString().padStart(2, "0");
  countdownItems[2].innerText = minutes.toString().padStart(2, "0");
  countdownItems[3].innerText = seconds.toString().padStart(2, "0");
}

const iconos = [
  {
    id: "icono1",
    path: "../sources/vino.json",
    attr: "stroke",
    color: "#cfc3bd",
    type: "svg"
  },
  {
    id: "icono2",
    path: "../sources/iglesia (1).json",
    newColor: [0.9490196, 0.8823529, 0.85490196, 1],
    targetColors: [
      [0.2, 0.8, 0.8, 1],
      [0.20000000298, 0.800000011921, 0.800000011921, 1],
    ],
    strokeColor: "#cfc3bd",
    type: "json"
  },
];

function replaceColors(obj, targetColors, newColor) {
  if (Array.isArray(obj)) {
    if (obj.length === 4 && targetColors.some(c => JSON.stringify(c) === JSON.stringify(obj))) {
      Object.assign(obj, newColor);
    } else {
      obj.forEach(item => replaceColors(item, targetColors, newColor));
    }
  } else if (typeof obj === "object" && obj !== null) {
    Object.values(obj).forEach(value => replaceColors(value, targetColors, newColor));
  }
}

iconos.forEach(icono => {
  if (icono.type === "svg") {
    const anim = lottie.loadAnimation({
      container: document.getElementById(icono.id),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: icono.path
    });
    anim.addEventListener("DOMLoaded", () => {
      document.querySelectorAll(`#${icono.id} svg path`).forEach(path => {
        path.setAttribute(icono.attr, icono.color);
      });
    });
  } else if (icono.type === "json") {
    fetch(icono.path)
      .then(res => res.json())
      .then(data => {
        replaceColors(data, icono.targetColors, icono.newColor);
        const anim = lottie.loadAnimation({
          container: document.getElementById(icono.id),
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: data
        });
        anim.addEventListener("DOMLoaded", () => {
          document.querySelectorAll(`#${icono.id} svg path`).forEach(path => {
            path.setAttribute("stroke", icono.strokeColor);
          });
        });
      });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  interval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
