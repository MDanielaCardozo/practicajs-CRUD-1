// extraer de la url el parametro
const parametro = window.location.search;
console.log(parametro);

const urlParams = new URLSearchParams(parametro);
console.log(urlParams.get('codigo'));

// buscar con ese parametro la serie en cuestion
let listaSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];
let serieBuscada = listaSeries.find((serie)=>{return serie.codigo == urlParams.get('codigo')});
console.log(serieBuscada)

// cargar los datos de la serie en la card horizontal
let seccionDetalle = document.querySelector('#seccionDetalle');
seccionDetalle.innerHTML = `<div class="card mb-3">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${serieBuscada.imagen}" class="img-fluid rounded-start" alt="${serieBuscada.titulo}">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${serieBuscada.titulo}</h5>
      <p class="card-text">${serieBuscada.descripcion}</p>
      <p class="card-text">${serieBuscada.genero}</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>`
