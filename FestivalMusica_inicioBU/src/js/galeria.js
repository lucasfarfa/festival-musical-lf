document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
    
})

function crearGaleria() { // generar una galeria en html con js
    const galeria = document.querySelector('.galeria-imagenes'); // seleccion clase galeria imagenes

    for( let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);
    // transformo en int el i de crear galeria de cada imagen

    //Genero imagen grande.
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Boton para cerrar imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    // Cuando se presiona se cierra img
    cerrarImagen.onclick = function() { //funcion dentro de esta porque solo la llama esta
        overlay.remove(); //esto elimina el overlay, por lo tanto cierra la img
        body.classList.remove('fijar-body');
    }
    // cuando se presiona el overlay ademas del boton
    overlay.onclick = function() {
        overlay.remove(); // tocnado el overlay tambien cierra
        body.classList.remove('fijar-body'); // asi borra la clase al cerrar overlay
    }
    overlay.appendChild(cerrarImagen);

    // mostrar en html
    const body = document.querySelector('body');
    body.appendChild(overlay);// agrego como un fondo en negro al tocar la imagen.
    body.classList.add('fijar-body');
    
} // SE PUEDE INSTARLA UN PLUGGIN DE JQUERY Y HACERLO TODO EN UN MINUTO XD