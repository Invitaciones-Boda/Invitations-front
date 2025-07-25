const urls = {
  1: "/page_one/page_one.html",
  2: "/page_two/page_two.html",
  3: "/page_three/page_three.html",
  4: "/page_four/page_four.html",
};

let view = 1;

function ingresar(index) {
  const iframe = document.getElementById("iframe");
  if (!iframe) {
    console.log("No se encontró el iframe");
    return;
  }

  if (typeof index === "undefined") {
    // Carga inicial
    iframe.src = urls[view];
    return;
  }

  view += index;

  // Limitar view entre 1 y 3
  if (view < 1) {
    view = 1;
  }
  if (view > 4) {
    view = 4;
  }

  iframe.src = urls[view];
}

document.addEventListener("DOMContentLoaded", () => {
  ingresar(); // Página inicial

  let touchStartX = 0;
  let touchStartTime = 0;
  let moved = false;

  const container = document.getElementById("container");
  if (!container) {
    console.log("No se encontró el contenedor");
    return;
  }

  container.style.position = "relative";

  // Solo capa superior para capturar swipe (no bloquea botones abajo)
  const swipeLayer = document.createElement("div");
  swipeLayer.style.position = "absolute";
  swipeLayer.style.top = 0;
  swipeLayer.style.left = 0;
  swipeLayer.style.width = "100%";
  swipeLayer.style.height = "80px"; // Solo en la parte superior
  swipeLayer.style.zIndex = 1000;
  swipeLayer.style.background = "transparent";
  swipeLayer.style.pointerEvents = "auto"; // Puede recibir eventos
  container.appendChild(swipeLayer);

  swipeLayer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartTime = Date.now();
    moved = false;
  });

  swipeLayer.addEventListener("touchmove", () => {
    moved = true;
  });

  swipeLayer.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const duration = Date.now() - touchStartTime;

    if (moved && Math.abs(diff) > 60 && duration > 100) {
      if (diff > 0) {
        ingresar(1); // Swipe izquierda
      } else {
        ingresar(-1); // Swipe derecha
      }
    } else {
      console.log("Ignorado: clic o swipe muy corto/demasiado rápido");
    }
  });
});
