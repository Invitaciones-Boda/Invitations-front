const urls = {
  1: "/page_one/page_one.html",
  2: "/page_two/page_two.html",
  3: "/page_three/page_three.html",
};

let view = 1;

window.ingresar = function (index) {
  const iframe = document.getElementById("iframe");

  if (!iframe) {
    console.log("No se encontró el iframe");
    return;
  }

  if (typeof index === "undefined") {
    iframe.src = urls[view];
    return;
  }

  view += index;

  if (view < 1) view = 1;
  if (view > 3) view = 3;

  iframe.src = urls[view];
};

document.addEventListener("DOMContentLoaded", function () {
  ingresar(); // Cargar página inicial

  let touchStartX = 0;
  let touchEndX = 0;

  const container = document.getElementById("container");

  container.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe izquierda → siguiente
        ingresar(1);
      } else {
        // Swipe derecha → anterior
        ingresar(-1);
      }
    }
  }
});
