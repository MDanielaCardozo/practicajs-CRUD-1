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
let btnCrearSerie = document.querySelector('#btnCrearSerie');
const modalAdminSerie = new bootstrap.Modal(document.getElementById('modalSerie'));
console.log(modalAdminSerie);

//si hay algo en localStorage traer esos datos, si no hay nada listaSeries tiene que ser un []
let listaSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];

// agregar validaciones a cada campo
codigo.addEventListener("blur", () => {
    
})

formulario.addEventListener('submit', crearSerie);
btnCrearSerie.addEventListener('click', ()=>{
    limpiarFormulario();
    modalAdminSerie.show();
});

//verificar si hay datos para dibujar en la tabla
cargaInicial();


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
    limpiarFormulario();
    //guardar lista de series
    guardarListaSeries();
    //cerrar modal que admonistra series
    modalAdminSerie.hide();
    //mostrar cartel a usuario
    Swal.fire(
        'Serie creada',
        'La serie se agregó correctamente.',
        'success'
      );
    crearFila(nuevaSerie);  
}

function limpiarFormulario(){
    formulario.reset(); //el value lo resetea a 0 (solo el value).
    //si usamos las clases is-valid o is-invalid de bootstrap hay que resetearlas
}

function guardarListaSeries(){
    localStorage.setItem('listaSeriesKey', JSON.stringify(listaSeries));
}

function cargaInicial(){
    if(listaSeries.length > 0){
        //dibujar la tabla
        listaSeries.forEach((itemSerie)=>{crearFila(itemSerie)} )
    }
}

function crearFila(itemSerie){
    // console.log(itemSerie);
    let tablaSeries = document.querySelector('#listaSeries'); //(+=) agrega!
    tablaSeries.innerHTML += `                                      
  <tr>
    <th scope="row">${itemSerie.codigo}</th>
    <td>${itemSerie.titulo}</td>
    <td>
      ${itemSerie.descripcion}
    </td>
    <td>
      ${itemSerie.imagen}
    </td>
    <td>${itemSerie.genero}</td>
    <td>
      <button class="btn btn-warning">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger">
        <i class="bi bi-x-square-fill"></i>
      </button>
    </td>
  </tr>`
}