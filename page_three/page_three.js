import { customConfirm } from '../confirm.js'
import { Toast } from '../toast.js';

function confirmarAsistenciaInvitados(data) {
  $.ajax({
    url: "https://samlop-backend.online/invitation/confirmacion/",
    type: "POST",
    data: { codigo: valor }, 
    success: function (response) {
      localStorage.setItem("estadoConfirmacion", "confirmado");
      Toast.success("Confirmación exitosa");
      cerrarPopupConfirmarAsistencia();
      validarEstadoConfirmacion();
      form.style.display = '';
    },
    error: function (xhr, status, error) {
      Toast.error("Confirmación errónea, por favor comunícate con nosotros");
      form.style.display = '';
    },
  });
}

window.abrirPopupConfirmarAsistencia = function abrirPopupConfirmarAsistencia() {
  try {
    let popupInvitado = document.getElementById("container-popup");

    popupInvitado.style.display = "flex";
  } catch (error) {
    console.log("Error al abrir popup");
  }
}

window.cerrarPopupConfirmarAsistencia = function cerrarPopupConfirmarAsistencia() {
  try {
    let popupInvitado = document.getElementById("container-popup");

    popupInvitado.style.display = "none";
  } catch (error) {
    console.log("Error al cerrar popup");
  }
}

window.confirmarAsistencia = async function confirmarAsistencia(event) {
  event.preventDefault();

  let form = document.getElementById("Popup");
  if (!form) {
    Toast.error("No se encontró el formulario de confirmación.");
    return;
  }

  let invitados = form.querySelectorAll(".invitados input[type='checkbox']");
  let confirmados = [];

  invitados.forEach((invitado) => {
    if (invitado.checked) {
      confirmados.push(invitado.name);
    }
  });

  if (confirmados.length > 0) {
    form.style.display = 'none';
    let confirmacion = await customConfirm(
      `¿Confirmar asistencia para los siguientes invitados? \n <strong>${confirmados.join(
        ", "
      )}</strong>`
    );

    if (!confirmacion) {
      Toast.warning("Asistencia no confirmada.");
      form.style.display = '';
      return;
    }

    // Obtener datos desde localStorage
    let codigo = localStorage.getItem("codigo");

    let data = {
      codigo: codigo || "sin-codigo",
      invitados: confirmados,
      confirmados: confirmados.length,
    };

    confirmarAsistenciaInvitados(data);
  } else {
    Toast.warning("No se ha confirmado la asistencia de ningún invitado.");
    form.style.display = '';
  }
}

window.cerrarPopup = function cerrarPopup(tipo) {
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

function validarEstadoConfirmacion() {
  let estadoConfirmacion = localStorage.getItem("estadoConfirmacion");
  let contentConfirm = document.getElementById("content-confirm");

  if (estadoConfirmacion === "confirmado") {
    contentConfirm.innerHTML = `
      <div>
        <h2>¡Gracias por confirmar tu asistencia!</h2>
        <p>Nos alegra mucho que puedas acompañarnos en este día tan especial.</p>
      </div>
    `;
  }

};

function generarCheckboxInvitados() {
  const invitadosDiv = document.querySelector(".invitados");
  invitadosDiv.innerHTML = ""; // Limpiar contenido actual

  let nombres = localStorage.getItem("Invitados");
  if (!nombres) return;

  nombres = nombres.split(",").map((nombre) => nombre.trim());

  nombres.forEach((nombre, index) => {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = nombre;
    input.id = `invitado${index + 1}`;

    const span = document.createElement("span");
    span.textContent = nombre;

    label.appendChild(input);
    label.appendChild(span);
    invitadosDiv.appendChild(label);
  });

  validarEstadoConfirmacion();
}

// Llama esta función cuando se abra el popup
window.addEventListener("DOMContentLoaded", generarCheckboxInvitados);

const colorNegroBase_corbata = [0, 0, 0, 1];
const colorNegroNuevo_corbata = [0.811, 0.765, 0.741, 1]; // #cfc3bd

const colorCianBase1_corbata = [0.2, 0.8, 0.8, 1];
const colorCianBase2_corbata = [0.20000000298, 0.800000011921, 0.800000011921, 1];
const colorCianNuevo_corbata = [0.901960784, 0.835294118, 0.807843137, 1]; // #E6D5CE

function compararColores_corbata(c1, c2, tolerancia = 0.0001) {
  return c1.length === c2.length && c1.every((v, i) => Math.abs(v - c2[i]) < tolerancia);
}

fetch('../sources/corbata.json')
  .then(res => res.json())
  .then(data => {
    function reemplazarColores_corbata(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(reemplazarColores_corbata);
      } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
          if (key === 'k' && Array.isArray(obj[key]) && obj[key].length === 4) {
            if (compararColores_corbata(obj[key], colorNegroBase_corbata)) {
              obj[key] = colorNegroNuevo_corbata;
            }
            else if (
              compararColores_corbata(obj[key], colorCianBase1_corbata) || 
              compararColores_corbata(obj[key], colorCianBase2_corbata)
            ) {
              obj[key] = colorCianNuevo_corbata;
            }
          } else {
            reemplazarColores_corbata(obj[key]);
          }
        }
      }
    }

    reemplazarColores_corbata(data);

    lottie.loadAnimation({
      container: document.getElementById('tie-icon'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data
    });
  });

/// FUNCIONALIDAD DE ICONOS EN MOVIMIENTO 
const negroOriginal = [0, 0, 0, 1];
const nuevoNegro = [0.811, 0.765, 0.741, 1]; // #cfc3bd

const cyanOriginal = [0.2, 0.8, 0.8, 1]; // cian original
const nuevoCyan = [0.901960784, 0.835294118, 0.807843137, 1]; // #E6D5CE

function sameColor(c1, c2, tolerance = 0.0001) {
  return c1.length === c2.length && c1.every((v, i) => Math.abs(v - c2[i]) < tolerance);
}

fetch('../sources/correo-electronico.json')
  .then(res => res.json())
  .then(data => {
    function changeColors(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(changeColors);
      } else if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
          if (key === 'k' && Array.isArray(obj[key]) && obj[key].length === 4) {
            // Negro → nuevoNegro
            if (sameColor(obj[key], negroOriginal)) {
              obj[key] = nuevoNegro;
            }
            // Cian → nuevoCyan
            else if (sameColor(obj[key], cyanOriginal)) {
              obj[key] = nuevoCyan;
            }
          } else {
            changeColors(obj[key]);
          }
        }
      }
    }

    changeColors(data);

    lottie.loadAnimation({
      container: document.getElementById('mail-icon'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data
    });
  });
  



document.addEventListener("DOMContentLoaded", () => {
  generarCheckboxInvitados
});