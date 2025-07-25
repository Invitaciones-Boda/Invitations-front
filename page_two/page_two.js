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

  console.log('Abriendo popup de tipo:', tipo);
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
};

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
