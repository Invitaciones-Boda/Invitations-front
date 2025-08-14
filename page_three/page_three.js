import { customConfirm } from '../confirm.js'
import { Toast } from '../toast.js';

function confirmarAsistenciaInvitados(data) {
  $.ajax({
    url: "https://samlop-backend.online/invitation/confirmacion/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
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

window.confirmarAsistencia =  async function confirmarAsistencia(event) {
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
document.addEventListener("DOMContentLoaded", () => {
  const iconos = [
    {
      id: "icono1",
      path: "../sources/correo.json",
      attr: "stroke",
      color: "#cfc3bd",
      type: "svg"
    },
    {
      id: "icono-correo",
      path: "../sources/correo.json",
      newColor: [0.8117647, 0.76470588, 0.72941176, 1], // #cfc3bd
      targetColors: [
        [0, 0, 0, 1] // todos los negros
      ],
      type: "json"
    }
  ];

  function replaceColors(obj, targetColors, newColor) {
    if (Array.isArray(obj)) {
      if (
        obj.length === 4 &&
        targetColors.some(c => c.every((v, i) => v === obj[i]))
      ) {
        for (let i = 0; i < 4; i++) {
          obj[i] = newColor[i];
        }
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
          // Cambiar colores
          replaceColors(data, icono.targetColors, icono.newColor);
          
          // Cargar animación
          lottie.loadAnimation({
            container: document.getElementById(icono.id),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: data
          });
        })
        .catch(err => console.error("Error cargando", icono.path, err));
    }
  });
});
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
