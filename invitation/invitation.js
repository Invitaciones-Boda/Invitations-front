const urls = {
    1: "/page_one/page_one.html",
    2: "/page_two/page_two.html",
    3: "/page_three/page_three.html",
    4: "/page_four/page_four.html",
};

let view = 1; // Current page index

function ingresar(direction) {
    const iframe = document.getElementById("iframe");
    if (!iframe) {
        console.log("No se encontró el iframe");
        return;
    }

    // Initialize the iframe src if no direction is given (on page load)
    if (typeof direction === "undefined") {
        iframe.src = urls[view];
        return;
    }

    const newView = view + direction;

    // Prevent going out of bounds
    if (newView < 1 || newView > Object.keys(urls).length) {
        return;
    }

    // Disable navigation buttons during animation
    const leftArrow = document.querySelector('.d1');
    const rightArrow = document.querySelector('.d2');
    if (leftArrow) leftArrow.style.pointerEvents = 'none';
    if (rightArrow) rightArrow.style.pointerEvents = 'none';

    // Determine which animation classes to use based on direction
    let outAnimationClass;
    let inAnimationClass;

    if (direction === 1) { // Moving right (next page)
        outAnimationClass = "animate-out-right";
        inAnimationClass = "animate-in-left";
    } else if (direction === -1) { // Moving left (previous page)
        outAnimationClass = "animate-out-left";
        inAnimationClass = "animate-in-right";
    } else {
        // Should not happen if direction is always 1 or -1
        return;
    }

    // Remove any previous animation classes
    iframe.classList.remove("animate-out-left", "animate-in-right", "animate-out-right", "animate-in-left");

    // Add the "out" animation to the current page
    iframe.classList.add(outAnimationClass);

    // After the "out" animation finishes, change the src and apply the "in" animation
    iframe.addEventListener('animationend', function handler() {
        iframe.removeEventListener('animationend', handler); // Remove listener to prevent multiple calls

        view = newView; // Update the current view
        iframe.src = urls[view]; // Change the content of the iframe

        // Once the src is changed, immediately prepare for the "in" animation
        iframe.classList.remove(outAnimationClass); // Remove the "out" animation
        void iframe.offsetWidth; // Force reflow before applying new animation
        iframe.classList.add(inAnimationClass);

        iframe.addEventListener('animationend', function inHandler() {
            iframe.removeEventListener('animationend', inHandler); // Remove this listener too
            iframe.classList.remove(inAnimationClass); // Remove "in" animation after it's done
            // Re-enable navigation buttons
            if (leftArrow) leftArrow.style.pointerEvents = 'auto';
            if (rightArrow) rightArrow.style.pointerEvents = 'auto';
        });

    });
}

window.toggleMusica = function toggleMusica() {
  const audio = document.getElementById('miAudio');
  if (!audio) return;

  if (audio.paused) {
    audio.play().catch(e => console.log('Error al reproducir:', e));
  } else {
    audio.pause();
  }
};


document.addEventListener("DOMContentLoaded", () => {
  ingresar(); // Load the initial page
  const audio = document.getElementById('miAudio');
  if (!audio) return;

  audio.muted = false;
  audio.addEventListener('canplaythrough', () => {
    audio.play().catch(e => console.log('No se pudo reproducir:', e));
  });
});
