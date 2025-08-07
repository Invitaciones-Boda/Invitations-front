
function iniciarInvitacion() { 
    let title = document.getElementById('title-invitation');
    let nombres = localStorage.getItem('Invitados');

    if (!nombres || !title) return;

    // Convertimos la cadena en array y limpiamos espacios
    nombres = nombres.split(',').map(nombre => nombre.trim());

    // Formateamos según la cantidad de nombres
    let textoFinal = '';
    if (nombres.length === 1) {
        textoFinal = nombres[0];
    } else if (nombres.length === 2) {
        textoFinal = `${nombres[0]} y ${nombres[1]}`;
    } else {
        const ultNombre = nombres.pop();
        textoFinal = `${nombres.join(', ')} y ${ultNombre}`;
    }

    title.textContent = textoFinal;
}

document.addEventListener('DOMContentLoaded', function() {

    iniciarInvitacion();

});