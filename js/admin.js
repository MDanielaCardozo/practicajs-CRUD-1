import { Serie } from "./serieClass.js";

let nuevaSerie = new Serie(1, 'Robotech', 'lorem', 'url', 'accion');
console.log(nuevaSerie);

// traemos los elementos del html
let codigo = document.querySelector('#codigo');
let titulo = document.querySelector('#titulo');
let descripcion = document.querySelector('#descripcion');
let imagen = document.querySelector('#imagen');
let genero = document.querySelector('#genero');
let formulario = document.querySelector('#formSerie');
let listaSeries = [];

// agregar validaciones a cada campo

formulario.addEventListener('submit', )

function crearSerie(e){
    e.preventDefault();
    console.log('desde crear serie');
    // volver a validar todos los campos y si son correctos entonces crear la serie
    let nuevaSerie = new Serie(codigo.value, titulo.value, descripcion.value, imagen.value, genero.value);
    console.log(nuevaSerie);
    // agregamos la serie al final del arreglo
    listaSeries.push(nuevaSerie);
    console.log(listaSeries);
    // limpiar el formulario
}

function limpiarFormulario(){
    formulario.reset();
}