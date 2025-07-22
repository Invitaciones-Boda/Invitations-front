// FUNCION PARA INGRESAR AL BACKEND USANDO AJAX
async function ingresar(valor) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'http://localhost:8000/invitation/ingreso/',
            type: 'POST',
            data: { codigo: valor },
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

// FUNCION PARA INGRESAR A LA INVITACION
async function ingresarInvitaion() {
    let valor = document.getElementById("code").value;
    if (!valor) {
        alert('No se recibió un código de invitación');
        return;
    }

    try {
        let state = await ingresar(valor);

        if (state) {
            location.href = "/invitation/invitation.html";
        }

    } catch (error) {
        // Manejo seguro del mensaje de error
        let mensaje = error?.responseText || "Error al procesar la solicitud.";
        alert(mensaje);
    }

}


// FUNCION PARA ABRIR LA TARJETA DE INVITACION
window.openTargetInvitation = function () {
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

