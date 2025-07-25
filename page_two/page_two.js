window. abrirPopup = function abrirPopup(tipo) {
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

document.addEventListener("DOMContentLoaded", function () {
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
