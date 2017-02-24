if ('serviceWorker' in navigator) {
  window.addEventListener('load', cargarSW)
}

function cargarSW() {
    navigator.serviceWorker.register('/sw.js').then(registration => {
        // Registration was successful
        console.log('Registrado', registration.scope);
    }).catch( err => {
        // registration failed :(
        console.log('ups', err);
    });
}