export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  genero: string;
  precio: number;
  imagen: string;
  clasificacion: number;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    genero: string,
    precio: number,
    imagen: string,
    clasificacion: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.genero = genero;
    this.precio = precio;
    this.imagen = imagen;
    this.clasificacion = clasificacion;
  }
}
