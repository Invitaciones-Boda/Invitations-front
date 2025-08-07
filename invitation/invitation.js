let view = 0;
let iframes = [];

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

    // ✅ Oculta todos excepto el actual y el siguiente
    iframes.forEach((iframe, idx) => {
      iframe.style.visibility = (idx === view || idx === newView) ? "visible" : "hidden";
    });

    // ✅ Asegura que el siguiente iframe esté en posición y zIndex adecuado desde ya
    next.style.zIndex = 1;
    next.style.display = "block";

    // Aplica animación de salida
    const outClass = direction === 1 ? "animate-out-right" : "animate-out-left";
    current.classList.remove("animate-out-left", "animate-out-right");
    current.classList.add(outClass);

    current.addEventListener("animationend", function handleOut() {
      current.removeEventListener("animationend", handleOut);
      current.classList.remove(outClass);

      // ✅ Baja el z-index del saliente
      current.style.zIndex = 0;

      // ✅ Sube el z-index del nuevo
      next.style.zIndex = 2;

      // ✅ Oculta los demás de nuevo
      iframes.forEach((iframe, idx) => {
        iframe.style.visibility = idx === newView ? "visible" : "hidden";
      });

      view = newView;

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
