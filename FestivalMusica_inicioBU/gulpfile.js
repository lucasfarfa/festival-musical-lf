
const { series, src, dest, watch, tree } = require('gulp');
//src busca los archivos de sass // dest guarda una ruta // watch define que archivos cambian comun mente y que ejecute tarea al cambiar
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
//funcion que compila sass

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css(done) {
    return src(paths.scss) // importante no poner ; aca para usar pipe
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))    // [] agrego multiples funciones
        .pipe(sourcemaps.write('.')) // sourcer para css
        .pipe(dest('./build/css'))
    // donde quiero que guarde
    // basicamente convierte el archivo sass a css ylo genera.
}

function minificar(done) {
    return src(paths.scss) // 
        .pipe(sass({
            outputStyle: 'compressed' //
        }))
        .pipe(dest('./build/css'))
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser()) // mejora nuestro codigo js
        .pipe(sourcemaps.write('.')) // source maps para JS
        .pipe( rename({ suffix: '.min' })) // crea bundle.min
        .pipe(dest('./build/js'))
}

function imagenes() {
    return src(paths.imagenes) // todas las imagenes dentro de img
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagen minificada' }));
}

function versionWebp() { //transforma a webp las img
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Versio WebP lista' }));
}

function watchArchivos() {
    watch(paths.scss, css); // le paso el archivo app.scc y que ejecute la func css para compilar
    watch(paths.js, javascript);
}   // * = carpeta actual con misma extension
// **/* = todos archivos con extension

exports.css = css;
exports.minificar = minificar;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivos = watchArchivos; // ahora gracias a esta funcion, cadda vez que modifique el scss, se compila solo.
// para detner watch ctrl + c

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos); //funcion ddefault solo ejecutando gulp