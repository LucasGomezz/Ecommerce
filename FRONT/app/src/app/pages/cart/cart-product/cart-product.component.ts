import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../../modelos/producto.model';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {

  @Input() product!: Producto;

  constructor(private cartService: CartService) {
  }

  deleteProduct(id: number) {
    this.cartService.deleteProduct(id);
  }
}
