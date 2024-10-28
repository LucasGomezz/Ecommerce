import { Injectable } from '@angular/core';
import { Producto } from '../../modelos/producto.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Producto[]> {
    return this.http
      .get<Producto[]>(`${this.baseUrl}/juegos`)
      .pipe(
        map((data: any[]) =>
          data.map(
            (item) =>
              new Producto(
                item.id,
                item.nombre,
                item.descripcion,
                item.genero,
                item.precio,
                item.imagen,
                item.clasificacion
              )
          )
        )
      );
  }
}
