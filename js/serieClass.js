export class Serie {
    constructor(codigo, titulo, descripcion, imagen, genero){
        this.codigo = codigo;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.genero = genero;
    }
    // agregar los metodos necesarios
    get mostrarCodigo() {
        return this.codigo;
    }

    set modificarNombre(codigo) {
        this.codigo = codigo;
    }

    get mostrarTitulo() {
        return this.titulo;
    }

    set modificarTitulo(titulo) {
        this.titulo = titulo;
    }

    get mostrarDescripcion() {
        return this.descripcion;
    }

    set modificarDescripcion(descripcion){
        this.descripcion = descripcion;
    }

    get mostrarImagen() {
        return this.imagen;
    }

    set modificarImagen(imagen) {
        this.imagen = imagen;
    }

    get mostrarGenero() {
        return this.genero;
    }

    set modificarGenero(genero) {
        this.genero = this.genero;
    }

}