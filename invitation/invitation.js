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

});
