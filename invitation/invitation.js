let view = 0;
let iframes = [];

function actualizarIconos() {
  let icono1 = document.getElementById('icono1');
  let icono2 = document.getElementById('icono2');

  console.log("🔍 Estado actual de view:", view);

  // Icono 1
  if (view === 0) {
    icono1.classList.remove("visible");
    icono1.classList.add("oculto");
    console.log("📌 Ocultando icono1 (primer iframe)");
  } else {
    icono1.classList.remove("oculto");
    icono1.classList.add("visible");
    console.log("📌 Mostrando icono1");
  }

  // Icono 2
  if (view === iframes.length - 1) {
    icono2.classList.remove("visible");
    icono2.classList.add("oculto");
    console.log("📌 Ocultando icono2 (último iframe)");
  } else {
    icono2.classList.remove("oculto");
    icono2.classList.add("visible");
    console.log("📌 Mostrando icono2");
  }
}

function ingresar(direction) {
  try {
    const current = iframes[view];
    const newView = view + direction;

    if (newView < 0 || newView >= iframes.length) return;

    const next = iframes[newView];

    const leftArrow = document.querySelector(".d1");
    const rightArrow = document.querySelector(".d2");
    if (leftArrow) leftArrow.style.pointerEvents = "none";
    if (rightArrow) rightArrow.style.pointerEvents = "none";

    iframes.forEach((iframe, idx) => {
      iframe.style.visibility = (idx === view || idx === newView) ? "visible" : "hidden";
    });

    next.style.zIndex = 1;
    next.style.display = "block";

    const outClass = direction === 1 ? "animate-out-right" : "animate-out-left";
    current.classList.remove("animate-out-left", "animate-out-right");
    current.classList.add(outClass);

    current.addEventListener("animationend", function handleOut() {
      current.removeEventListener("animationend", handleOut);
      current.classList.remove(outClass);

      current.style.zIndex = 0;
      next.style.zIndex = 2;

      iframes.forEach((iframe, idx) => {
        iframe.style.visibility = idx === newView ? "visible" : "hidden";
      });

      view = newView;

      // 🔹 Actualiza iconos después de cambiar iframe
      actualizarIconos();

      if (leftArrow) leftArrow.style.pointerEvents = "auto";
      if (rightArrow) rightArrow.style.pointerEvents = "auto";
    });

  } catch (error) {
    console.error("Error en ingresar:", error);
  }
}

window.toggleMusica = function toggleMusica() {
  const audio = document.getElementById("miAudio");
  if (!audio) return;

  if (audio.paused) {
    audio.play().catch((e) => console.log("Error al reproducir:", e));
  } else {
    audio.pause();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  actualizarIconos();
  iframes = Array.from(document.querySelectorAll(".page")); // ✅ Ahora sí estará en orden

  iframes.forEach((iframe, idx) => {
    iframe.style.display = "block";
    iframe.style.zIndex = idx === view ? 2 : 1;
    iframe.style.position = "absolute";
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
  });
});
