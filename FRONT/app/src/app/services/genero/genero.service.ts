import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genero } from '../../modelos/genero.model';

@Injectable({
  providedIn: 'root',
})
export class GeneroService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  getGeneros(): Observable<Genero[]> {
    const url = `${this.baseUrl}/generos`; 

    return this.http
      .get<any[]>(url)
      .pipe(
        map((data: any[]) =>
          data.map((item) => new Genero(item.nombre)) 
        )
      );
  }
}
