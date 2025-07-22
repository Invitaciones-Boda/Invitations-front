const urls = {
  1: "/page_one/page_one.html",
  2: "/page_two/page_two.html",
  3: "/page_three/page_three.html",
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
    console.log(`Cargando página inicial: ${urls[view]}`);
    iframe.src = urls[view];
    return;
  }

  view += index;
  console.log(`Swipe detectado. Nuevo valor view: ${view}`);

  // Limitar view entre 1 y 3
  if (view < 1) {
    view = 1;
    console.log("Limite inferior alcanzado. view = 1");
  }
  if (view > 3) {
    view = 3;
    console.log("Limite superior alcanzado. view = 3");
  }

  console.log(`Cargando URL: ${urls[view]}`);
  iframe.src = urls[view];
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado");
  ingresar(); // Página inicial

  let touchStartX = 0;

  const container = document.getElementById("container");
  if (!container) {
    console.log("No se encontró el contenedor");
    return;
  }

  console.log("Contenedor encontrado. Preparando capa de swipe.");
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
  console.log("Capa de swipe agregada");

  swipeLayer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    console.log(`TouchStart X: ${touchStartX}`);
  });

  swipeLayer.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    console.log(`TouchEnd X: ${touchEndX}`);
    console.log(`Diferencia X: ${diff}`);

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        console.log("Swipe a la izquierda → siguiente");
        ingresar(1);
      } else {
        console.log("Swipe a la derecha → anterior");
        ingresar(-1);
      }
    } else {
      console.log("Swipe muy corto, ignorado");
    }
  });
});
