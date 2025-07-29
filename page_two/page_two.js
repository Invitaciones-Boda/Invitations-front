// FUNCION PARA INGRESAR AL BACKEND USANDO AJAX
function contador(valor) {
    $.ajax({
      url: "http://localhost:8000/invitation/contador/",
      type: "POST",
      data: { fecha: valor },
      success: function (response) {
        console.log("exito")
      },
      error: function (error) {
         console.log("fallo")
      },
    });
}

function abrirPopup(tipo) {
  const containerCeremonia = document.getElementById(
    "container-popup-ceremonia"
  );
  const containerCelebracion = document.getElementById(
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

const endDate = new Date('2025-10-04T18:00:00').getTime();
// Selecciona todos los elementos con esa clase, en orden
const countdownItems = document.querySelectorAll('.contdown-item-title');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    countdownItems.forEach(item => item.innerText = '00');
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Asigna cada valor respetando el orden
  countdownItems[0].innerText = days.toString().padStart(2, '0');
  countdownItems[1].innerText = hours.toString().padStart(2, '0');
  countdownItems[2].innerText = minutes.toString().padStart(2, '0');
  countdownItems[3].innerText = seconds.toString().padStart(2, '0');
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown();

document.addEventListener("DOMContentLoaded", function () {
  let date = new Date();
  console.log(date)

contador(date)

  // Cierra popup al hacer clic fuera del contenido
  document.addEventListener("click", function (e) {
    const containerCeremonia = document.getElementById(
      "container-popup-ceremonia"
    );
    const popupCeremonia = document.getElementById("Popup-ceremonia");

    const containerCelebracion = document.getElementById(
      "container-popup-celebracion"
    );
    const popupCelebracion = document.getElementById("Popup-celebracion");

    if (
      containerCeremonia?.style.display === "flex" &&
      !popupCeremonia?.contains(e.target)
    ) {
      containerCeremonia.style.display = "none";
    }

    if (
      containerCelebracion?.style.display === "flex" &&
      !popupCelebracion?.contains(e.target)
    ) {
      containerCelebracion.style.display = "none";
    }
  });
});
