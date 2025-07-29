function abrirPopup(tipo) {

  let containerCeremonia = document.getElementById("container-popup-ceremonia");
  let containerCelebracion = document.getElementById(
    "container-popup-celebracion"
  );

  if (!containerCeremonia || !containerCelebracion) {
    console.error("No se encontraron los contenedores de popup.");
    return;
  }

  if (tipo === "ceremonia") {
    containerCeremonia.style.display = "flex";
    containerCelebracion.style.display = "none";
  } else if (tipo === "celebracion") {
    containerCeremonia.style.display = "none";
    containerCelebracion.style.display = "flex";
  } else {
    containerCeremonia.style.display = "none";
    containerCelebracion.style.display = "none";
  }
}

function cerrarPopup(tipo) {

  let containerCeremonia = document.getElementById("container-popup-ceremonia");
  let containerCelebracion = document.getElementById(
    "container-popup-celebracion"
  );

  if (!containerCeremonia || !containerCelebracion) {
    console.error("No se encontraron los contenedores de popup.");
    return;
  }

  if (tipo === "ceremonia") {
    containerCeremonia.style.display = "none";
    containerCelebracion.style.display = "none";
  } else if (tipo === "celebracion") {
    containerCeremonia.style.display = "none";
    containerCelebracion.style.display = "none";
  } else {
    containerCeremonia.style.display = "none";
    containerCelebracion.style.display = "none";
  }
}

const endDate = new Date("2025-10-04T18:00:00").getTime();
// Selecciona todos los elementos con esa clase, en orden
const countdownItems = document.querySelectorAll(".contdown-item-title");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    countdownItems.forEach((item) => (item.innerText = "00"));
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Asigna cada valor respetando el orden
  countdownItems[0].innerText = days.toString().padStart(2, "0");
  countdownItems[1].innerText = hours.toString().padStart(2, "0");
  countdownItems[2].innerText = minutes.toString().padStart(2, "0");
  countdownItems[3].innerText = seconds.toString().padStart(2, "0");
}




document.addEventListener("DOMContentLoaded", function () {
  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
