document.addEventListener('DOMContentLoaded', function() {
    scrollNav();

    navegacionFija();
});

function navegacionFija(){
    const barra = document.querySelector('.header'); // seleccion la barra superior
    // registrar en interception of server, revisa si esta visible en la ventana o no
    const observer = new IntersectionObserver( function (entries) {
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo');
        } else {
            barra.classList.add('fijo');
        }
    });

    //Elemento a obsevar
    observer.observe(document.querySelector('.sobre-festival')); // observa la nav
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a'); // selecciona todos los enlaces de la nav principal

    enlaces.forEach( function(enlace) { // lo tengo que hacer con foreacch para asociar a event listener
        enlace.addEventListener('click', function(e) { // al hacer click.
            e.preventDefault(); // ya no navega directo al tocar enlace pero si tenemos acceso a su destino

            //e.target.attributes.href.value nos devuelve el id del enlace ej #boletos
            const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({
                behavior: 'smooth' //basicamente todo el codigo anterior fue para obtener el ID, porque con estas dos lineas se logra el efecto.
            })
        })
    });
}