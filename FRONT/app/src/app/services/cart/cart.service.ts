import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LocalStorageHelper } from '../../helpers/local-storage.helper';
import { Producto } from '../../modelos/producto.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private currProducts = new BehaviorSubject<Producto[]>([]);
  private readonly storageKey = "cart-products";

  constructor(private client: HttpClient) {
    this.currProducts.next(LocalStorageHelper.get(this.storageKey) ?? []);
  }

  get cartProducts() {
    return this.currProducts.asObservable();
  }

  addNewProduct(producto: Producto) { //Recibe producto por parametro y procuramos que este producto se inserte en el array con PUSH
    let products: Producto[] = LocalStorageHelper.get(this.storageKey) ?? [];
    if (!products.some(p => p.id === producto.id)) {
      products.push(producto);
      LocalStorageHelper.save(this.storageKey, products);
      this.currProducts.next(products);
    }
  }

  buy(cartProducts: Producto[]): Observable<Producto[]> {
    return this.client.post<Producto[]>('http://localhost:8080/api/comprar-carrito', cartProducts).pipe(
      tap({
        next: () => {
          this.clear();
        }
      }),
      catchError(this.handleError),
    );
  }

  clear() {
    localStorage.removeItem(this.storageKey);
    this.currProducts.next([]);
  }

  deleteProduct(id: number) {
    let products: Producto[] = LocalStorageHelper.get('cart-products') ?? [];
    let index = products.findIndex(p => p.id === id);
    products.splice(index, 1);
    LocalStorageHelper.save(this.storageKey, products);
    this.currProducts.next(products);
  }

  isInCart(id: number): boolean {
    let products: Producto[] = LocalStorageHelper.get(this.storageKey) ?? [];
    return products.some(p => p.id === id);
  }

  private handleError(err: HttpErrorResponse) {
    err.status === 0
      ? console.error('Se ha producido un error', err.error)
      : console.error('Backend retornó el código de estado ', err.status, err.error);
    return throwError(() => new Error(err.error));
  }
}
