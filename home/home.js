import { Toast } from '../toast.js'

// FUNCION PARA INGRESAR AL BACKEND USANDO AJAX
async function ingresar(valor) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://samlop-backend.online/invitation/ingreso/",
      type: "POST",
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
  let valor = document.getElementById("code").value?.trim();
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

      location.href = "/invitation/invitation.html";
    } else {
      Toast.error("La respuesta del servidor no es válida.");
    }
  } catch (error) {
    Toast.error(error.message || "Error desconocido al procesar la invitación.");
  }
};


// FUNCION PARA ABRIR LA TARJETA DE INVITACION
window.openTargetInvitation = function openTargetInvitation () {
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
