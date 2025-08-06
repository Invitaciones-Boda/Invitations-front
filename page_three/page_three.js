function abrirPopupConfirmarAsistencia(){
  try{
    let  popupInvitado = document.getElementById("container-popup");

    popupInvitado.style.display = "flex";
  }
  catch(error){
    console.log('Error al abrir popup');
  }
}

function cerrarPopupConfirmarAsistencia(){
  try{
    let  popupInvitado = document.getElementById("container-popup");

    popupInvitado.style.display = "none";
  }
  catch(error){
    console.log('Error al cerrar popup');
  }
}

function confirmarAsistencia(){
    event.preventDefault();
    let form = document.getElementById("Popup");
    if (!form) {
        alert("No se encontró el formulario de confirmación.");
        return;
    }
    let invitados = form.querySelectorAll(".invitados input[type='checkbox']");
    let confirmados = [];
    invitados.forEach(invitado => {
        if (invitado.checked) {
            confirmados.push(invitado.name);
        }
    });
    if (confirmados.length > 0) {
        let data = {
            codigo: "12345", // Reemplazar con el código real
            invitados: confirmados
        }

        console.log('Confirmados: ', data);
        alert("Confirmación exitosa");
        cerrarPopupConfirmarAsistencia();
    }
    else {
        alert("No se ha confirmado la asistencia de ningún invitado.");
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


