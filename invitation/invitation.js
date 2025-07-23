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

  const container = document.getElementById("container");
  if (!container) {
    console.log("No se encontró el contenedor");
    return;
  }

  container.style.position = "relative";

  // Crea una capa invisible para capturar el swipe
  const swipeLayer = document.createElement("div");
  swipeLayer.style.position = "absolute";
  swipeLayer.style.top = 0;
  swipeLayer.style.left = 0;
  swipeLayer.style.width = "100%";
  swipeLayer.style.height = "100%";
  swipeLayer.style.zIndex = 9999; // Encima de todo
  swipeLayer.style.background = "transparent";
  container.appendChild(swipeLayer);

  swipeLayer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  swipeLayer.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        ingresar(1);
      } else {
        ingresar(-1);
      }
    } else {
      console.log("Swipe muy corto, ignorado");
    }
  });
});
