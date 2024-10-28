import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    let url = `${this.baseUrl}/juegos`;

    return this.http.get<any[]>(url).pipe(
      map((products) => {
        return products;
      })
    );
  }
}
