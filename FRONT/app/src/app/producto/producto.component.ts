import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../modelos/producto.model';
import { CartService } from '../services/cart/cart.service';
import { ProductService } from '../services/producto/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  product: Producto | undefined;
  isInCart: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((p: Producto) => p.id === productId);
      console.log(this.product);
      this.checkCart();
    });
  }

  checkCart() {
    this.cartService.cartProducts.subscribe(cartProducts => {
      this.isInCart = cartProducts.some(p => p.id === this.product?.id);
    });
  }

  addToCart(producto: Producto) {
    this.cartService.addNewProduct(producto);
    console.log(producto);
  }

  deleteFromCart(id: number) {
    this.cartService.deleteProduct(id);
  }
}
