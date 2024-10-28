import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../modelos/producto.model';
import { CartService } from '../../services/cart/cart.service';
import { CartProductComponent } from './cart-product/cart-product.component';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CartProductComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'

})
export class CartComponent implements OnInit {

  cartProducts: Producto[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.cartProducts.subscribe(products => {
      this.cartProducts = products;
      this.total = 0;
      products.forEach(p => this.total += p.precio);
    });
  }

  buy() {
    this.cartService.buy(this.cartProducts).subscribe({
      next: boughtProducts => {
        alert('Compra completada!');
        console.log(boughtProducts);
      },
      error: err => {
        if (err.message === 'user_not_authenticated') {
          alert('Por favor inicie sesión para completar la compra!');
          this.router.navigateByUrl('/login');
        }
      }
    });
  }

  clearCart() {
    this.cartService.clear();
  }
}
