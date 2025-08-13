function customConfirm(message) {
  return new Promise((resolve) => {
    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.45);';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    // Crear la caja del confirm
    const box = document.createElement('div');
    box.style.background = 'white';
    box.style.padding = '20px 30px';
    box.style.borderRadius = '10px';
    box.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.07)';
    box.style.textAlign = 'center';
    box.style.maxWidth = '70%';

    // Mensaje
    const msg = document.createElement('p');
    msg.innerHTML = message.replace(/\n/g, '<br>');
    msg.style.marginBottom = '20px';
    msg.style.fontSize = '24px';

    // Botones
    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Aceptar';
    yesBtn.style.marginRight = '10px';
    yesBtn.style.padding = '8px 16px';
    yesBtn.style.border = '0.4px solid var(--gris-oscuro)';
    yesBtn.style.borderRadius = '5px';
    yesBtn.style.backgroundColor = '#7c7c7cff';
    yesBtn.style.color = 'white';
    yesBtn.style.cursor = 'pointer';

    const noBtn = document.createElement('button');
    noBtn.textContent = 'Cancelar';
    noBtn.style.padding = '8px 16px';
    noBtn.style.border = '0.4px solid var(--gris-oscuro)';
    noBtn.style.borderRadius = '5px';
    noBtn.style.backgroundColor = '#fdfdfdff';
    noBtn.style.color = 'black';
    noBtn.style.cursor = 'pointer';

    // Eventos
    yesBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(true);
    });

    noBtn.addEventListener('click', () => {
      document.body.removeChild(overlay);
      resolve(false);
    });

    // Armar todo
    box.appendChild(msg);
    box.appendChild(yesBtn);
    box.appendChild(noBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}

export { customConfirm };