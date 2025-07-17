


// FUNCION PARA INGRESAR A LA INVITACION
window.ingresarInvitaion = async function () {
    let valor = document.getElementById("code").value;
    if (!valor) {
        alert('No se recibio un codigo de invitación');
    }

    //PETICION AL BACK END 
    if (valor == "ABC123") {
        location.href = "/invitation/invitation.html";
    }else{
        alert("Codigo incorrecto");
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

