import { Toast } from "../toast.js";
import { ENV } from "../utils.js";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Busca la cookie que empieza con el nombre
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// FUNCION PARA INGRESAR AL BACKEND USANDO AJAX
async function ingresar(valor) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `${ENV.urlApi}/invitation/ingreso/`,
      type: "GET",
      data: { codigo: valor },
      success: function (response) {
        console.log("Response: ", response);
        resolve(response);
      },
      error: function (jqXHR) {
        // Manejo seguro de errores de jQuery AJAX
        let mensaje = "Error al procesar la solicitud.";

        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
          mensaje = jqXHR.responseJSON.message;
        } else if (jqXHR.responseText) {
          try {
            let json = JSON.parse(jqXHR.responseText);
            mensaje = json.message || mensaje;
          } catch {
            mensaje = jqXHR.responseText;
          }
        }

        reject(new Error(mensaje));
      },
    });
  });
}

// FUNCION PARA INGRESAR A LA INVITACION
window.ingresarInvitaion = async function ingresarInvitaion() {
  loadAction();
  let valor = document.getElementById("code").value?.trim().toUpperCase();
  if (!valor) {
    Toast.warning("No se recibió un código de invitación");
    return;
  }

  try {
    let state = await ingresar(valor);

    if (state && state.data) {
      let data = state.data;

      // Guardar en el localStorage
      localStorage.setItem("Invitados", data.Nombres ?? "");
      localStorage.setItem("numeroInvitados", data.numeroInvitados ?? "");
      localStorage.setItem("codigo", data.id ?? "");
      localStorage.setItem("estadoConfirmacion", data.estadoConfirmacion ?? "");
      loadAction();
      location.href = "/invitation/invitation.html";
    } else {
      Toast.error("La respuesta del servidor no es válida.");
      loadAction();
    }
  } catch (error) {
    loadAction();
    console.log('Error al iniciar la petición: ', error);
    Toast.error(
      error.message || "Error desconocido al procesar la invitación."
    );
  }
};

// FUNCION PARA ABRIR LA TARJETA DE INVITACION
window.openTargetInvitation = function openTargetInvitation() {
  // Tomar los elementos
  const targetEl = document.getElementById("target_invitation");
  const triangleEl = document.getElementById("triangle-invitation");
  //Validar si existen las cards
  if (!targetEl || !triangleEl) {
    console.error("No se encontraron los elementos.");
    return;
  }
  // Elimincar clases anteriores
  targetEl.classList.remove("target_invitation");
  triangleEl.classList.remove("triangle-invitation");
  // Agregar clases que puedes definir en CSS
  targetEl.classList.add("target_invitation_closed");
  triangleEl.classList.add("triangle-invitation-closed");

  setTimeout(() => {
    openPopUp();
  }, 500);
};

// FUNCIONAMIENTO DEL ICONO EN MOVIMIENTO
/// CAMBIO DE COLOR A BLANCO PARA EL ICONO
/// CAMBIO DE COLOR: SOLO CYAN → BLANCO
const cyanOriginal = [0.2, 0.8, 0.8, 1]; // Cyan del JSON
const blanco = [1, 1, 1, 1]; // Blanco

function sameColor(c1, c2, tolerance = 0.0001) {
  return (
    c1.length === c2.length &&
    c1.every((v, i) => Math.abs(v - c2[i]) < tolerance)
  );
}

function changeColors(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(changeColors);
  } else if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (key === "c" && obj[key]?.k && Array.isArray(obj[key].k)) {
        // Solo cambiamos el cyan a blanco
        if (sameColor(obj[key].k, cyanOriginal)) {
          obj[key].k = blanco;
        }
      } else {
        changeColors(obj[key]);
      }
    }
  }
}

fetch("../sources/corazon.json")
  .then((res) => res.json())
  .then((data) => {
    changeColors(data);

    lottie.loadAnimation({
      container: document.getElementById("heart-icon"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: data,
    });
  });

function loadAction() {
  const load = document.getElementById('content-load');
  if (!load) {
    console.log('No se encontró el elemento con id "content-load"');
    return;
  }

  if (load.classList.contains("show")) {
    // Ocultar con fade out
    load.style.opacity = "0";
    setTimeout(() => {
      load.classList.remove("show");
    }, 400); // mismo tiempo que el transition
  } else {
    // Mostrar con fade in
    load.classList.add("show");
    setTimeout(() => {
      load.style.opacity = "1";
    }, 10); // pequeño delay para que aplique el transition
  }
}



// FUNCION PARA ABRIR EL POPUP DE LA INVITACION
window.openPopUp = function () {
  // Tomar el elemento
  const popUp = document.getElementById("popup-invitation");

  if (!popUp) {
    console.error("No se encontró el elemento con id 'popup-invitation'");
    return;
  }

  // Cambiar display a flex
  popUp.style.display = "flex";
};

document.addEventListener('DOMContentLoad', () => {
  
})