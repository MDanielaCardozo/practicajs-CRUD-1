import { Serie } from "./serieClass.js";
import { generarCodigo } from "./codigoUnico.js";

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
// variable para manejar el create y el update
let serieExistente = false; //si serie existente es false la serie es Nueva, si es true ya existe deberia modificarse update

//si hay algo en localStorage traer esos datos, si no hay nada listaSeries tiene que ser un []
let listaSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];

// agregar validaciones a cada campo
codigo.addEventListener('blur', () => {
  generarCodigo();
});

formulario.addEventListener('submit', guardarSerie);
btnCrearSerie.addEventListener('click', ()=>{
    limpiarFormulario();
    modalAdminSerie.show();
});

//verificar si hay datos para dibujar en la tabla
cargaInicial();

function guardarSerie(e){
  e.preventDefault();
  // if (true)
  if(serieExistente){
    // aqui quiero modificar una serie existente
    console.log('aqui quiero modificar');
  } else {
    // aqui quiero crear una nueva serie
    crearSerie()
  }
}

function crearSerie(e){
    
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
  <tr class = >
    <th scope="row">${itemSerie.codigo}</th>
    <td>${itemSerie.titulo}</td>
    <td class ="text-truncate">
      ${itemSerie.descripcion}
    </td>
    <td>
      ${itemSerie.imagen}
    </td>
    <td>${itemSerie.genero}</td>
    <td>
      <button class="btn btn-warning" onclick="prepararEdicionSerie('${itemSerie.codigo}')">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger" onclick="borrarProducto('${itemSerie.codigo}')">
        <i class="bi bi-x-square-fill"></i>
      </button>
    </td>
  </tr>`
}

window.borrarProducto = function (codigo){
  console.log(codigo);
  // preguntar al usuario si esta seguro de borrar
  Swal.fire({
    title: 'Esta seguro de eliminar la serie?',
    text: "No puedes revertir este paso luego de aceptar",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // borrar la serie listaSeries y tambien del localStorage
      let listaSeriesNueva = listaSeries.filter((serie)=> {return serie.codigo != codigo } );
      listaSeries = listaSeriesNueva;
      guardarListaSeries();
      console.log(listaSeriesNueva);
      // actualizar la tabla
      borrarTabla();
      cargaInicial();
      // mostrar cartel de operacion exitosa
      Swal.fire(
        'Serie eliminada',
        'La serie seleccionada fue exitosamente eliminada',
        'success'
      );
    }
  });
};

function borrarTabla (){
  let tbodySeries = document.querySelector('#listaSeries');
  tbodySeries.innerHTML = '';
};

window.prepararEdicionSerie = function (codigoP) {
  console.log(codigoP);
  // cargar los datos de la serie a editar
  let serieBuscada = listaSeries.find((serie)=>{return serie.codigo == codigoP});
  console.log(serieBuscada.codigo);
  // asignar los valores a cada input
  codigo.value = serieBuscada.codigo;
  titulo.value = serieBuscada.titulo;
  descripcion.value = serieBuscada.descripcion;
  imagen.value = serieBuscada.imagen;
  genero.value = serieBuscada.genero;
  
  // mostrar formulario de la ventana modal
  modalAdminSerie.show();
  // aqui modifico la variable existeSerie para poder editar
  serieExistente = true;
}